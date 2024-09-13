import {State, Votes} from "../../../client/src/interfaces/votes.interface";
import fetch from "node-fetch";

const PAGE_SIZE = 100

export class FetchVotesService {
    constructor(private apiUrl: string) {
    }

    isFinished(state: State) {
        return ["TimedOut", "Executed", "Rejected", "Cancelled", "Killed"].indexOf(state) != -1
    }

    private  async fetchVotes(address, page): Promise<Votes> {
        const response = await fetch(`${this.apiUrl}/users/${address}/referenda/votes?page=${page}&page_size=100&includes_title=1`)
        return response.json()
    }

    async fetchAllVotes(address): Promise<Votes> {
        let currentPage = 1;
        const votes: Votes = await this.fetchVotes(address, currentPage)
        while (currentPage * PAGE_SIZE < votes.total) {
            currentPage += 1;
            const nextVotes: Votes = await this.fetchVotes(address, currentPage)
            votes.items.push(...nextVotes.items)
        }
        votes.items.forEach(vote => {
            vote.proposal.finished = this.isFinished(vote.proposal.state.name)
        })
        return votes;
    }
}