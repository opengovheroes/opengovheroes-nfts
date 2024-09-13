import { Badge } from '../interfaces/badge.interface';

export const badges: Badge[] = [
    {
        name: 'Open Gov Voter',
        description: 'You voted on open gov. Yay!',
        img: 'voter',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        ipfs: 'QmPfvM2saXQELqLaW3aeMjqSHfgYeEF28s9v4civBbD2Ak',
        available: (voteStatistics => voteStatistics.hasVoted),
        id: 1,
        requirements: 'You voted on Open Gov at least once'
    },
    {
        name: 'Open Gov Rookie',
        description: 'You voted at least 10 times!',
        img: 'rookie',
        cid: 'QmWCYeByezj36Z5qp5YjWSdEz2LDe1FhCrzocMe5moj1hC',
        ipfs: 'Qmf9Fd9q7u7v6XdD1ixVeMH6rt95YifC7eB1dASnU59dnc',
        available: (voteStatistics => voteStatistics.votesCount >= 10),
        id: 2,
        requirements: 'You voted 10 times or more'
    },
    {
        name: 'Open Gov Sidekick',
        description: 'You voted at least 50 times!',
        img: 'sidekick',
        cid: 'QmQncd3EGGriDEZDzcevCbkMxp2z3VwGXnuFo8GpKKChbM',
        ipfs: 'QmVbK7vsZ1iewPof4bU59uL2c7prAKrJfgDLupCiRiEpXX',
        available: (voteStatistics => voteStatistics.votesCount >= 50),
        id: 3,
        requirements: 'You voted 50 times or more'
    },
    {
        name: 'Open Gov Hero',
        description: 'You voted at least 100 times!',
        img: 'hero2',
        cid: 'QmT3Q83RsWcrFmH8rJ81E68d7A3Pr7yyZ2xdQBFFNehiMi',
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        available: (voteStatistics => voteStatistics.votesCount >= 100),
        id: 4,
        requirements: 'You voted 100 times or more'
    },
    {
        name: 'Open Gov Champion',
        description: 'You voted at least 500 times!',
        img: 'champion',
        cid: 'QmV1ptB6BnbsAeaDSFELhCMP6MZFLQB1kQzgKg3ybxDAcp',
        ipfs: 'QmeAXDHDHwVPzxNEvLKYeBHSpXjtTd4vCSS9dE1dFLg6P6',
        available: (voteStatistics => voteStatistics.votesCount >= 500),
        id: 5,
        requirements: 'You voted 500 times or more'
    },
    {
        name: 'Open Gov Super Hero',
        description: 'You voted at least 1000 times!',
        img: 'super-hero',
        cid: 'QmVesFapH9PQYszU1G754GJ633k41DfD31Tb7PZ4cTpz6T',
        ipfs: 'QmWLVbSHoo3zB9EsScjpzrUBiAzYiwa9HAZGrwaA8PqASv',
        available: (voteStatistics => voteStatistics.votesCount >= 1000),
        id: 6,
        requirements: 'You voted 1000 times or more'
    },
    {
        name: 'OG',
        description: 'You are an early open gov participant',
        img: 'og',
        cid: 'QmSx9Mz1AfmdYKLBySFH6skbQC1x3gJqajtaFXWy9upncg',
        ipfs: 'Qma8MnPiYk5C1nUPnGwFau5vsvuJePwU5XSq3hb2X1BWfL',
        available: (voteStatistics => voteStatistics.firstReferendumIndex <= 250),
        id: 7,
        requirements: 'You voted on a referendum with id < 250'
    },
    {
        name: 'Super OG',
        description: 'You are a very early open gov participant',
        img: 'super-og',
        cid: 'QmR3doAXDX6ycJ7T57FVy9jX2dEXnhSP6NoY8pwKexyZiZ',
        ipfs: 'QmRJJ3NwjkUcmYfWWaSyrb6Y7yGwuucx5Q3SrfzCMxUNVc',
        available: (voteStatistics => voteStatistics.firstReferendumIndex <= 100),
        id: 8,
        requirements: 'You voted on a referendum with id < 100'
    },
    {
        name: 'Delegate Voter',
        description: 'You participated in delegated voting',
        img: 'delegate-voter',
        cid: 'QmQLAcFpJxrdWsEJ8bsjuyxyNH8BvsSHAKvYFGXGJnHr4m',
        ipfs: 'Qmc2KGAM8BzUj6dzNkbYg5BnAoDg2JkHRTvRhypebon4Ew',
        available: (voteStatistics => voteStatistics.delegatedVoter),
        id: 9,
        requirements: 'You voted at least once via delegated voting'
    },
    {
        name: 'Solo Voter',
        description: 'You participated in solo voting',
        img: 'solo-voter',
        cid: 'QmZp3Tsh6L2CHoCKHHT7AWTJZpejQaCmtoHfX7BKdQLKgD',
        ipfs: 'QmVxKaE5PCW3otCMbuLyevZ5ikoJLAa21VSRh66Tuxy2gA',
        available: (voteStatistics => voteStatistics.soloVoter),
        id: 10,
        requirements: 'You solo voted at least once'
    },
    {
        name: 'Two Face',
        description: 'A mystical figure whose dual faces reflect the echo of split decisions',
        img: 'two-face',
        cid: 'QmYDTboviMWagAiRWG18uZHitARL5eoWvH3NHvyz6Bt3jh',
        ipfs: 'QmavStk9334cb9SxjkMow66DujGiio47C8oA6E4drpd32R',
        available: (voteStatistics => voteStatistics.hasSplitVote),
        id: 11,
        requirements: 'You split voted at least once'
    },
    {
        name: 'The Silent Oracle',
        description: 'You abstained, but why?',
        img: 'silent-oracle',
        cid: 'QmQpWmNZymNSTGcovvsxtjofKYHgTStPypzkJZkxK1DkjG',
        ipfs: 'QmeuXsKhHrG8rVaszEyYsmCCxnC3FG76digp9x2vnL9xMa',
        available: (voteStatistics => voteStatistics.hasSplitAbstained),
        id: 12,
        requirements: 'You abstained at least once'
    },
    {
        name: 'Yes Man',
        description: "A hero whose enthusiasm for voting 'aye' is as unyielding as his commitment to justice.",
        img: 'yes-man',
        cid: 'QmXuc1DGocNkgtA84cCZrzSkB5NPiW4CFvZSV96px7Rwm5',
        ipfs: 'QmY9h7rTc2eDwqWU5Fac5XF97Cd765F8bxTwHwrsv111uE',
        available: (voteStatistics => (voteStatistics.ayeVotes >= voteStatistics.votesCount * 0.6 && voteStatistics.votesCount >= 20)),
        id: 13,
        requirements: 'You voted at least 20 times, at least 60% of all votes were AYE'
    },
    {
        name: 'Aye Chan',
        description: 'The treasury must be spent!',
        img: 'aye-chan',
        cid: 'QmVrGiAgjT9AjfSqLEiKgUsM4zzFWGMLn3ZPLVMDkZBihd',
        ipfs: 'QmVEW3dQFLCVrQDZtRqSAKfRnMrY3JF9V4GfPKjmp9DHBU',
        available: (voteStatistics => (voteStatistics.ayeVotes  >= voteStatistics.votesCount * 0.75 && voteStatistics.votesCount >= 20)),
        id: 16,
        requirements: 'You voted at least 20 times, at least 75% of all votes were AYE'
    },
    {
        name: 'Eldritch Objection',
        description: 'You shall not pass!',
        img: 'eldrich-objection',
        cid: 'QmW9VeaydE9u4RMS6xRZx6fMQygy48YZi13tU4TFzXDr3e',
        ipfs: 'QmU5pmJYF5Lgu2zUE1tSgqySEKug5EwTJYojsYxADz1KKN',
        available: (voteStatistics => (voteStatistics.nayVotes >= voteStatistics.votesCount * 0.6 && voteStatistics.votesCount >= 20)),
        id: 17,
        requirements: 'You voted at least 20 times, at least 60% of all votes were NAY'
    },
    {
        name: 'Pink Reaper',
        description: 'In his dazzling pink cloak, The Pink Reaper casts every vote with deliberate intent.',
        img: 'pink-reaper',
        cid: 'QmSdH9sVNGDaNqhEYYWrwyH7K3wfYfyV8MFF58ftMqZMKE',
        ipfs: 'QmRun2evt8Fs5QWRQtaW4iHDq8N4UJni9pfWiB9FvCHdMv',
        available: (voteStatistics => (voteStatistics.nayVotes >= voteStatistics.votesCount * 0.75  && voteStatistics.votesCount >= 20)),
        id: 18,
        requirements: 'You voted at least 20 times, at least 75% of all votes were NAY'
    },
    {
        name: 'Angry Dude',
        description: 'He is battling the grifters. Are you in the fight as well?',
        img: 'angry-dude',
        cid: 'QmT6yVog2m85P8mUDSSGkKKr3T7j2w2w421rNUKWbWVK8q',
        ipfs: 'QmSAmhmuKPPtG2QbChs9BG3PbTeNaLBeVP2oFbJkC3wXSQ',
        available: (voteStatistics => voteStatistics.maxConvictionNay),
        id: 19,
        requirements: 'You voted NAY with max conviction at least once'
    },
    {
        name: 'Pink Knight',
        description: 'The hero Open Gov deserves',
        img: 'pink-knight',
        cid: 'QmZmxdYh1zR9SyPuqnzbEHUmu5c34gse37aF8vMXj5kUXP',
        ipfs: 'QmPdfgJ2iMsyyvSnXu7upGHDGKbvUd6caLjC4MuGgdEkNZ',
        available: (voteStatistics => voteStatistics.maxConvictionNay && voteStatistics.nayVotes >= voteStatistics.votesCount * 0.7  && voteStatistics.votesCount >= 20),
        id: 20,
        requirements: 'You voted NAY with max conviction at least once, nayed 70% of the times and at least voted 20 times'
    },
    {
        name: 'Commander Heartforce',
        description: 'Commander Heartforce is a paragon of unwavering dedication and heartfelt conviction',
        img: 'commander-heartforce',
        cid: 'QmXVHKmrWZR4PPxo8qTHuTRDKRxnsTgTczrzwwGTBBX9NC',
        ipfs: 'QmWpprnxo7M7tcCbjQjF9Qps6j1g4BtdCUp9siG8yHm66X',
        available: (voteStatistics => voteStatistics.maxConvictionAye),
        id: 21,
        requirements: 'You voted AYE with max conviction at least once'
    },
    {
        name: 'Whatever Woman',
        description: "She really doesn't care. Do you?",
        img: 'whatever-woman',
        cid: 'QmYH8zn7uSrjNuvQb7KhLHcQXbesJqFxjoVqad71DFw59q',
        ipfs: 'QmPxb4rFPMUa81A4TWXoR7gPDSEgBTf6NzDatjwJLHtjso',
        available: (voteStatistics => voteStatistics.minConviction),
        id: 22,
        requirements: 'You voted with min conviction at least once'
    },
    {
        name: 'Lady of Justice',
        description: 'A guardian of balance and impartiality, she weighs every decision with equal care',
        img: 'lady-of-justice',
        cid: 'QmPBSu8zRP15SHdvsqaChdpUcshkPmgXicB5wVH9YaEE2k',
        ipfs: 'QmcwJKJRHdJi7qsXaf6wFXy4tPuM1VWDzQHE3ceUb96PB8',
        available: (voteStatistics => (voteStatistics.nayVotes <= voteStatistics.votesCount * 0.55 && voteStatistics.ayeVotes <= voteStatistics.votesCount * 0.55 && voteStatistics.votesCount >= 20)),
        id: 23,
        requirements: 'You voted neither aye and nor nay more than 55% of times and voted at least 20 times'
    },
    {
        name: 'Captain Winner',
        description: 'Congratulations. You always side with the winners.',
        img: 'captain-winnter',
        cid: 'QmZCp4nsHgsGL35pfE51xxJKTqEZNspVWVj9wEXNSGo6oS',
        ipfs: 'QmQRWjJoLaakQKyqXMZtDtegSv4UfzrRmq1utWmcpuh3eK',
        available: (voteStatistics => (voteStatistics.wonReferendums >= (voteStatistics.lostReferendums+voteStatistics.wonReferendums) * 0.6  && voteStatistics.votesCount >= 20)),
        id: 24,
        requirements: 'You won at least 60% of all referendums and voted at least 20 times'
    },
    {
        name: 'Lonely Wolf',
        description: 'He continues to fight with unwavering determination.',
        img: 'chief-lonely-wolf',
        cid: 'QmRkpyHZ7viXKY8aUnjWHfZVCNARnnEkqiaMd1V1GwVape',
        ipfs: 'QmVUFpkfD7QFZRvPyEqDYKpLmXm4yrs8rviFRmGanYLHPP',
        available: (voteStatistics => (voteStatistics.wonReferendums <= (voteStatistics.lostReferendums+voteStatistics.wonReferendums) * 0.4  && voteStatistics.votesCount >= 20)),
        id: 25,
        requirements: 'You lost at least 60% of all referendums and voted at least 20 times'
    }
]

export const badgesWestend: Badge[] = [
    {
        name: '22',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => false),
        id: 22,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    {
        name: '23',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 23,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    {
        name: '24',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 24,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    
    {
        name: '25',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 25,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    
    {
        name: '26',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 26,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    
    {
        name: '27',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 27,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    {
        name: '28',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 28,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    {
        name: '29',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 29,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    {
        name: '30',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 30,
        ipfs: 'Qmbw3DBNaHh8U11a2ZeBRJSEYUe24HxPkZuxmH65ZKo1N5',
        requirements: 'bla'
    },
    {
        name: '31',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 31,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '32',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 32,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '33',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 33,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '34',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 34,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '35',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 35,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '36',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 36,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '37',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 37,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '38',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 38,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '39',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 39,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
    {
        name: '40',
        description: 'dummy text',
        cid: 'QmPPmGVtKLKeXL79SzMkmBSuZV5eXHyAhkBdubtA7dMmbq',
        available: (() => true),
        id: 40,
        ipfs: 'QmQXktPFeu9KNU6Y8Wo5jFczwXnrqZVr3AzrPBjWiYvZ8X',
        requirements: 'bla'
    },
]

export const badgedEnvMap = {
    kusama: badges,
    polkadot: badges,
    westend: badgesWestend
}