import express from "express";  // this is the file where we will be handling all the authentication related routes like login and register
import bcrypt from "bcryptjs";    // this is the library which we will be using for hashing the password before storing it in the database, it provides a simple way to hash and compare passwords securely.
import jwt from "jsonwebtoken"; // this is the library which we will be using for generating and verifying JSON Web Tokens (JWTs), which are used for authentication and authorization in our application.
import db from "../db.js"; // this is the file where we have defined our database connection and exported it, we will be using this to interact with our database.


//when we are sub-dividing our routes into different files we have to use express.Router() to create a new router object, which we can then use to define our routes and export it to be used in our main server file.
const router = express.Router();

router.post('/register', (req,res)=>{
    // this is the route for registering a new user, it will receive
    // the username and password from the request body, hash the password
    // and store the user in the database, we will also generate a JWT token
    // and send it back to the client for authentication purposes.

    const{username, password} = req.body; // we extract the username and password from the request body, which is sent by the user when
    // they are trying to register a new account, we will use these values to create a new user in the database and also to generate a JWT
    // token for the user to authenticate themselves in future requests.

    const hashedPassword = bcrypt.hashSync(password, 7); 

    //const hashedPassword2 = bcrypt.hashSync(password, 8);
    
    //we use the bcrypt library to hash the password before storing it in 
    // the database, this is a security measure to protect the user's
    // password in case the database is compromised, the hashSync function
    // takes the password and a salt rounds value (in this case 8) and returns
    // the hashed password, the salt rounds value determines how many
    // times the hashing algorithm will be applied, a higher value means more
    // security but also more time to hash the password.

   

    console.log(username,password);

    console.log(hashedPassword);
    console.log(hashedPassword2);

    try{
        const insertUser = db.prepare('INSERT INTO users (username, password) VALUES (?,?)');

        // now the prepare('') works kinda similar to exec(''), however the prepare method allows us to inject some 
        // values in the sql query.

        // also, after INSERT and INTO, "users" is for the name of the table in the database 
        // then you basically select the columns which in this case are column "username" & "password"
        // so after selecting the table then the columns in that table, you provide VALUES
        // currently its (?,?) which is just placeholders or null values

        const result = insertUser.run(username, hashedPassword);

        // the run method here is used to execute prepare statement with the values we have injected
        // in this case we are inserting username and hashed password into the users table in the database

        // now that my app has a user, im going to create a default todo for them to kinda show
        // how the app works.

        const defaultTodo = 'heyyy :D Add your first todo!';
        const insertTodo = db.prepare('INSERT INTO todos (user_id, task) VALUES (?, ?)');

        insertTodo.run(result.lastInsertRowid, defaultTodo);

        // okay so here basically if you look at prepare, you see user_id and task right 
        // for user_id - > current id = latest or most previous entry in the users table row's id
        // thats why to get user_id, you just run result.lastInsertRowID
        

        // create token

        const token = jwt.sign({id: result.lastInsertedRowid}, process.env.JWT_SECRET, {expiresIn: '24h'});
        

        //tokens are created to authenticate users in our app, when a user logs in or registers
        // we create a token for them which contains their user id and is signed with a secret key
        // the token also has an expiration time, after which it will no longer be valid
        // after it expires, the user will have to log in again to get a new token
        //this is a security measure to prevent unauthorized access to the user's account
        
        res.json({ token });

        // after the creation of the token, we send it back to the client in the response
        // so the client can store it and use it for authenticating future requests to the server
        // the client can store the token in local storage or in a cookie, and then include
        // it in the authorization header of future requests to access protected routes in the
        // server, this way the server can verify the token and allow access to the user if the token is valid.

    }
    catch(err){
        console.log(err.message);
        res.sendStatus(504);
    }

    // obviously only one out of try and catch runs at a time, if try has been executed successfully then 
    // catch will be skipped, if try dosent run as intended, catch will log the error message and send a 504
    // status code to the user implying that something has gone wrong with the server.


    

    // saves the new user's username and their irreversible encrypted passwoerd 
    //in the database, and then generates a JWT token for the user to authenticate.
}

);

router.post('/login', (req,res)=>{
    // this is the route for logging in a user, it will receive the
    // username and password from the request body, check if the user exists
    // in the database, compare the hashed password with the one stored in the database
    // and if it matches, generate a JWT token and send it back to the client for authentication purposes.
    

    //when a user tries to log in, we try to check if they have entered the 
    // correct password and username from the database
    // the problem is because when they were registering, the passwords got
    //encrypted and when we need to check, we get back the encrypted password
    // so we encrypt it again using the same algorithm and compare the keys
    // generated in both cases, if they match then the user is authenticated.

    const {username,password} = req.body;

    // destructuring the username and password from the request body
    // which is sent by the user when they are trying to log in

    try {
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        // okay so here we are trying to get the user from the database using the username
        // provided by the user in the request body 
        // in this case we are using the prepare method to create a prepared statement that selects
        // all columns from the users table where the username matches the one provided in the request body


        const user = getUser.get(username);

        // the get method here is used to execute the prepared statement and retrieve the user from
        // the database, if the user exists, it will return an object containing the user's information

        // and if the user does not exist : 

        if(!user) {return res.status(404).send({message: "User does not exist "})};

        const IsPasswordValid = bcrypt.compareSync(password, user.password);

        // here we basically compare the password entered by the user in the req body
        // who's trying to log in with the hashed password for that user 
        // stored in the database that was made when the user registered,
        // the compareSync method here takes two arguements : plain text password 
        // and the hashed password from the database and returns a boolean 
        // value indicating whether the passwords match or not

        // btw both the passwords here are the same gibberish
        // so you are basically comparing the same two gibberish with each other
        // because both gibberish were made from same algorithm and same salt rounds value
        // so that gibberish is unique to that plain text password. 

        
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }





    }
)

export default router;