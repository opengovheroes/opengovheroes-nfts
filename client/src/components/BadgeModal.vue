<template>
    <q-card class="q-pa-md responsive-modal" v-if="badge">
        <q-img :src="'https://ipfs.io/ipfs/' + badge.cid"
            :ratio="1"
            class="image-box">
        </q-img>

        <q-card-section>
        <div class="q-mb-sm">
            <span class="text-subtitle2 text-grey">Item No: </span>
            <span class="text-h6">{{ badge.id }}</span>
        </div>
        <div class="q-mb-sm">
            <span class="text-subtitle2 text-grey">Name: </span>
            <span class="text-h6">{{ badge.name }}</span>
        </div>
        <div>
            <span class="text-subtitle2 text-grey">Description: </span><br/>
            <span class="text-body1 text-wrap">{{ badge.description }}</span>
        </div>
        <div class="q-mb-sm">
            <span class="text-subtitle2 text-grey">Requirements: </span><br/>
            <span class="text-body1 text-wrap">{{ badge.requirements || badge.description }}</span>
        </div>
        </q-card-section>

        <q-card-actions align="right">
            <q-btn v-if="!badge.minting && interactive && (badge.status === 'AVAILABLE' || badge.status === 'UNAVAILABLE')" flat :disable="store.latest.ongoingTransaction || badge.status !== 'AVAILABLE'" @click="$emit('claim')">Claim</q-btn>
          <q-skeleton v-if="badge.minting"><q-btn flat :disable="true">Minting</q-btn></q-skeleton>
          <q-btn flat label="Close" v-close-popup/>
        </q-card-actions>
    </q-card>
</template>

<script setup lang="ts">
import {computed } from 'vue';
import { useMainStore} from '../stores/main.store';

const store = useMainStore()

const props = defineProps({
  interactive: Boolean
})
defineEmits(['claim'])

const badge = computed(() => {
    return store.latest.selectedBadge!
})

</script>

