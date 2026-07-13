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


        // payload : simply the information or data you store in the token like userId, username etc

        // signing : whats jwt.sign() ? basically it takes the payload ( e.g. userId = 13) and 
        // converts it into a jwt format  three parts header.payload.signature
        // it converts that into a jwt format, header will have smth like : type:jwt, algorithm: hs249
        // payload will have your data, 
        // signature = hash(header+payload+secretkey)


        // siging doesnt mean encrypting, it means to generate a fingerprint of the data using a secret 
        // so it looks ugly after that, i mean the fingerprint looks ugly and messy 

        // the hacker cant change the payload simply because the signature and payload are interconnected
        // they are related, a different payload like userId = 12 and userId = 3 will have different
        // signatures 

        // in jwt.verify() if the generated signature related to the payload by the process.env.JWT_SECRET
        // matches the extracted signature from the token that you got from request body, token is genuine
        // these things gets stored in local storage or cookie

        // and btw a jwt is not encrypted so anyone who has the token can genuinely see the payload 
        // and the header, they're just base64url-encoded, not hidden
        // someone can read the data if they have the token but they cant modify it without breaking the signature 
        // but wait, all you send in the authorization header is a token 

        // the signatue is created using a secret which is saved in env which is just a random string
        // that only your bithcass server knows, its not an algo hs239 or smth is an algo
        // whcih is already built into the jwt library
        // if algo is the recipe (which is public) the secret is ingredient in your fridge 
        // that only you and your fatass cat knows about not the entire world so its private
        // algo is public, secret is private to the server

        // a JWT (jsonwebtoken) or simply a token always has three parts, its not random gibberish 
        // header.payload.signature

        //header tells how it was signes : the algo, the type (nothing secret here)

        // payload is just your data, nothing else like userId and username

        // the token has signature so the server can compare it and authorize the user

        // for the comparison, server or jwt.verify() takes the payload and secret key, generates its own
        // signature and compares it with the one that came from the client with the payload in 
        // the token, if both matches its valid

        // Once this clicks, jwt.sign() and jwt.verify() stop feeling like magic functions. They're basically:

        // jwt.sign(payload, secret) → "Take this payload, generate a signature using my secret, and package header + payload + signature into one token."
        // jwt.verify(token, secret, callback func) → "Open the package, recompute the signature using my secret, compare it to the one inside, and if they match, hand me back the payload."


        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{

                if(err){
                    return res.status(401).json({message:"invalid token"});
                }

                req.userId = decoded.id
                next()

                // decoded is the payload that was extracted from jwt, so we can get the
                // userId from the payload and add it to the request object

                // basically when jwt is created, its like this 
                // header.payload.signature
                // header : had algo and type
                // payload has the username, userId etc etc
                // and then you have signature 

                // the jwt is encoded into summ gibberish
                // like : lkdjfakhdlkf.928u39rhfdjkdsf.0293ujfkdsfsdj
                // and sent to the client
                // when client makes a request and sends it back 
                // you decode it in jwt.verify()
                // first verify signature, if verified, decode the payload and give
                // the payload as decoded which is simply the userId, username etc
        })



        

}