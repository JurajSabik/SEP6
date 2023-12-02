export let test_users = [
    {
        userId: 'ec9c9815-7f62-4733-9344-8568d5afab44',
        username: 'testUser1',
        email: 'test.user@gmail.com',
        role: "STANDARD_USER",
    },
    {
        userId: '68168bf7-4278-4431-88f7-98a4ce309ef7',
        username: 'testUser2',
        email: 'test.user2@gmail.com',
        role: "STANDARD_USER",
    },
    {
        userId: 'f50baef1-39da-43cf-8fc9-2c9b1503c637',
        username: 'testUser3',
        email: 'test.user3@gmail.com',
        role: "STANDARD_USER",
    },
    {
        userId: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
        username: 'testUser4',
        email: 'test.user4@gmail.com',
        role: "STANDARD_USER",
    },
    {
        userId: 'b2c3d4e5-6789-01ab-cdef-2345678901bc',
        username: 'testUser5',
        email: 'test.user5@gmail.com',
        role: "STANDARD_USER",
    }
]

export let test_reviews = [
    {
        userId: test_users[0].userId,
        movieId: 'm-99',
        text: 'Review from testUser1',
        rating: 2
    },
    {
        userId: test_users[1].userId,
        movieId: 'm-98',
        text: 'Review from testUser2',
        rating: 4
    },
    {
        userId: test_users[2].userId,
        movieId: 'm-97',
        text: 'Review from testUser3',
        rating: 3
    },
    {
        userId: test_users[3].userId,
        movieId: 'm-96',
        text: 'Review from testUser4',
        rating: 5
    },
    {
        userId: test_users[4].userId,
        movieId: 'm-95',
        text: 'Review from testUser5',
        rating: 1
    }
]

