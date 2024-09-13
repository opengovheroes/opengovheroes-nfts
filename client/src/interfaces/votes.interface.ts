
export enum State {
    TimedOut = 'TimedOut',
    Executed = 'Executed',
    Rejected = 'Rejected',
    Cancelled = 'Cancelled',
    Killed = 'Killed',
    Deciding = 'Deciding',
    Confirming = 'Confirming',
}

export interface ProposalDTO {
    title: string,
    state: {
        name: State,
        indexer: {
            blockHeight: number,
            blockTime: number,
        }
    }
}

export interface Proposal extends ProposalDTO {
    finished: boolean
}

export interface Vote {
    referendumIndex: number
    account: string
    target: string
    isDelegating: boolean
    isSplit: boolean
    isSplitAbstain: boolean
    balance: string
    aye: boolean
    conviction: number
    votes: string
    queryAt: number
    proposal: Proposal
}

export interface Votes {
    items: Vote[]
    total: number
}