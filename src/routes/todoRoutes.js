import express from 'express';
import db from '../db.js';

const router = express.Router();


router.get('/', (req,res)=>{
    // this route will be used to get all the todos for a user, it will
    // receive the user id from the request query, and then query the database
    // to get all the todos for that user and send them back in the response.

    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');

    // here we are preparing a SQL statement to select all todos from the todos table where the user_id
    // matches the user id provided in the request query.

    const todos = getTodos.all(req.userId);

    //getTodos.all() method is used to execute the prepared statement and retrieve all the todos
    // for the user from the database then that req.userId is used for the user_id in the SQL
    // statement to get the todos for that specific user. 

    // the request instance here is slightly different from the one in the authRoutes.js file
    // because here we are using a middleware that will add the userId to the request object after
    // the user has been authenticated, so we can use that userId to get the todos for that user.

    res.json(todos);

});

router.post('/', (req,res)=>{ 
    // this route will be used to create a new todo for a user, it will
    // receive the user id and the todo text from the request body,
    // and then insert a new todo into the database for that user and send
    // the created todo back in the response.
})

router.put('/:id', (req,res)=>{
    // this route will be used to update a todo for a user, it will
    // receive the todo id from the request params, and the updated todo 
    // text and completed status from the request body, and then update
    // the todo in the database and send the reqeusted todo back in the responese.

    // while modifying the todo, you gotta modify them by the id so that you dont 
    // mess with other people's todos, and also you have to make sure that the user
    // is the owner of the todo and you do that by checking their id when they make a put (modification) request

})

router.delete('/:id', (req,res)=>{
    // this route will be used to delete a todo for a user, it will
    // receive the todo id from the request params, and then delete the
    // todo from the database and send a success message back in the response.


})

export default router;