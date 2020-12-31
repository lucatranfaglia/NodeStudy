const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller
const {getTodos, getTodoById, deleteTodoById, addTodo, updateTodo} = require('../controllers/todosController');

// MIDDLEWARE
const logger = (req, res, next) => {
    console.log('calling server with params', req.params);
    next();
}

router.get('/', (req, res)=>{
    const result = getTodos();
    res.json(result ? 200 : 404).json(result ? result : null);
})

// parametro 'id' , middleware (logger), middleware
router.get('/:id([0-9]+)', logger, (req, res)=>{
    const id = req.params.id;

    const result = getTodoById(id);
    res.json(result ? 200 : 404).json( result ? result : null);
})

// Cancello un id
router.delete('/:id([0-9]+)', logger, (req, res) =>{
    const deleted = req.params.id;
    res.status( deleted ? 200 : 404).json( deleted ? deleteTodoById(id): null)
})

// Creo una nuova risorsa
router.post('/', (req, res)=>{    
    // passo tutti i parametri alla funzione
    const result = addTodo(req.body);
    res.status(result ? 200 : 404).json( result ? result : null);
})

// Creo una nuova risorsa
router.patch('/:id([0-9]+)', (req, res)=>{    
    // passo l'ID del profilo da modificare, e tutti i parametri nel body
    const updTodo = updateTodo(req.params.id, req.body);
    res.status(upate ? 200 : 404).json(updTodo ? updTodo : 'Record not found');
})

// array di middleware
// router.get('/:id([0-9]+)', [logger, (req, res)=>{
//     const id = req.params.id;
//     res.send('todos with id'+ id);
// }])

module.exports = router;