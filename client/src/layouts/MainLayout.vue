<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar class="flex justify-between row-md row-xl row-lg row-md column-sm column-xs">
        <q-toolbar-title style="flex: 0 0 auto"
          class="row-xl row-lg row-md column-sm column-xs q-pt-xs-sm q-pt-sm-sm q-pt-md-none q-pt-lg-none q-pt-xl-none items-center">
          <div class="flex justify-center items-center">
            <img src="img/polkadot-logo.webp" style="height: 2rem; margin: 3px"/>
            <RouterLink to="/" style="color: white; text-decoration: none!important"><div>OpenGov Heroes</div></RouterLink>
            <RouterLink to="/" ><img src="icon/output-onlinepngtools.png" style="height: 2rem; margin: 3px" /></RouterLink>
          </div>
        </q-toolbar-title>
        <q-tabs align="left" class="desktop-only">
          <q-route-tab to="/nfts" label="NTFs" />
          <q-route-tab to="/my-nfts" label="My NTFs" />
          <q-route-tab to="/leaderboard" label="Leaderboard" />
          <q-route-tab to="/faq" label="FAQ" />
          <q-route-tab to="/my-stats" label="My Stats" />
        </q-tabs>
        <div>
          <q-toggle
            :modelValue="lightMode"
            data-testid="darkModeToggle"
            @update:modelValue="toggleDarkMode()"
            color="secondary"
          />
          <span class="text-h7" v-if="store.latest.walletAccount">{{ formattedBalance }} {{ currency }}</span>
          <q-btn flat @click="showSelectWalletModal = true">{{ store.latest?.walletAccount ?
            (store.latest.walletAccount.name || store.latest.walletAccount.address) : 'Connect Wallet' }}</q-btn>
          <q-btn @click="showSelectEnvModal = true" round flat>
            <img style="max-height:1.715em"
              :src="store.latest.env === 'polkadot' ? 'img/polkadot.svg' : store.latest.env === 'kusama' ? 'img/kusama.svg' : 'img/westend.svg'"
              alt="Button Image" class="button-image">
          </q-btn>
        </div>
      </q-toolbar>
      <q-tabs align="left" class="mobile-only2">
        <q-route-tab to="/nfts" label="NTFs" style="padding: 0 5px"/>
        <q-route-tab to="/my-nfts" label="My NFTs" style="padding: 0 5px"/>
        <q-route-tab to="/leaderboard" label="Leaderboard" style="padding: 0 5px"/>
        <q-route-tab to="/faq" label="FAQ" style="padding: 0 5px"/>
        <q-route-tab to="/my-stats" label="My Stats" style="padding: 0 5px"/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-dialog v-model="showSelectWalletModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Select Wallet</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="wallet of store.getWallets" v-bind:key="wallet.title"
            @click="selectWallet(wallet)">
            <q-item-section avatar>
              <img :src="wallet.logo.src" height="40px" width="40px">
            </q-item-section>
            <q-item-section>{{ wallet.title }}</q-item-section>
            <q-item-section side v-if="!wallet.installed"><span>Install</span></q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showSelectEnvModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Select environment</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="env of ['Polkadot', 'Kusama', 'Westend']" v-bind:key="env"
            @click="selectEnv(env.toLowerCase())">
            <q-item-section avatar>
              <img :src="'img/' + env.toLowerCase() + '.svg'" height="40px" width="40px">
            </q-item-section>
            <q-item-section>{{ env }} AssetHub</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showSelectAccountModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Select Account</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-list bordered separator>
          <q-item clickable v-ripple v-for="account of accounts" v-bind:key="account.address"
            @click="selectAccount(account)">
            <q-item-section>{{ account.name || account.address }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useMainStore } from '../stores/main.store';
import { Wallet, WalletAccount } from '../stores/dotsama/types';
import { take } from 'rxjs/operators';
import { CONFIGS } from '../const/configs';
import { useQuasar } from 'quasar';
import { colors, getCssVar, setCssVar } from 'quasar';

const primary_backup = getCssVar('primary');
const secondary_backup = getCssVar('secondary');
const accent_backup = getCssVar('accent');

const $q = useQuasar()

const store = useMainStore();
store.init()
$q.dark.set(store.themePreference === 'dark' ? true : false);

const showSelectEnvModal = ref(false)
const showSelectWalletModal = ref(false)
const showSelectAccountModal = ref(false)
const accounts = ref<WalletAccount[]>([])

async function selectWallet(wallet: Wallet) {
  if (wallet.installed) {
    await store.selectWallet(wallet)
    showSelectWalletModal.value = false
    accounts.value = await store.walletAccounts.pipe(take(1)).toPromise() as WalletAccount[]
    if (accounts.value.length === 1) {
      selectAccount(accounts.value[0])
    } else {
      showSelectAccountModal.value = true
    }
  } else {
    window.location.href = wallet.installUrl
  }
}

const currency = computed(() => {
  return CONFIGS[store.latest.env].currency
})

const formattedBalance = computed(() => {
  if (store.latest.balance > (BigInt(CONFIGS[store.latest.env].digits) * 100n)) {
    return Number(store.latest.balance / BigInt(CONFIGS[store.latest.env].digits)).toFixed(2)
  } else {
    return (Number(store.latest.balance) / CONFIGS[store.latest.env].digits).toFixed(2)
  }
})

async function selectAccount(account: WalletAccount) {
  showSelectAccountModal.value = false
  showSelectWalletModal.value = false
  store.selectWalletAccount(account)
}

async function selectEnv(env: 'polkadot' | 'kusama' | 'westend') {
  store.setEnv(env)
  showSelectEnvModal.value = false
}

const lightMode = computed(() => {
  return !$q.dark.isActive;
});

function toggleDarkMode() {
  $q.dark.set(!$q.dark.isActive);
  const { lighten } = colors;
  if ($q.dark.isActive) {
    setCssVar('primary', lighten(primary_backup!, -50));
    setCssVar('secondary', lighten(secondary_backup!, -50));
    setCssVar('accent', lighten(accent_backup!, -60));
  } else {
    setCssVar('primary', primary_backup!);
    setCssVar('secondary', secondary_backup!);
    setCssVar('accent', accent_backup!);
  }
  store.setThemePreference($q.dark.isActive ? 'dark' : 'light');
}


store.assetHubApi.subscribe(ah => {
  if (!ah) {
      $q.loading.show({
        message: 'Connecting. Please wait...',
        boxClass: 'bg-grey-2 text-grey-9',
        spinnerColor: 'primary'
      })
      let timer: any = setTimeout(() => {
        $q.loading.hide()
        timer = void 0
      }, 3000)
  } else {
    $q.loading.hide()
  }
})

let dismiss: { [id: string]: any } = {}

store.mintingStatus.subscribe((mintingStatus) => {
  if (dismiss[mintingStatus.id]) {
    dismiss[mintingStatus.id]()
  }
  switch (mintingStatus.status) {
    case 'preparing':
      dismiss[mintingStatus.id] = $q.notify({
        message: 'Preparing transaction',
        color: 'primary',
        spinner: true,
        timeout: 0
      })
      break;
    case 'sending':
      dismiss[mintingStatus.id] = $q.notify({
        message: 'Sending transaction',
        color: 'primary',
        spinner: true,
        timeout: 0
      })
      break;
    case 'error':
      dismiss[mintingStatus.id] = $q.notify({
        message: 'Error sending transaction',
        color: 'error',
        actions: [
          { label: 'Dismiss', color: 'white' }
        ]
      })
      break;
    case 'minting':
      dismiss[mintingStatus.id] = $q.notify({
        message: 'Minting NFT. Please be patient',
        color: 'secondary',
        timeout: 0,
        spinner: true
      })
      break;
    case 'done':
      dismiss[mintingStatus.id] = $q.notify({
        message: 'Done!',
        color: 'primary',
        timeout: 3000,
        actions: [
          { label: 'Dismiss', color: 'white' }
        ]
      })
  }
}) 
</script>
