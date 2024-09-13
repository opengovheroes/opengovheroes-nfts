<template>
  <div v-if="!connected" class="text-h6 full-width text-center q-pa-md">Please connect your wallet</div>
  <div v-if="connected && myBadges.length === 0" class="text-h6 full-width text-center q-pa-md">You have no NFTs</div>
  <NftListComponent :onlyClaimed="true" v-if="connected"/>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useMainStore } from '../stores/main.store';
import NftListComponent from './NftListComponent.vue'

const store = useMainStore()

const myBadges = computed(() => {
  return store.latest.badges.filter(b => b.status === 'CLAIMED')
})

const connected = computed(() => {
  return store.latest.walletAccount
})
</script>

