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

function authMiddleware ( req , res , next)  {

        // okay so the way this middleware works is that it will check if the request 
        // body has a valid token in the Authorization header.

        // the thing is, after logging in successfully, the user will be given a 
        // and upon making each request to the server, they send a request body or object
        // that contains a lot of things like the data they want to send to the server
        // and also token in the Authorization header, so this middleware will check if the 
        // token is valid and if it is, it will add the userId to the request object

        const token = req.headers['authorization'];

        if(!token) {
            return res.status(401).json({message: "where's your token bruh ?"});
        }

        
}