import {test, expect} from '@playwright/test';
import {test_users, test_reviews} from '../test-resources/resources';
import dotenv from "dotenv";

dotenv.config();
const users_url = process.env.API_URL + '/users';
const reviews_url = process.env.API_URL + '/reviews';
const comments_url = process.env.API_URL + '/comments';
let reviewIds: string[] = []; // Array to store the created review IDs

// Helper function to create a comment and get the needed IDs
async function createComment(request: any, comment: any) {
    let commentResponse = await request.post(comments_url, {data: comment});
    if (commentResponse.status() !== 201) {
        throw new Error(`Failed to create comment. Status: ${commentResponse.status()}, Response: ${await commentResponse.text()}`);
    }
    return await commentResponse.json();
}

async function createReviewAndStoreId(request: any, reviews_url: string, review: any, userId: string) {
    review.userId = userId;
    let reviewResponse = await request.post(reviews_url, {data: review});
    if (reviewResponse.status() !== 201) {
        throw new Error(`Failed to create review. Status: ${reviewResponse.status()}, Response: ${await reviewResponse.text()}`);
    }
    let createdReview = await reviewResponse.json();
    reviewIds.push(createdReview.reviewId);
}

test.beforeAll(async ({request}) => {
    // Create test users
    for (let user of test_users) {
        let response;
        try {
            response = await request.post(users_url, {data: user});
            expect(response.status()).toBe(201);
        } catch (error) {
            console.error(`Failed to create user: ${error}`);
        }
    }
    // Create test reviews and store their IDs
    for (let review of test_reviews) {
        await createReviewAndStoreId(request, reviews_url, review, review.userId);
    }
});

test.afterAll(async ({request}) => {
    for (let reviewId of reviewIds) {
        try {
            let commentsResponse = await request.get(`${comments_url}/review/${reviewId}`);
            if (commentsResponse.status() === 200) {
                let comments = await commentsResponse.json();
                for (let comment of comments) {
                    let response = await request.delete(`${comments_url}/${comment.commentId}`);
                    if(response.status() == 200){
                        expect(response.status()).toBe(200);
                    }
                    else{
                        expect(response.status()).toBe(404);
                    }
                }
            }
        } catch (error) {
            console.error(`Failed to delete comments for review ID ${reviewId}: ${error}`);
        }
    }
    // Delete all test users
    for (let user of test_users) {
        try {
            let response = await request.delete(users_url + "/" + user.userId);
            if(response.status() == 200){
                expect(response.status()).toBe(200);
            }
            else{
                expect(response.status()).toBe(404);
            }
        } catch (error) {
            console.error(`Failed to delete user: ${error}`);
        }
    }
});

test.describe.skip("Comments API", () => {
    test('Create a comment', async ({request}) => {
        let newComment = {
            userId: test_users[0].userId,
            reviewId: reviewIds[1],
            text: 'I agree wholeheartedly'
        };
        let commentResponse = await request.post(comments_url, {data: newComment});
        expect(commentResponse.status()).toBe(201);
        let commentResponseJson = await commentResponse.json();
        expect(commentResponseJson.text).toEqual(newComment.text);
    });

    test('Get comment by ID', async ({request}) => {
        let newComment = {
            userId: test_users[0].userId,
            reviewId: reviewIds[2],
            text: 'Incredible'
        };
        let commentPost = await createComment(request, newComment);
        let commentGet = await request.get(comments_url + "/" + commentPost.commentId);
        expect(commentGet.status()).toBe(200);
        expect(await commentGet.json()).toEqual(commentPost);
    });

    test('Update comment', async ({request}) => {
        let oldComment = {
            userId: test_users[0].userId,
            reviewId: reviewIds[3],
            text: 'What a bunch of hogwash'
        };
        let oldCommentResponse = await request.post(comments_url, {data: oldComment});
        expect(oldCommentResponse.status()).toBe(201);
        let oldCommentResponseJson = await oldCommentResponse.json();
        expect(oldCommentResponseJson.text).toEqual(oldComment.text);

        // Update the comment
        let updatedComment = {
            commentId: oldCommentResponseJson.commentId,
            userId: test_users[0].userId,
            reviewId: reviewIds[3],
            text: 'Actually I agree'
        };
        let commentPut = await request.put(comments_url, {data: updatedComment});
        expect(commentPut.status()).toBe(200);
    });

    test('Get comments by review ID', async ({request}) => {
        let newComment1 = {
            userId: test_users[0].userId,
            reviewId: reviewIds[4],
            text: 'Incredible'
        };
        let newComment2 = {
            userId: test_users[0].userId,
            reviewId: reviewIds[4],
            text: 'W - O - W'
        };
        let commentResponse1 = await request.post(comments_url, {data: newComment1});
        expect(commentResponse1.status()).toBe(201);
        let commentResponse2 = await request.post(comments_url, {data: newComment2});
        expect(commentResponse2.status()).toBe(201);

        // Get comments by review ID
        let commentsGet = await request.get(comments_url + "/review/" + reviewIds[4]);
        expect(commentsGet.status()).toBe(200);
        let comments = await commentsGet.json();
        //Check that each response is correct
        expect(comments[0].text).toEqual(newComment1.text);
        expect(comments[1].text).toEqual(newComment2.text);
    });

    test('Get comments by user ID', async ({request}) => {
        let newComment1 = {
            userId: test_users[0].userId,
            reviewId: reviewIds[2],
            text: 'Incredible'
        };
        let newComment2 = {
            userId: test_users[0].userId,
            reviewId: reviewIds[2],
            text: 'W - O - W'
        };
        let commentResponse1 = await request.post(comments_url, {data: newComment1});
        expect(commentResponse1.status()).toBe(201);
        let commentResponse2 = await request.post(comments_url, {data: newComment2});
        expect(commentResponse2.status()).toBe(201);

        // Get comments by user ID
        let commentsGet = await request.get(comments_url + "/user/" + test_users[0].userId);
        expect(commentsGet.status()).toBe(200);
        let comments = await commentsGet.json();
        //Check that each response is correct
        expect(comments[0].text).toEqual(newComment1.text);
        expect(comments[1].text).toEqual(newComment2.text);
    });
});