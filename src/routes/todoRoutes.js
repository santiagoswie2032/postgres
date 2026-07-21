import express from 'express';
import db from '../db.js';
import prisma from '../PrismaClient.js';

const router = express.Router();


router.get('/', async (req,res)=>{
    // this route will be used to get all the todos for a user, it will
    // receive the user id from the request query, and then query the database
    // to get all the todos for that user and send them back in the response.

            // const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?');

    // here we are preparing a SQL statement to select all todos from the todos table where the user_id
    // matches the user id provided in the request query.

    // below lines are being written to resolve an error and find the culprit

    console.log(req.userId)
    console.log(typeof req.userId)

             // const todos = getTodos.all(req.userId);

    //getTodos.all() method is used to execute the prepared statement and retrieve all the todos
    // for the user from the database then that req.userId is used for the user_id in the SQL
    // statement to get the todos for that specific user. 

    // the request instance here is slightly different from the one in the authRoutes.js file
    // because here we are using a middleware that will add the userId to the request object after
    // the user has been authenticated, so we can use that userId to get the todos for that user.

    const todos = await prisma.todo.findMany({
        where:{
            userId: req.userId
        }
    })

    res.json(todos);

});

router.post('/', async (req,res)=>{ 
    // this route will be used to create a new todo for a user, it will
    // receive the user id and the todo text from the request body,
    // and then insert a new todo into the database for that user and send
    // the created todo back in the response.

    const {task} = req.body;                        // variable name is task here.

    // req.body: When a user submits a form or sends data, it arrives inside req.body.

    // const {task} = ...: This is a JavaScript shortcut called destructuring. 
    // It reaches inside the req.body object, finds a piece of data named task 
    // (the text of the to-do item), pulls it out, and saves it into a brand-new variable also named task

    // const insertTodos = db.prepare('INSERT INTO todos (user_id , task) VALUES (? , ?)');
    // const result =  insertTodos.run(req.userId, task);

    const result = await prisma.todo.findMany({
        
        data:{
            //task: task,
            task,
            userId: req.userId          // key name 'task' and variable name is also 'task' in table todo in schema.prisma so you can just use shorthand task
        }                               // but userId is key in the todo table in schema.prisma file but variable name is req.userId , both are not the same hence you cant use shorthand

    })

    //  res.json({id: result.lastInsertRowId , task , completed: 0});

    res.json(result);
    
        }

        // This entire block of code—from (req, res) all the way down to the closing } 
        // on line 60—is one single function that has no name (an anonymous function). 
        // It is being treated just like a piece of data and handed directly into router.post().

        // router.post() is also a function which is being passed two arguments, a string '/' for path
        // and a no name function:  (req,res) => {} 

    )

router.put('/:id', (req,res)=>{
    // this route will be used to update a todo for a user, it will
    // receive the todo id from the request params, and the updated todo 
    // text and completed status from the request body, and then update
    // the todo in the database and send the reqeusted todo back in the responese.

    // while modifying the todo, you gotta modify them by the id so that you dont 
    // mess with other people's todos, and also you have to make sure that the user
    // is the owner of the todo and you do that by checking their id when they make a put (modification) request

    const {completed} = req.body;
    const {id} = req.params;

    const updateTodos = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
    updateTodos.run(completed,id);

    res.json({message: "todo completed, sir."});
    
})

router.delete('/:id', (req,res)=>{
    // this route will be used to delete a todo for a user, it will
    // receive the todo id from the request params, and then delete the
    // todo from the database and send a success message back in the response.

    const {id} = req.params;
    const userId = req.userId;

    const deleteTodos = db.prepare('DELETE FROM todos WHERE id = ? AND user_id = ?');

    deleteTodos.run(id,userId);

    res.json({message:"todo has be deleted, sir."});

})

export default router;