
export interface VoteStatistics {
    hasVoted: boolean;
    votesCount: number;
    hasSplitVote: boolean;
    hasSplitAbstained: boolean;
    delegatedVoter: boolean;
    soloVoter: boolean;
    firstReferendumIndex: number;
    ayeVotes: number;
    nayVotes: number;
    maxConviction: boolean;
    minConviction: boolean;
    wonReferendums: number;
    lostReferendums: number;
    maxConvictionAye: boolean;
    maxConvictionNay: boolean;
}