// middleware to authenticate the user and add the userId to the request object
// the users upon successful login will be given a token which they will use to 
// authenticate themselves in the future requests, and this middleware will check if the
// token is valid and if it is, it will add the userId to the request object
// the token will be sent in the request headers as 'Authorization: Bearer <token>'

// the token will be a JWT which will be signed with a secret key and will contain 
// the userId in the payload, so when the user makes a request with the token, we can 
// verify the token and get the userId from the payload and add it to the request object

// middleware acts as a gatekeeper or a security layer that checks if the user is authenticated
// whenever they make a network request to the server.
 

import jwt from 'jsonwebtoken'; 

// this will be used to verify the token sent by the user, that's why we are importing jwt here,
// and we will use the secret key to verify the token, and we will get the secret key from the environment variables or from a config file.

function authMiddleware ( req , res , next)  {

        // okay so the way this middleware works is that it will check if the request 
        // body has a valid token in the Authorization header.

        // the thing is, after logging in successfully, the user will be given a 
        // and upon making each request to the server, they send a request body or object
        // that contains a lot of things like the data they want to send to the server
        // and also token in the Authorization header, so this middleware will check if the 
        // token is valid and if it is, it will add the userId to the request object

        const token = req.headers['authorization'];

        // the req.headers is an object that contains all the headers 
        // sent by the client in the request, and the 'authorization' header is where the
        // token is sent by the client, so we are checking if the 'authorization' header
        // is present in the request headers, and if it is not present, we will return a 401
        // status code with a message saying "where's your token my nigga ?"

        if(!token) {
            return res.status(401).json({message: "where's your token bruh ?"});
        }
        
        // okay so if you get past the above if statement, that means the user has
        // sent a token in the request headers, so now we will verify the token and get 
        // the userId from the payload and add it to the request object

        // billo we will use three parameters or arguements 
        // 1. the token to verify
        // 2. the secret key to sign the token
        // 3. a callback function to handle the verification result

        

        jwt.verify(token, process.env.JWT_SECRET, ()=>{

        })



        

}