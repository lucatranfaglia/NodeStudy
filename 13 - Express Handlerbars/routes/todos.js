const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller con db
const {getTodos, getTodoById, getTodosByListId, deleteTodoById, addTodo, updateTodo} = require('../controllers/todosController');


router.get('/', async (req, res)=>{
    try {
        const result = await getTodos();        
        res.render('todos', {todos: result});
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})



module.exports = router;