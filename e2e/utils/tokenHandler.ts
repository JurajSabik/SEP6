import dotenv from 'dotenv';
dotenv.config();

//function that returns headers with csrf token
export async function getHeaders(request) {
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;
    // const token_url = process.env.API_URL+"/csrf-token-old";

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
    //get header name from response
    // let headerName = body_obj['headerName'];

    return {
        'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
        // ,[headerName]: token
    }
}