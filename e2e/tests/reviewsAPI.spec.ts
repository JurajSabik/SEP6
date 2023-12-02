import {test, expect} from "@playwright/test";
import dotenv from "dotenv";
import {getHeaders} from "../utils/tokenHandler";

// Read from default ".env" file.
dotenv.config();
const users_url = process.env.API_URL + "/users";
const reviews_url = process.env.API_URL + "/reviews";

let test_users = [
    {
        userId: 'b954a416-80bc-11ee-b962-0242ac120009',
        username: 'testUser',
        email: 'test.user@gmail.com',
        birthday: '2002-09-28',
        role: "STANDARD_USER",
    },
    {
        userId: 'b954a416-80bc-11ee-b962-0242ac120022',
        username: 'testUser2',
        email: 'test.user2@gmail.com',
        birthday: '2002-10-28',
        role: "STANDARD_USER",
    }
]

let test_reviews = [
    {
        userId: test_users[0].userId,
        movieId: 'm-99',
        text: 'review review ...',
        rating: 2
    },
    {
        userId: test_users[0].userId,
        movieId: 'm-98',
        text: 'review review ...',
        rating: 2
    },
    {
        userId: test_users[1].userId,
        movieId: 'm-99',
        text: 'review review ...',
        rating: 2
    },
    {
        userId: test_users[1].userId,
        movieId: 'm-98',
        text: 'review review ...',
        rating: 2
    }
]

//before all tests, create a new user
test.beforeAll(async ({request}) => {
    //create test user
    for(let i=0; i<test_users.length; i++){
        let response = await request.post(users_url, {data: test_users[i], headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
    }
});
//after all tests, delete the user
test.afterAll(async ({request}) => {
    //delete test users
    for (let i = 0; i < test_users.length; i++) {
        //get test user
        let response = await request.get(users_url+"/"+test_users[i].userId, {headers: await getHeaders(request)});
        //delete user if exists/response is 200
        if(response.status() == 200) {
            response = await request.delete(users_url+"/"+test_users[i].userId, {headers: await getHeaders(request)});
            expect(response.status()).toBe(200);
        }
        else{
            response = await request.delete(users_url+"/"+test_users[i].userId, {headers: await getHeaders(request)});
            expect(response.status()).toBe(404);
        }
    }
});

test.describe("Reviews API", () => {   
    //test create review
    test("Create review", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        expect(body_obj['text']).toBe(review['text'])
        expect(body_obj['rating']).toBe(review['rating'])

        //delete review
        response = await request.delete(reviews_url+"/"+body_obj['reviewId'], {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
    });

    //test get review
    test("Get review by ID", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)

        //get review
        response = await request.get(reviews_url+"/"+body_obj['reviewId'], {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj['text']).toBe(review['text'])
        expect(body_obj['rating']).toBe(review['rating'])

        //delete review
        response = await request.delete(reviews_url+"/"+body_obj['reviewId'], {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
    });

    //test get reviews by user ID
    test("Get reviews by user ID", async ({request}) => {
        let user = test_users[0]
        let review_count = 0
        //create reviews
        for(let i=0; i<test_reviews.length; i++){
            if (test_reviews[i].userId == user.userId) {
                let response = await request.post(reviews_url, {data: test_reviews[i], headers: await getHeaders(request)});
                expect(response.status()).toBe(201);
                review_count++;
            }
        }

        //get reviews by user
        let response = await request.get(reviews_url+"/user/"+user.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(review_count)

        //delete reviews
        for(let i=0; i<body_obj.length; i++){
            response = await request.delete(reviews_url+"/"+body_obj[i]['reviewId'], {headers: await getHeaders(request)});
            expect(response.status()).toBe(200);
        }
    });

    //test get reviews by movie ID
    test("Get reviews by movie ID", async ({request}) => {
        let movie_id = 'm-99'
        let review_count = 0
        //create reviews
        for(let i=0; i<test_reviews.length; i++){
            if (test_reviews[i].movieId == movie_id) {
                let response = await request.post(reviews_url, {data: test_reviews[i], headers: await getHeaders(request)});
                expect(response.status()).toBe(201);
                review_count++;
            }
        }

        //get reviews by movie
        let response = await request.get(reviews_url+"/movie/"+movie_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(review_count)

        //delete reviews
        for(let i=0; i<body_obj.length; i++){
            response = await request.delete(reviews_url+"/"+body_obj[i]['reviewId'], {headers: await getHeaders(request)});
            expect(response.status()).toBe(200);
        }
    });

    //test update review
    test ("Update review", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)

        //update review
        let updated_review = body_obj
        updated_review['text'] = "updated review"
        updated_review['rating'] = 5

        response = await request.put(reviews_url, {data: updated_review, headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        // body_str = (await response.body()).toString()
        // body_obj = JSON.parse(body_str)
        // expect(body_obj['text']).toBe(updated_review['text'])
        // expect(body_obj['rating']).toBe(updated_review['rating'])

        //get review
        response = await request.get(reviews_url+"/"+body_obj['reviewId'], {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj['text']).toBe(updated_review['text'])
        expect(body_obj['rating']).toBe(updated_review['rating'])

        //delete review
        response = await request.delete(reviews_url+"/"+body_obj['reviewId'], {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
    });

    //test delete review
    test ("Delete review", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)

        //delete review
        response = await request.delete(reviews_url+"/"+body_obj['reviewId'], {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get review
        response = await request.get(reviews_url+"/"+body_obj['reviewId'], {headers: await getHeaders(request)});
        expect(response.status()).toBe(404);
    });

    //delete voted review
    test ("Delete voted review", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        let review_id = body_obj['reviewId']

        //upvote review
        response = await request.put(reviews_url+"/upvote/"+review_id+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //delete review
        response = await request.delete(reviews_url+"/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get review
        response = await request.get(reviews_url+"/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(404);
    });

    //delete reviews when user is deleted
    test ("Delete reviews when user is deleted", async ({request}) => {
        let user = test_users[0]
        let review_count = 0
        //create reviews
        for(let i=0; i<test_reviews.length; i++){
            if (test_reviews[i].userId == user.userId) {
                let response = await request.post(reviews_url, {data: test_reviews[i], headers: await getHeaders(request)});
                expect(response.status()).toBe(201);
                review_count++;
            }
        }

        //delete user
        let response = await request.delete(users_url+"/"+user.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get reviews by user
        response = await request.get(reviews_url+"/user/"+user.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(0)
    });
});

test.describe("Voting", () => {
     //test upvote review
     test ("Upvote review", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        let review_id = body_obj['reviewId']

        //upvote review
        response = await request.put(reviews_url+"/upvote/"+review_id+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get votes of review
        response = await request.get(reviews_url+"/votes/review/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)
        expect(body_obj[0]['userId']).toBe(test_users[0].userId)
        expect(body_obj[0]['isUpvote']).toBe(true)

        //get votes of user
        response = await request.get(reviews_url+"/votes/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)
        expect(body_obj[0]['reviewId']).toBe(review_id)
        expect(body_obj[0]['isUpvote']).toBe(true)

        //delete review
        response = await request.delete(reviews_url+"/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
    });

    //test downvote review
    test ("Downvote review", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        let review_id = body_obj['reviewId']

        //downvote review
        response = await request.put(reviews_url+"/downvote/"+review_id+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get votes of review
        response = await request.get(reviews_url+"/votes/review/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)
        expect(body_obj[0]['userId']).toBe(test_users[0].userId)
        expect(body_obj[0]['isUpvote']).toBe(false)

        //get votes of user
        response = await request.get(reviews_url+"/votes/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)
        expect(body_obj[0]['reviewId']).toBe(review_id)
        expect(body_obj[0]['isUpvote']).toBe(false)

        //delete review
        response = await request.delete(reviews_url+"/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
    });

    //test get votes by review ID
    test ("Get votes by review ID", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        let review_id = body_obj['reviewId']

        //upvote review
        response = await request.put(reviews_url+"/upvote/"+review_id+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //downvote review
        response = await request.put(reviews_url+"/downvote/"+review_id+"/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get votes of review
        response = await request.get(reviews_url+"/votes/review/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(2)
        for(let i=0; i<body_obj.length; i++){
            if(body_obj[i]['userId'] == test_users[0].userId){
                expect(body_obj[i]['isUpvote']).toBe(true)
            }
            else if(body_obj[i]['userId'] == test_users[1].userId){
                expect(body_obj[i]['isUpvote']).toBe(false)
            }
        }

        //delete review
        response = await request.delete(reviews_url+"/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
    });

    //test get votes by user ID
    test ("Get votes by user ID", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        let review_id = body_obj['reviewId']

        //upvote review
        response = await request.put(reviews_url+"/upvote/"+review_id+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //downvote review
        response = await request.put(reviews_url+"/downvote/"+review_id+"/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get votes of user
        response = await request.get(reviews_url+"/votes/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)
        expect(body_obj[0]['reviewId']).toBe(review_id)
        expect(body_obj[0]['isUpvote']).toBe(true)

        //delete review
        response = await request.delete(reviews_url+"/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
    });

    //test delete votes when review is deleted
    test ("Delete votes when review is deleted", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        let review_id = body_obj['reviewId']

        //upvote review
        response = await request.put(reviews_url+"/upvote/"+review_id+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //downvote review
        response = await request.put(reviews_url+"/downvote/"+review_id+"/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get votes of review
        response = await request.get(reviews_url+"/votes/review/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(2)

        //delete review
        response = await request.delete(reviews_url+"/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get votes of review
        response = await request.get(reviews_url+"/votes/review/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(404);

        //get votes of user
        response = await request.get(reviews_url+"/votes/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(0)

        //get votes of user
        response = await request.get(reviews_url+"/votes/user/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(0);
    });

    //delete votes when user is deleted
    test ("Delete votes when user is deleted", async ({request}) => {
        let review = test_reviews[2]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        let review_id = body_obj['reviewId']

        //upvote review
        response = await request.put(reviews_url+"/upvote/"+review_id+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //downvote review
        response = await request.put(reviews_url+"/downvote/"+review_id+"/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get votes of review
        response = await request.get(reviews_url+"/votes/review/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(2)

        //delete user1
        response = await request.delete(users_url+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get votes of review
        response = await request.get(reviews_url+"/votes/review/"+review_id, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)

        //get votes of user
        response = await request.get(reviews_url+"/votes/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).not.toBe(0)

        //get votes of user
        response = await request.get(reviews_url+"/votes/user/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).not.toBe(1)
    });

    //test cross voting with user deletion
    test ("Cross voting with user deletion", async ({request}) => {
        let review = test_reviews[0]
        let response = await request.post(reviews_url, {data: review, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        let body_str = (await response.body()).toString()
        let body_obj = JSON.parse(body_str)
        let review_id1 = body_obj['reviewId']

        let review2 = test_reviews[2]
        response = await request.post(reviews_url, {data: review2, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        let review_id2 = body_obj['reviewId']

        //vote on reviews
        response = await request.put(reviews_url+"/upvote/"+review_id1+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        response = await request.put(reviews_url+"/downvote/"+review_id1+"/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        response = await request.put(reviews_url+"/upvote/"+review_id2+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        response = await request.put(reviews_url+"/downvote/"+review_id2+"/"+test_users[1].userId, {headers: await getHeaders(request)});

        //user1
        //get reviews of user1
        response = await request.get(reviews_url+"/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)
        expect(body_obj[0]['reviewId']).toBe(review_id1)
        //get votes of user1
        response = await request.get(reviews_url+"/votes/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(2)

        //user2
        //get reviews of user2
        response = await request.get(reviews_url+"/user/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)
        //get votes of user2
        response = await request.get(reviews_url+"/votes/user/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(2)

        //get votes of review1
        response = await request.get(reviews_url+"/votes/review/"+review_id1, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(2)

        //get votes of review2
        response = await request.get(reviews_url+"/votes/review/"+review_id2, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(2)

        //delete user1
        response = await request.delete(users_url+"/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //get reviews of user1
        response = await request.get(reviews_url+"/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(0)

        //get votes of user1
        response = await request.get(reviews_url+"/votes/user/"+test_users[0].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).not.toBe(0)

        //get votes of review1
        response = await request.get(reviews_url+"/votes/review/"+review_id1, {headers: await getHeaders(request)});
        expect(response.status()).toBe(404);

        //get votes of review2
        response = await request.get(reviews_url+"/votes/review/"+review_id2, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)

        //get reviews of user2
        response = await request.get(reviews_url+"/user/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        expect(body_obj.length).toBe(1)

        //get votes of user2
        response = await request.get(reviews_url+"/votes/user/"+test_users[1].userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        body_str = (await response.body()).toString()
        body_obj = JSON.parse(body_str)
        //expect(body_obj.length).toBe(1)
        for(let i=0; i<body_obj.length; i++){
            expect(body_obj[i]['userId']).toBe(test_users[1].userId)
        }
    });
});
