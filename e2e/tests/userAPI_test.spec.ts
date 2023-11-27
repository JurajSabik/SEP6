import {test, expect} from "@playwright/test";
import dotenv from "dotenv";

// Read from default ".env" file.
dotenv.config();

//variables
// const username = "sep6";
const username = process.env.API_USERNAME;
// const password = "12345";
const password = process.env.API_PASSWORD;
// const url = "http://localhost:8080/api/users";
const api_url = process.env.API_URL;
const users_url = api_url+"/users";
// const token_url = api_url+"/csrf-token-old";

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

//function that returns headers with csrf token
async function getHeaders(request) {
    // //get token using basic auth
    // const token_response = await request.get(token_url, {
    //     headers: {
    //         'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
    //     }
    // });
    // if(token_response.status() != 200){
    //     console.log("Error getting csrf token");
    //     return;
    // }
    // let body_str = (await token_response.body()).toString()
    // let body_obj = JSON.parse(body_str)
    // //get token from response
    // let token = body_obj['token'];
    // //get header name from response
    // let headerName = body_obj['headerName'];

    return {
        'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
        // ,[headerName]: token
    }
}

test.describe('User API tests', () => {

    //before all tests, create a new user
    test.beforeAll(async ({request}) => {
        //create test users
        for(let i=0; i<test_users.length; i++){
            let response = await request.post(users_url, {data: test_users[i], headers: await getHeaders(request)});
            expect(response.status()).toBe(201);
        }
    });

    //after all tests, delete the user
    test.afterAll(async ({request}) => {
        //delete test users
        for (let i = 0; i < test_users.length; i++) {
            let response = await request.delete(users_url + "/" + test_users[i].userId, {headers: await getHeaders(request)});
        }
    });

    //write test get user by id that returns 200 status code and user with defined id
    test('get user by id', async ({ request }) => {
        let test_user = test_users[0];
        const response = await request.get(users_url+"/"+test_user.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        const user = await response.json();
        expect(user.userId).toBe(test_user.userId);
        expect(user.username).toBe(test_user.username);
    });

    //write test to create new user
    test('create new user', async ({ request }) => {
        const new_user = {
            userId: 'b954a416-80bc-11ee-b962-0242ac120099',
            username: 'newUser',
            email: 'new.user@gmail.com',
            birthday: '2002-12-28',
            role: "STANDARD_USER",
        }
        const response = await request.post(users_url, {data: new_user, headers: await getHeaders(request)});
        expect(response.status()).toBe(201);
        response.json().then((user) => {
            expect(user.userId).toBe(new_user.userId);
            expect(user.username).toBe(new_user.username);
            expect(user.email).toBe(new_user.email);
        });

        //delete user
        const response2 = await request.delete(users_url+"/"+new_user.userId, {headers: await getHeaders(request)});
        expect(response2.status()).toBe(200);
    });

    //write test to update user
    test('update user', async ({ request }) => {
        let test_user = test_users[0];
        test_user.username = "updatedUserName";

        //update user
        const response3 = await request.put(users_url, {data: test_user, headers: await getHeaders(request)});
        expect(response3.status()).toBe(200);

        //get updated user
        const response4 = await request.get(users_url+"/"+test_user.userId, {headers: await getHeaders(request)});
        expect(response4.status()).toBe(200);
        const user = await response4.json();
        expect(user.userId).toBe(test_user.userId);
        expect(user.username).toBe(test_user.username);
    });

    //follow & unfollow user
    test('follow user', async ({ request }) => {
        let test_user = test_users[0];
        let test_user2 = test_users[1];

        //test_user follows test_user2
        let response = await request.put(users_url+"/follow/"+test_user.userId+"/"+test_user2.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //check if test_user is in the followers list of test_user2
        response = await request.get(users_url+"/followers/"+test_user2.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        let followers = await response.json();
        expect(followers.length).toBe(1);
        expect(followers[0].userId).toBe(test_user.userId);

        //check if test_user2 is in the following list of test_user
        response = await request.get(users_url+"/following/"+test_user.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        let following = await response.json();
        expect(following.length).toBe(1);
        expect(following[0].userId).toBe(test_user2.userId);

        //---------------------------------------------

        //test_user unfollows test_user2
        response = await request.put(users_url+"/unfollow/"+test_user.userId+"/"+test_user2.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);

        //check if test_user is not in the followers list of test_user2
        response = await request.get(users_url+"/followers/"+test_user2.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        followers = await response.json();
        expect(followers.length).toBe(0);

        //check if test_user2 is not in the following list of test_user
        response = await request.get(users_url+"/following/"+test_user.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        following = await response.json();
        expect(following.length).toBe(0);
    });

    //delete user
    test('delete user', async ({ request }) => {
        let test_user = test_users[0];

        //delete user ->200
        let response = await request.delete(users_url+"/"+test_user.userId, {headers: await getHeaders(request)});
        expect(response.status()).toBe(200);
        //try to get deleted user ->404
        const response2 = await request.get(users_url+"/"+test_user.userId, {headers: await getHeaders(request)});
        expect(response2.status()).toBe(404);
    });
});