import {ApiPromise, Keyring, WsProvider} from "@polkadot/api";
import {BadgeTriggerService} from "./badge-trigger.service";
import {KeyringPair} from "@polkadot/keyring/types";
import {FetchVotesService} from "./fetch-votes.service";
import {VotesStatisticsService} from "../../../client/src/shared-module/service/votes-statistics.service";
import {convertNftIdToBadgeId} from "../../../client/src/shared-module/service/string-to-badge-id.converter";
import {CONFIGS} from "../../../client/src/const/configs";
import {transact} from "../util/transact";
import {logger} from "../logger/logger";
import { convertToGenericFormat, convertToSpecificFormat } from "../../../client/src/shared-module/service/substrate-address.converter";

const mintingCache: { [key: string]: boolean } = {}

export class NftService {
    private badgeTriggerService: BadgeTriggerService
    private nftCollectionId: number

    constructor(private env: string, private seed: string, private wsConnection: string, private fetchVotesService: FetchVotesService) {
        this.nftCollectionId = CONFIGS[this.env].collectionId
        this.badgeTriggerService = new BadgeTriggerService(env)
        this.start()
    }

    private async mintNft(api: ApiPromise, signer: KeyringPair, collectionId, mintId, receiver, metadata: any): Promise<boolean> {
        const txs = [
            api.tx.nfts.mint(collectionId, mintId, receiver, null),
            api.tx.nfts.setMetadata(collectionId, mintId, metadata),
            api.tx.nfts.lockItemTransfer(collectionId, mintId),
            api.tx.nfts.lockItemProperties(collectionId, mintId, true, true)
        ];
        return transact(api, api.tx.utility.batchAll(txs), signer)
    }

    private async tryClaimNft(api, signer, claimant, triggerAddress) {
        const badge = this.badgeTriggerService.getBadge(triggerAddress)
        logger.info(`NftService: Matching batch "${badge.name}" with id ${badge.id}`)
        const nfts = await (api.query.nfts.account as any).keys(claimant, this.nftCollectionId)
        
        const badgeIds = Array.from(new Set(nfts.map((key) => convertNftIdToBadgeId(key.toHuman()[2]))))
        if (badgeIds.indexOf(badge.id) > -1) {
            logger.info(`NftService: Address ${claimant} already has an nft with id ${badge.id}`)
            return
        }
        const mintingCacheKey = claimant + "_" + badge.id
        if (mintingCache[mintingCacheKey]) {
            logger.info(`NftService: Already minting a nft with id ${badge.id} for ${claimant}.`)
            return
        }
        const votes = await this.fetchVotesService.fetchAllVotes(convertToSpecificFormat(claimant, this.env))
        const voteStatistics = new VotesStatisticsService().extract(votes)
        const available = badge.available(voteStatistics)
        if (available) {
            logger.info(`NftService: Minting "${badge.name}", with ipfs ${badge.ipfs} for ${claimant.toString()}`);
            const collectionInfo = await api.query.nfts.collection(this.nftCollectionId)
            const itemId = (collectionInfo as any).value.items.toNumber() * 100 + badge.id 
            logger.info(`NftService: Minting itemId ${itemId} with badge id ${badge.id} for ${claimant}`)
            try {
                mintingCache[mintingCacheKey] = true
                await this.mintNft(api, signer, this.nftCollectionId, itemId, claimant, "ipfs://ipfs/" + badge.ipfs)
            } catch (error) {
                logger.error(`NftService: Claiming nft failed user ${claimant}, trigger address ${triggerAddress}, badge ${badge.name}`, error)
                mintingCache[mintingCacheKey] = false
                throw "Error minting NFT"
            }
        } else {
            logger.warn(`NftService: Not allowed "${badge.name}", id: "${badge.id}"`)
            mintingCache[mintingCacheKey] = false
        }
    }

    async tryClaimNftWithRetry(api: ApiPromise, signer: any, from: string, genericTargetAddress: string, retries = 3) {
        try {
            await this.tryClaimNft(api, signer, from.toString(), genericTargetAddress)
            return
        } catch (error) {
            logger.error(`Claiming NFT failed: from ${from} to ${genericTargetAddress}`, error)
            logger.error(error)
        }
        if (retries > 0) {
            setTimeout(() => {
                logger.info(`Trying to claim NFT again. Retries ${retries}`)
                this.tryClaimNftWithRetry(api, signer, from, genericTargetAddress, retries - 1)
            }, 15000)
        }
    }

    async start() {
        const keyring = new Keyring({type: 'sr25519'});

        const wsProvider = new WsProvider(this.wsConnection);
        const api = await ApiPromise.create({provider: wsProvider});

        const signer = keyring.addFromUri(this.seed);
        const triggerAddresses = this.badgeTriggerService.getAddresses()

        logger.info('NftService listening for transfer events')

        api.query.system.events((events) => {
            events.forEach(async (record) => {
                const {event} = record;
                if (event.section === 'balances' && event.method === 'Transfer') {
                    const [from, to, value] = event.data;
                    const valueBigInt = BigInt(value.toBigInt())
                    const genericTargetAddress = convertToGenericFormat(to.toString())

                    if (triggerAddresses.indexOf(genericTargetAddress) > -1) {
                        logger.info(`Transfer from ${from.toString()} to trigger account ${genericTargetAddress} with value ${valueBigInt}`)
                        if (valueBigInt >= CONFIGS[this.env].mintingPrice) {
                            this.tryClaimNftWithRetry(api, signer, from.toString(), genericTargetAddress)
                        }
                    }
                }
            });
        });
    }
}