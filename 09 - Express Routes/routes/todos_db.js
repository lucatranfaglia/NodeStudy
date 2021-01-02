const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller
const {getTodos, getTodoById, getTodosByListId, deleteTodoById, addTodo, updateTodo} = require('../controllers/todosController_db');

// MIDDLEWARE
const logger = async (req, res, next) => {
    console.log('calling server with params', req.params);
    next();
}

router.get('/', async (req, res)=>{
    try {
        const result = await getTodos();
        console.log(result);
        // TODO: error res.status
        // res.status(200).json(result ? result : null);    
        res.status(result ? 200 : 404).json( result ? result : null);
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// parametro 'id' , middleware (logger), middleware
router.get('/:id([0-9]+)', logger, async (req, res)=>{
    try{
        const id = req.params.id;
        const result = await getTodoById(id);
        res.status(result ? 200 : 404).json( result ? result : null);
        // TODO: error res.status
        // res.json(200).json( result ? result : null);
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// Ottengo i todo tramite una lista (list_id) - parametro 'list_id' , middleware (logger), middleware
router.get('/list_id/:list_id([0-9]+)', logger, async (req, res)=>{
    try {
        const list_id = req.params.list_id;
        const result = await getTodosByListId(list_id);
        res.status(result ? 200 : 404).json(result ? result : "List not found!");
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// Cancello un id
router.delete('/:id([0-9]+)', logger, async (req, res) =>{
    try{
        const id = req.params.id;
        const deleted = await deleteTodoById(id)
        res.status( deleted ? 200 : 404).json( deleted ? deleted: null)
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// Creo una nuova risorsa
router.post('/', async (req, res)=>{    
    try {
        console.log("post result: ", req.body);

        // passo tutti i parametri alla funzione
        const result = await addTodo(req.body);
        res.status(result ? 200 : 404).json( result ? result : null);
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// Creo una nuova risorsa
router.patch('/:id([0-9]+)', async (req, res)=>{    
    try{
        // passo l'ID del profilo da modificare, e tutti i parametri nel body
        const updTodo = await updateTodo(req.params.id, req.body);
        res.status(updTodo ? 200 : 404).json(updTodo ? updTodo : 'Record not found');
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

module.exports = router;