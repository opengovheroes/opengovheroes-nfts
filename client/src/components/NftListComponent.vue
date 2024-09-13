<template>
  <div class="justify-center full-width q-pa-lg">
    <div class="gallery-grid">
      <div v-for="badge of badges" :key="badge.id">
        <q-card class="my-card" style="transition-delay: 250ms;transition-property: opacity">
          <q-img :src="'https://ipfs.io/ipfs/' + badge.cid"
                 @click="showBadgeModal(badge)" style="cursor: pointer;"
                 :ratio="1"
                 :style="{ opacity: connected && badge.status === 'UNAVAILABLE' ? 1 : 1, 'transition-duration': '250ms', 'transition-property': 'opacity' } "
                 class="image-box">
          </q-img>
          <q-card-section>
            <div class="text-h6">{{badge.name}}</div>
          </q-card-section>
          <q-card-actions>
            <q-btn flat @click="showBadgeModal(badge)">Info</q-btn>
            <q-btn v-if="connected && !badge.minting && (badge.status === 'AVAILABLE' || badge.status === 'UNAVAILABLE')" flat :disable="store.latest.ongoingTransaction || badge.status !== 'AVAILABLE'" @click="claimNft(badge)">Claim</q-btn>
            <q-btn v-if="badge.status === 'CLAIMED' && !props.onlyClaimed" flat color="green" :disable="true">Minted</q-btn>
            <q-skeleton v-if="badge.minting"><q-btn flat :disable="true">Minting</q-btn></q-skeleton>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>

  <q-dialog v-model="showBadgeInfoModal">
    <BadgeModal @claim="claimNft" :interactive="true"/>
  </q-dialog>
</template>

<script setup lang="ts">
import {computed, ref } from 'vue';
import { useMainStore} from '../stores/main.store';
import BadgeModal from './BadgeModal.vue'
import { Badge } from '../interfaces/badge.interface';

const props = defineProps({
  onlyClaimed: Boolean
})

const badges = computed(() => {
  return !props.onlyClaimed ? store.latest.badges : store.latest.badges.filter(b => b.status === 'CLAIMED' || b.minting)
})

const store = useMainStore();

const showBadgeInfoModal = ref(false)

async function showBadgeModal(badge: Badge) {
  await store.selectBadge(badge)
  showBadgeInfoModal.value = true
}

function claimNft(badge?: Badge) {
  store.mint(badge ? badge.id : store.latest.selectedBadge!.id)
}

const connected = computed(() => {
  return store.latest.walletAccount
})
</script>
