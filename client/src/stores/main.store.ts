import { defineStore } from 'pinia';
import { getWallets } from './dotsama/wallets';
import { Wallet, WalletAccount } from './dotsama/types';
import { VotesStatisticsService } from '../shared-module/service/votes-statistics.service';
import { FetchVotesService } from './dotsama/fetch-votes.service';
import { BehaviorSubject, combineLatest, filter, firstValueFrom, ReplaySubject, Subject, take } from 'rxjs';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { CONFIGS } from '../const/configs';
import { Badge } from '../interfaces/badge.interface';
import '@polkadot/api/augment';
import { badgeTriggerAddresses } from '../const/badge-trigger-addresses';
import { VoteStatistics } from '../interfaces/vote-statistics.interface';
import { convertToGenericFormat, convertToSpecificFormat } from '../shared-module/service/substrate-address.converter';
import { convertNftIdToBadgeId } from '../shared-module/service/string-to-badge-id.converter';

export interface BadgeInfo extends Badge {
  status?: 'CLAIMED' | 'AVAILABLE' | 'UNAVAILABLE'
  minting?: boolean
}

interface NftCollection {
  [address: string]: { items: number[], name?: string }
}

interface LeaderBoardEntry {
  address: string, items: Badge[], name?: string
}

const initialEnv: 'polkadot' | 'kusama' | 'westend' = localStorage.getItem('env') || 'polkadot' as any

const badgeInfo = CONFIGS[initialEnv].badges.map((badge: Badge) => {
  return {
    ...badge
  }
})

const fetchVotesStatistics = async (env: 'polkadot' | 'kusama' | 'westend', address: string) => {
  const votes = await new FetchVotesService(CONFIGS[env].openGovApi).fetchAllVotes(convertToSpecificFormat(address, env))
  return new VotesStatisticsService().extract(votes)
}

const initAH = (env: 'polkadot' | 'kusama' | 'westend') => {
  const wsProvider = new WsProvider(CONFIGS[env].assetHubWsProvider);
  return ApiPromise.create({ provider: wsProvider });
}

const initPeoplechain = (env: 'polkadot' | 'kusama' | 'westend') => {
  const wsProvider = new WsProvider(CONFIGS[env].identityWsProvider);
  return ApiPromise.create({ provider: wsProvider });
}

const fetchBalance = async (api: ApiPromise, userAddress: string): Promise<bigint> => {
  const { data: balance } = await api.query.system.account(userAddress) as any;
  return BigInt(balance.free)
}

const fetchCollection = async (api: ApiPromise, collectionId: number): Promise<NftCollection> => {
  const items = await (api.query.nfts.item as any).entries(collectionId)

  const adressToBadges: NftCollection = {}
  items.forEach(([key, value]: [any, { value: { owner: any } }]) => {
    const badgeId = convertNftIdToBadgeId(key.toHuman()[1])
    const owner = convertToGenericFormat(value.value.owner.toHuman())
    if (!adressToBadges[owner]) {
      adressToBadges[owner] = { items: [] }
    }
    adressToBadges[owner].items.push(badgeId)
  });
  Object.keys(adressToBadges).forEach(address => {
    adressToBadges[address].items = adressToBadges[address].items.sort((a, b) => a > b ? 1 : -1)
  })
  return adressToBadges
}

const fetchIdentites = async (api: ApiPromise, addresses: string[]): Promise<string[]> => {
  const people = await (api.query.identity.identityOf as any).multi(addresses)
  return people.map((p: any) => {
    if (p.value && p.value[0]) {
      return p.value[0].info?.display?.toHuman().Raw
    }
  })
}

export interface MainStore {
  _themePreference: string,
  assetHubApi: Subject<ApiPromise | undefined>,
  peopleChainApi: Subject<ApiPromise | undefined>,
  walletAccount: Subject<WalletAccount | undefined>
  voteStatistic: Subject<VoteStatistics | undefined>,
  walletAccounts: Subject<WalletAccount[] | undefined>
  nftCollection: Subject<{ [account: string]: { items: number[], name?: string } }>,
  mintingStatus: Subject<{ status: 'none' | 'sending' | 'error' | 'minting' | 'done' | 'preparing', id: number }>,
  badgeInfo: Subject<BadgeInfo[]>,
  env: Subject<'polkadot' | 'kusama' | 'westend'>,
  latest: {
    leaderBoard: LeaderBoardEntry[],
    walletAccount?: WalletAccount,
    wallet?: Wallet,
    env: 'polkadot' | 'kusama' | 'westend'
    badges: BadgeInfo[],
    selectedBadge: BadgeInfo | undefined,
    nftCollection: { [account: string]: Badge[] },
    balance: bigint,
    voteStatistics?: VoteStatistics,
    ongoingTransaction: boolean
  }
}

export const useMainStore = defineStore('main', {
  state: (): MainStore => {
    return {
      _themePreference: localStorage.getItem('themePreference') || 'dark',
      assetHubApi: new ReplaySubject<ApiPromise | undefined>(1),
      peopleChainApi: new ReplaySubject<ApiPromise | undefined>(1),
      walletAccount: new ReplaySubject<WalletAccount | undefined>(1),
      walletAccounts: new ReplaySubject<WalletAccount[] | undefined>(1),
      voteStatistic: new BehaviorSubject<VoteStatistics | undefined>(undefined),
      nftCollection: new BehaviorSubject<{ [account: string]: { items: number[], name?: string } }>({}),
      mintingStatus: new BehaviorSubject<{ status: 'none' | 'sending' | 'error' | 'minting' | 'done' | 'preparing', id: number }>({ status: 'none', id: -1 }),
      badgeInfo: new BehaviorSubject<BadgeInfo[]>(badgeInfo),
      env: new BehaviorSubject<'polkadot' | 'kusama' | 'westend'>(initialEnv),
      latest: {
        env: initialEnv,
        leaderBoard: [],
        badges: badgeInfo,
        selectedBadge: undefined,
        nftCollection: {},
        balance: 0n,
        ongoingTransaction: false
      }
    };
  },
  getters: {
    getWallets() {
      return getWallets()
    },
    themePreference(): string {
      return this._themePreference;
    }
  },
  actions: {
    setThemePreference(theme: 'light' | 'dark') {
      this._themePreference = theme;
      localStorage.setItem('themePreference', theme);
    },
    async init() {
      this.listenToNftTransfers()

      combineLatest([this.walletAccount, this.env]).subscribe(([walletAccount, env]) => {
        if (walletAccount) {
          this.updateVoteStatistics(env, walletAccount!.address)
        }
      })

      this.nftCollection.subscribe((nftCollection) => {
        const sortedAddresses = Object.keys(nftCollection).sort((a, b) => nftCollection[a].items.length < nftCollection[b].items.length ? 1 : -1).slice(0, 10)
        const leaderBoard: LeaderBoardEntry[] = [];
        sortedAddresses.forEach(address => {
          const items = nftCollection[address].items.map(item => {
            const badge = CONFIGS[this.latest.env].badges.find((b: Badge) => b.id === item)!
            return {
              ...badge
            }
          })
          leaderBoard.push({
            address,
            name: nftCollection[address].name,
            items
          });
        });
        this.latest.leaderBoard = leaderBoard
      })

      combineLatest([this.walletAccount, this.assetHubApi]).subscribe(([walletAccount, api]) => {
        if (walletAccount && api) {
          this.updateBalance(api, walletAccount!.address)
        }
      })

      // Badges
      combineLatest([this.voteStatistic, this.nftCollection, this.mintingStatus, this.walletAccount]).subscribe(
        ([voteStatistics, nftCollection, mintingStatus, walletAccount]) => {
          if (!nftCollection) {
            return {}
          }
          const badgeInfo: BadgeInfo[] = CONFIGS[this.latest.env].badges.map((b: Badge) => {
            const previous = this.latest.badges?.find(bi => bi.id === b.id)
            const available = b.available && voteStatistics ? b.available(voteStatistics) : false
            const claimed = walletAccount ? nftCollection[walletAccount!.address]?.items.find(i => i === b.id) : false
            const badgeInfo: BadgeInfo = {
              ...b,
              status: claimed ? 'CLAIMED' : available ? 'AVAILABLE' : 'UNAVAILABLE',
              minting: mintingStatus.id === b.id ?
                (mintingStatus.status === 'minting' || mintingStatus.status === 'sending') : previous ? previous.minting : false
            }
            return badgeInfo
          })
          this.latest.badges = badgeInfo
          if (this.latest.selectedBadge) {
            this.latest.selectedBadge = this.latest.badges.find(b => b.id === this.latest.selectedBadge!.id)
          }
          this.badgeInfo.next(badgeInfo)
        }
      )

      combineLatest([this.assetHubApi, this.peopleChainApi, this.env]).subscribe(async ([ahApi, peopleApi, env]) => {
        if (ahApi) {
          const collection = await fetchCollection(ahApi, CONFIGS[env].collectionId)
          if (peopleApi) {
            const identities = await fetchIdentites(peopleApi, Object.keys(collection))
            for (let index = 0; index < identities.length; index++) {
              collection[Object.keys(collection)[index]].name = identities[index]
            }
          }
          this.nftCollection.next(collection)
        }
      })

      this.env.subscribe(async (env: 'polkadot' | 'kusama' | 'westend') => {
        this.assetHubApi.next(undefined)
        this.peopleChainApi.next(undefined)
        this.nftCollection.next({})
        initAH(env).then(api => {
          this.assetHubApi.next(api)
        })
        initPeoplechain(env).then(api => {
          this.peopleChainApi.next(api)
        })
        const walletAccount = localStorage.getItem(`${env}_wallet_account`)
        if (walletAccount) {
          const walletInfo = JSON.parse(walletAccount)
          const wallet = getWallets().find(w => w.extensionName = walletInfo.wallet.extensionName)!
          await this.selectWallet(wallet)
          const accounts = await wallet.getAccounts() || []
          const selectedAccount = accounts.find(a => a.address === walletInfo.address)!
          await this.selectWalletAccount(selectedAccount)
        } else {
          localStorage.removeItem(`${env}_wallet_account`)
          this.latest.walletAccount = undefined
          this.latest.wallet = undefined
          this.walletAccount.next(undefined)
          this.latest.balance = 0n
        }
      })
    },
    async updateBalance(api: ApiPromise, address: string) {
      const balance = await fetchBalance(api, address)
      this.latest.balance = balance
    },
    async updateVoteStatistics(env: 'polkadot' | 'kusama' | 'westend', address: string) {
      fetchVotesStatistics(env, address).then((voteStatistics: VoteStatistics) => {
        this.latest.voteStatistics = voteStatistics
        this.voteStatistic.next(voteStatistics)
      }).catch(e => {
        console.error('Error fetching vote statistics', e)
      })
    },
    async selectWallet(wallet: Wallet) {
      this.latest.wallet = wallet
      await this.latest.wallet.enable()
      const accounts = await this.latest.wallet.getAccounts()
      this.walletAccounts.next(accounts || undefined)
    },
    async selectWalletAccount(walletAccount: WalletAccount) {
      this.latest.walletAccount = walletAccount
      if (walletAccount) {
        localStorage.setItem(`${this.latest.env}_wallet_account`, JSON.stringify(this.latest.walletAccount))
        this.walletAccount.next(this.latest.walletAccount)
      }
    },
    async updateNfts() {
      combineLatest([this.assetHubApi, this.peopleChainApi, this.env]).pipe(filter(([ah, people]) => (
        !!ah && !!people
      )), take(1)).subscribe(async ([ahApi, peopleApi, env]) => {
        const collection = await fetchCollection(ahApi!, CONFIGS[env].collectionId)
        const identities = await fetchIdentites(peopleApi!, Object.keys(collection))
        for (let index = 0; index < identities.length; index++) {
          collection[Object.keys(collection)[index]].name = identities[index]
        }
        this.nftCollection.next(collection)
      })
    },
    async listenToNftTransfers() {
      let unsubscribe: any = undefined;
      this.assetHubApi.pipe(filter(api => !!api)).subscribe(async api => {
        if (unsubscribe) {
          unsubscribe()
        }
        unsubscribe = await api.query.system.events((events) => {
          events.forEach(async (record) => {
            const { event } = record;
            if (event.section === 'nfts' && event.method === 'Issued' && record.phase.isApplyExtrinsic) {
              if (this.latest.walletAccount && this.latest.walletAccount.address === convertToGenericFormat(event.data.owner.toHuman())) {
                const badgeId = convertNftIdToBadgeId(event.data.item.toHuman())
                console.log('Minted NFT: ' + badgeId);
                this.mintingStatus.next({ status: 'done', id: badgeId })
                this.updateNfts()
              }
            }
          });
        });
      })
    },
    async setEnv(env: 'polkadot' | 'kusama' | 'westend') {
      this.latest.env = env
      localStorage.setItem('env', env)
      this.env.next(env)
    },
    async selectBadge(badge: BadgeInfo) {
      this.latest.selectedBadge = badge
    },
    async mint(id: number) {
      this.latest.ongoingTransaction = true
      this.mintingStatus.next({ status: 'preparing', id })
      const api = await firstValueFrom(this.assetHubApi.pipe(filter(api => !!api)))
      const triggerAddress = badgeTriggerAddresses[id]
      const tx = api.tx.balances.transferKeepAlive(triggerAddress, CONFIGS[this.latest.env].mintingPrice)
      const signer = this.latest.walletAccount!.signer!
      const address = this.latest.walletAccount!.address

      try {
        const nonce = await api.rpc.system.accountNextIndex(address);
        const unsubscribe = await tx.signAndSend(address, { signer, nonce }, ({ status, dispatchError }: any) => {
          if (dispatchError) {
            this.latest.ongoingTransaction = false
            this.mintingStatus.next({ status: 'error', id })
            unsubscribe()
          } else if (status) {
            if (status.isInBlock) {
              unsubscribe()
              this.latest.ongoingTransaction = false
              this.mintingStatus.next({ status: 'minting', id })
              combineLatest([this.walletAccount, this.assetHubApi]).pipe(take(1)).subscribe(([walletAccount, api]) => {
                if (walletAccount && api) {
                  this.updateBalance(api, walletAccount!.address)
                }
              })
            } else if (status.isBroadcast) {
              this.mintingStatus.next({ status: 'sending', id })
            }
          }
        });
      } catch (error) {
        this.latest.ongoingTransaction = false
        this.mintingStatus.next({ status: 'error', id })
      }
    }
  },
});

