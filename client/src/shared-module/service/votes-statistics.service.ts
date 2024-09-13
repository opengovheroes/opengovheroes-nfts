import { VoteStatistics } from '../../interfaces/vote-statistics.interface'
import { State, Votes } from '../../interfaces/votes.interface'

export class VotesStatisticsService {
    extract(votes: Votes): VoteStatistics {
        const hasVoted = votes.items.length > 0
        const finishedProposals = votes.items.filter(v => v.proposal.finished)

        const votesCount = finishedProposals.length
        const ayeVotes = finishedProposals.filter(v => v.aye && !v.isSplitAbstain && !v.isSplit).length
        const nayVotes = finishedProposals.filter(v => !v.aye && !v.isSplitAbstain && !v.isSplit).length

        const hasSplitVote = finishedProposals.filter(v => v.isSplit).length > 0
        const hasSplitAbstained = finishedProposals.filter(v => v.isSplitAbstain).length > 0
        const delegatedVoter = finishedProposals.filter(v => v.isDelegating).length > 0
        const soloVoter = finishedProposals.filter(v => !v.isDelegating).length > 0

        const firstReferendumIndex = Math.min(...finishedProposals.map(v => v.referendumIndex))

        const maxConviction = finishedProposals.filter(v => v.conviction === 6).length > 0
        const minConviction = finishedProposals.filter(v => v.conviction === 0).length > 0

        const maxConvictionAye = finishedProposals.filter(v => v.conviction === 6 && v.aye && !v.isSplitAbstain).length > 0
        const maxConvictionNay = finishedProposals.filter(v => v.conviction === 6 && !v.aye && !v.isSplitAbstain).length > 0

        const wonReferendums = finishedProposals.filter(v => (v.aye && !v.isSplitAbstain && !v.isSplit && v.proposal.state.name === State.Executed) ||
            (!v.aye &&  !v.isSplitAbstain && !v.isSplit && v.proposal.state.name === State.Rejected)).length
        const lostReferendums = finishedProposals.filter(v => (!v.aye && !v.isSplitAbstain && !v.isSplit && v.proposal.state.name === State.Executed) ||
            (v.aye && !v.isSplitAbstain && !v.isSplit && v.proposal.state.name === State.Rejected)).length

        return {
            hasVoted,
            votesCount,
            hasSplitVote,
            hasSplitAbstained,
            delegatedVoter,
            soloVoter,
            firstReferendumIndex,
            ayeVotes,
            nayVotes,
            maxConviction,
            minConviction,
            wonReferendums,
            lostReferendums,
            maxConvictionAye,
            maxConvictionNay
        }
    }
}
