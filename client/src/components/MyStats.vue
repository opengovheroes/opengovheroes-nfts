<template>
  <div class="full-width q-py-md">
    <div class="text-h6 text-center" v-if="!connected">Please connect your wallet.</div>
    <div class="text-h6 text-center" v-if="connected && !voteStatistics">Loading stats...</div>
    <div v-if="voteStatistics">
      <div class="text-h6 text-center" v-if="!voteStatistics.hasVoted">
        You haven't voted on Open Gov yet.
      </div>
      <div class="text-h6 text-center" v-if="voteStatistics.hasVoted && voteStatistics.votesCount === 0">
        You voted on Open Gov but none of the referendums you voted on has finished.
      </div>
      <div class="text-h6 text-center" v-if="voteStatistics.hasVoted && voteStatistics.votesCount > 0">
        You votes {{ voteStatistics.votesCount }} times. You nayed {{ voteStatistics.nayVotes}} ({{(voteStatistics.nayVotes/voteStatistics.votesCount*100).toFixed(2) }}%) 
        and ayed {{ voteStatistics.ayeVotes }} ({{(voteStatistics.ayeVotes/voteStatistics.votesCount*100).toFixed(2) }}%) times.
      </div>
      <div class="text-h6 text-center" v-if="voteStatistics.votesCount > 0">
        The first referendum you votes on was referendum {{ voteStatistics.firstReferendumIndex }}.
      </div>
      <div class="text-h6 text-center" v-if="voteStatistics.votesCount > 0">
        You have {{ voteStatistics.minConviction ? '' : 'never'}} voted with min conviction.
      </div>
      <div class="text-h6 text-center" v-if="voteStatistics.votesCount > 0">
        You have {{ voteStatistics.maxConviction ? '' : 'never'}} voted with max conviction.
      </div>
      <div class="text-h6 text-center" v-if="voteStatistics.votesCount > 0">
        You won {{ voteStatistics.wonReferendums }} ({{(voteStatistics.wonReferendums/(voteStatistics.lostReferendums+voteStatistics.wonReferendums)*100).toFixed(2) }}%) of referenda and 
        lost {{ voteStatistics.lostReferendums }} ({{(voteStatistics.lostReferendums/(voteStatistics.lostReferendums+voteStatistics.wonReferendums)*100).toFixed(2) }}%).
      </div>
    </div>
</div>
</template>
<script setup lang="ts">
import { computed, ComputedRef } from 'vue';
import { VoteStatistics } from '../interfaces/vote-statistics.interface';
import { useMainStore } from '../stores/main.store';

const store = useMainStore()

const connected = computed(() => {
  return store.latest.walletAccount
})

const voteStatistics: ComputedRef<VoteStatistics> = computed(() => {
  return store.latest.voteStatistics!
})
</script>