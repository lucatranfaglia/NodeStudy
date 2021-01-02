const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller con db
const {getLists, getListById, deleteListById, addList, updateList} = require('../controllers/listsController');

// MIDDLEWARE
const logger = (req, res, next) => {
    console.log('calling server with params', req.params);
    next();
}

router.get('/', async (req, res)=>{
    try {
        const result = await getLists();
        res.status(result ? 200 : 404).json(result ? result : "Empty lists!");
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// parametro 'id' , middleware (logger), middleware
router.get('/:id([0-9]+)', logger, async (req, res)=>{
    try {
        const id = req.params.id;
        const result = await getListById(id);
        res.status(result ? 200 : 404).json(result ? result : "List not found!");
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// Cancello un id
router.delete('/:id([0-9]+)', logger, async (req, res) =>{
    try {
        const id = req.params.id;
        const result = await deleteListById(id);
        res.status(result ? 200 : 404).json(result ? result : "Account not delete!");
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// Creo una nuova risorsa
router.post('/', async (req, res)=>{    
    try {
        // passo tutti i parametri alla funzione - NAME
        const data = req.body;
        console.log("data: ",data);
        const result = await addList(data.name);
        res.status(result ? 200 : 404).json(result ? result : "Account not delete!");
    }
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// Creo una nuova risorsa
router.patch('/:id([0-9]+)', async (req, res)=>{  
    try {
        // passo l'ID del profilo da modificare, e tutti i parametri nel body
        const id= req.params.id;
        const data = req.body;

        const updList = await updateList(id, data.name);
        res.status(updList ? 200 : 404).json(updList ? updList : 'Record not found');
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }  
    
})

module.exports = router;