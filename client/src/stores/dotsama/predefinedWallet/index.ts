// Copyright 2019-2022 @subwallet/wallet-connect authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { WalletInfo } from '../types';
import FearlessWalletLogo from './FearlessWalletLogo.svg';
import PolkadotJsLogo from './PolkadotLogo.svg';
import SubWalletLogo from './SubWalletLogo.svg';
import TalismanLogo from './TalismanLogo.svg';
import NovaWalletLogo from './NovaWalletLogo.svg';

export const PREDEFINED_WALLETS: WalletInfo[] = [
  {
    extensionName: 'subwallet-js',
    title: 'SubWallet',
    installUrl: 'https://chrome.google.com/webstore/detail/subwallet/onhogfjeacnfoofkfgppdlbmlmnplgbn',
    logo: {
      src: SubWalletLogo,
      alt: 'SubWallet'
    }
  },
  {
    extensionName: 'polkadot-js',
    title: 'Polkadot{.js}',
    installUrl: 'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd',
    logo: {
      src: PolkadotJsLogo,
      alt: 'Polkadot{.js} Extension'
    }
  },
  {
    extensionName: 'talisman',
    title: 'Talisman',
    installUrl: 'https://chrome.google.com/webstore/detail/talisman-wallet/fijngjgcjhjmmpcmkeiomlglpeiijkld',
    logo: {
      src: TalismanLogo,
      alt: 'Talisman'
    }
  },
  {
    extensionName: 'fearless-wallet',
    title: 'Fearless Wallet',
    installUrl: 'https://chrome.google.com/webstore/detail/fearless-wallet/nhlnehondigmgckngjomcpcefcdplmgc',
    logo: {
      src: FearlessWalletLogo,
      alt: 'Fearless Wallet Extension'
    }
  },
  {
    extensionName: 'nova-wallet',
    title: 'Nova Wallet',
    installUrl: 'https://novawallet.io',
    logo: {
      src: NovaWalletLogo,
      alt: 'Nova Wallet'
    }
  }
];
