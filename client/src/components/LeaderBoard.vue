<template>
  <div class="justify-center full-width q-pa-lg">
    <div v-for="entry of store.latest.leaderBoard" :key="entry.address">
      <q-item style="flex-wrap: wrap; overflow: hidden;">
        <q-item-section>
          <q-item-label><a style="color: var(--q)"
              :href="'https://www.subscan.io/account/' + entry.address">{{ entry.name || entry.address
              }}</a></q-item-label>
          <div class="row">
            <div style="cursor: pointer" avatar v-for="badge of entry.items" :key="badge.id" class="q-ma-xs row"
              @click="showBadgeModal(badge)">
              <q-avatar square>
                <img :src="'https://ipfs.io/ipfs/' + badge.cid">
              </q-avatar>
            </div>
          </div>
        </q-item-section>
      </q-item>
      <q-separator spaced />
    </div>
  </div>

  <q-dialog v-model="showBadgeInfoModal">
    <BadgeModal :interactive="false" />
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '../stores/main.store';
import BadgeModal from './BadgeModal.vue'
import { Badge } from '../interfaces/badge.interface';

const store = useMainStore();

const showBadgeInfoModal = ref(false)

async function showBadgeModal(badge: Badge) {
  await store.selectBadge(badge)
  showBadgeInfoModal.value = true
}
</script>
