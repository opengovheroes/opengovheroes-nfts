import { badgedEnvMap } from "../../client/src/const/badges"
import { Badge } from "../../client/src/interfaces/badge.interface"
import { VoteStatistics } from "../../client/src/interfaces/vote-statistics.interface"
import { State, Votes } from "../../client/src/interfaces/votes.interface"
import { VotesStatisticsService } from "../../client/src/shared-module/service/votes-statistics.service"

const findBadge = (name: string): Badge => {
    return badgedEnvMap['polkadot'].find((b: Badge) => b.name === name)!
}

const voteStatistics: VoteStatistics = {
    hasVoted: false,
    votesCount: 0,
    hasSplitVote: false,
    hasSplitAbstained: false,
    delegatedVoter: false,
    soloVoter: false,
    firstReferendumIndex: 0,
    ayeVotes: 0,
    nayVotes: 0,
    maxConviction: false,
    minConviction: false,
    wonReferendums: 0,
    lostReferendums: 0,
    maxConvictionAye: false,
    maxConvictionNay: false
}

const assertTrue = (name: string, statistics: VoteStatistics) => {
    const b = findBadge(name)
    if (!b.available(statistics)) {
        throw `${b.name} is unavailable but should be available. ${JSON.stringify(statistics)}`
    }
}

const assertFalse = (name: string, statistics: VoteStatistics) => {
    const b = findBadge(name)
    if (b.available(statistics)) {
        throw `${b.name} is available but should not be available. ${JSON.stringify(statistics)}`
    }
}


const testBadges = () => {
    assertTrue("Open Gov Voter", { ...voteStatistics, hasVoted: true })
    assertFalse("Open Gov Voter", { ...voteStatistics, hasVoted: false })

    assertTrue("Open Gov Rookie", { ...voteStatistics, votesCount: 11 })
    assertFalse("Open Gov Rookie", { ...voteStatistics, votesCount: 9 })

    assertTrue("Open Gov Sidekick", { ...voteStatistics, votesCount: 51 })
    assertFalse("Open Gov Sidekick", { ...voteStatistics, votesCount: 30 })

    assertTrue("Open Gov Hero", { ...voteStatistics, votesCount: 200 })
    assertFalse("Open Gov Hero", { ...voteStatistics, votesCount: 98 })

    assertTrue("Open Gov Champion", { ...voteStatistics, votesCount: 510 })
    assertFalse("Open Gov Champion", { ...voteStatistics, votesCount: 450 })

    assertTrue("Open Gov Super Hero", { ...voteStatistics, votesCount: 1000 })
    assertFalse("Open Gov Super Hero", { ...voteStatistics, votesCount: 980 })

    assertTrue("OG", { ...voteStatistics, firstReferendumIndex: 250 })
    assertFalse("OG", { ...voteStatistics, firstReferendumIndex: 500 })

    assertTrue("Super OG", { ...voteStatistics, firstReferendumIndex: 97 })
    assertFalse("Super OG", { ...voteStatistics, firstReferendumIndex: 145 })

    assertTrue("Delegate Voter", { ...voteStatistics, delegatedVoter: true })
    assertFalse("Delegate Voter", { ...voteStatistics, delegatedVoter: false })

    assertTrue("Solo Voter", { ...voteStatistics, soloVoter: true })
    assertFalse("Solo Voter", { ...voteStatistics, soloVoter: false })

    assertTrue("Two Face", { ...voteStatistics, hasSplitVote: true })
    assertFalse("Two Face", { ...voteStatistics, hasSplitVote: false })

    assertTrue("The Silent Oracle", { ...voteStatistics, hasSplitAbstained: true })
    assertFalse("The Silent Oracle", { ...voteStatistics, hasSplitAbstained: false })

    assertTrue("Yes Man", { ...voteStatistics, ayeVotes: 61, votesCount: 100 })
    assertFalse("Yes Man", { ...voteStatistics, ayeVotes: 19, votesCount: 19 })
    assertFalse("Yes Man", { ...voteStatistics, ayeVotes: 59, votesCount: 100 })

    assertTrue("Aye Chan", { ...voteStatistics, ayeVotes: 61, votesCount: 70 })
    assertFalse("Aye Chan", { ...voteStatistics, ayeVotes: 59, votesCount: 100 })
    assertFalse("Aye Chan", { ...voteStatistics, ayeVotes: 18, votesCount: 19 })

    assertTrue("Eldritch Objection", { ...voteStatistics, nayVotes: 61, votesCount: 100 })
    assertFalse("Eldritch Objection", { ...voteStatistics, nayVotes: 59, votesCount: 100 })
    assertFalse("Eldritch Objection", { ...voteStatistics, nayVotes: 18, votesCount: 19 })

    assertTrue("Pink Reaper", { ...voteStatistics, nayVotes: 61, votesCount: 70 })
    assertFalse("Pink Reaper", { ...voteStatistics, nayVotes: 59, votesCount: 100 })
    assertFalse("Pink Reaper", { ...voteStatistics, nayVotes: 18, votesCount: 19 })

    assertTrue("Angry Dude", { ...voteStatistics, maxConvictionNay: true })
    assertFalse("Angry Dude", { ...voteStatistics, maxConvictionNay: false })

    assertFalse("Pink Knight", { ...voteStatistics, maxConvictionNay: true, votesCount: 19, nayVotes: 18 })
    assertFalse("Pink Knight", { ...voteStatistics, maxConvictionNay: false, votesCount: 70, nayVotes: 60 })
    assertFalse("Pink Knight", { ...voteStatistics, maxConvictionNay: true, votesCount: 70, nayVotes: 30 })
    assertTrue("Pink Knight", { ...voteStatistics, maxConvictionNay: true, votesCount: 70, nayVotes: 60 })

    assertTrue("Commander Heartforce", { ...voteStatistics, maxConvictionAye: true })
    assertFalse("Commander Heartforce", { ...voteStatistics, maxConvictionAye: false })

    assertTrue("Whatever Woman", { ...voteStatistics, minConviction: true })
    assertFalse("Whatever Woman", { ...voteStatistics, minConviction: false })

    assertTrue("Lady of  Justice", { ...voteStatistics, nayVotes: 11, ayeVotes: 11, votesCount: 22 })
    assertFalse("Lady of  Justice", { ...voteStatistics, nayVotes: 9, ayeVotes: 15, votesCount: 24 })
    assertFalse("Lady of  Justice", { ...voteStatistics, nayVotes: 13, ayeVotes: 10, votesCount: 23 })
    assertFalse("Lady of  Justice", { ...voteStatistics, nayVotes: 8, ayeVotes: 8, votesCount: 16 })

    assertTrue("Captain Winner", { ...voteStatistics, wonReferendums: 15, lostReferendums: 5, votesCount: 20 })
    assertFalse("Captain Winner", { ...voteStatistics, wonReferendums: 15, lostReferendums: 15, votesCount: 30 })
    assertFalse("Captain Winner", { ...voteStatistics, wonReferendums: 15, lostReferendums: 2, votesCount: 17 })

    assertTrue("Chief Lonley Wolf", { ...voteStatistics, wonReferendums: 5, lostReferendums: 25, votesCount: 30 })
    assertFalse("Chief Lonley Wolf", { ...voteStatistics, wonReferendums: 15, lostReferendums: 15, votesCount: 30 })
    assertFalse("Chief Lonley Wolf", { ...voteStatistics, wonReferendums: 5, lostReferendums: 14, votesCount: 19 })
}


const assertIsTrue = (result: boolean, errorMsg: string) => {
    if (!result) {
        throw errorMsg
    }
}

const votesStatisicServiceTest = () => {
    const result1 = new VotesStatisticsService().extract({
        items: [
            { proposal: { finished: true, state: { name: State.Executed } }, aye: true, conviction: 6, referendumIndex: 100 },
            { proposal: { finished: false, state: { name: State.Deciding } }, aye: true, referendumIndex: 65 },
            { proposal: { finished: true,  state: { name: State.Executed } } , isSplit: true, referendumIndex: 265 }]
    } as any)
    assertIsTrue(result1.votesCount === 2, "result1.votesCount === 2")
    assertIsTrue(result1.ayeVotes === 1, "result1.ayeVotes === 1")
    assertIsTrue(result1.nayVotes === 0, "result1.nayVotes === 0")
    assertIsTrue(result1.hasSplitVote, "result1.hasSplitVote")
    assertIsTrue(!result1.hasSplitAbstained, "!result1.hasSplitAbstained")
    assertIsTrue(!result1.delegatedVoter, "!result1.delegatedVoter")
    assertIsTrue(result1.soloVoter, "result1.soloVoter")
    assertIsTrue(result1.maxConviction, "result1.maxConviction")
    assertIsTrue(result1.maxConvictionAye,  "result1.maxConvictionAye")
    assertIsTrue(!result1.minConviction, "!result1.minConviction")
    assertIsTrue(!result1.maxConvictionNay, "!result1.maxConvictionNay")
    assertIsTrue(result1.wonReferendums === 1, "result1.wonReferendums === 1")
    assertIsTrue(result1.firstReferendumIndex === 100, "result1.firstReferendumIndex === 65")


    const votesStatistics2 = new VotesStatisticsService().extract({
        items: [
            { proposal: { finished: true, state: { name: State.Executed } }, aye: true, conviction: 0, isDelegating: true },
            { proposal: { finished: false, state: { name: State.Deciding } }, aye: true },
            { proposal: { finished: true,  state: { name: State.Rejected } } , aye: false, conviction: 6, isDelegating: true },
            { proposal: { finished: true,  state: { name: State.Rejected } } , aye: true, isDelegating: true },
            { proposal: { finished: true,  state: { name: State.Rejected } } , aye: false, isSplitAbstain: true, conviction: 6, isDelegating: true }]
    } as any)
    assertIsTrue(votesStatistics2.votesCount === 4, "votesStatistics2.votesCount === 4")
    assertIsTrue(votesStatistics2.ayeVotes === 2, "votesStatistics2.ayeVotes === 1")
    assertIsTrue(votesStatistics2.nayVotes === 1,  "votesStatistics2.nayVotes === 1")
    assertIsTrue(!votesStatistics2.hasSplitVote, "!votesStatistics2.hasSplitVote")
    assertIsTrue(votesStatistics2.hasSplitAbstained,  "votesStatistics2.hasSplitAbstained")
    assertIsTrue(votesStatistics2.delegatedVoter, "votesStatistics2.delegatedVoter")
    assertIsTrue(!votesStatistics2.soloVoter, "!votesStatistics2.soloVoter")
    assertIsTrue(votesStatistics2.maxConviction, "votesStatistics2.maxConviction")
    assertIsTrue(!votesStatistics2.maxConvictionAye, "!votesStatistics2.maxConvictionAye")
    assertIsTrue(votesStatistics2.minConviction, "votesStatistics2.minConviction")
    assertIsTrue(votesStatistics2.maxConvictionNay,  "votesStatistics2.maxConvictionNay")
    assertIsTrue(votesStatistics2.wonReferendums === 2, "votesStatistics2.wonReferendums === 2")
    assertIsTrue(votesStatistics2.lostReferendums === 1, "votesStatistics2.lostReferendums === 1")
}

testBadges()
votesStatisicServiceTest()