import { badges, badgesWestend } from './badges';

export const CONFIGS = {
  polkadot: {
    openGovApi: 'https://polkadot.subsquare.io/api',
    assetHubWsProvider: 'wss://asset-hub-polkadot-rpc.dwellir.com',
    identityWsProvider: 'wss://polkadot-people-rpc.polkadot.io/',
    collectionId: 233,
    mintingPrice: 1_000_000_000n, // 0.1 DOT
    currency: 'DOT',
    digits: 1e10,
    badges: badges
  },
  kusama: {
    openGovApi:'https://kusama.subsquare.io/api',
    assetHubWsProvider: 'wss://asset-hub-kusama-rpc.dwellir.com',
    identityWsProvider: 'wss://kusama-people-rpc.polkadot.io/',
    collectionId: 473,
    mintingPrice: 50_000_000_000n, // 0.05 KSM
    currency: 'KSM',
    digits: 1e12,
    badges: badges
  },
  westend: {
    openGovApi:'https://westend.subsquare.io/api',
    assetHubWsProvider: 'wss://asset-hub-westend-rpc.dwellir.com',
    identityWsProvider: 'wss://westend-people-rpc.polkadot.io/',
    collectionId: 70,
    mintingPrice: 100_000_000_000n, // 0.1 WND
    currency: 'WND',
    digits: 1e12,
    badges: badgesWestend
  }
}
