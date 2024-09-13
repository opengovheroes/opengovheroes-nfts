import { VoteStatistics } from './vote-statistics.interface'

export interface Badge {
    name: string,
    description: string
    cid: string
    available?: (voteStatistics: VoteStatistics) => boolean
    img?: string
    ipfs: string
    id: number
    requirements: string
}
