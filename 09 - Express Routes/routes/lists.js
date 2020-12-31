const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller
const {getLists, getListById, deleteListById, addList, updateList} = require('../controllers/ListsController');

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
router.get('/:id([0-9]+)', logger, (req, res)=>{
    const id = req.params.id;
    res.json(getListById(id))
})

// Cancello un id
router.delete('/:id([0-9]+)', logger, (req, res) =>{
    const result = deleteListById(id);
    res.status( result ? 200 : 404).json( result ? result : null)
})

// Creo una nuova risorsa
router.post('/', (req, res)=>{    
    // passo tutti i parametri alla funzione
    res.json(addList(req.body));
})

// Creo una nuova risorsa
router.patch('/:id([0-9]+)', (req, res)=>{    
    // passo l'ID del profilo da modificare, e tutti i parametri nel body
    const updList = updateList(req.params.id, req.body);
    res.status(upate ? 200 : 404).json(updList ? updList : 'Record not found');
})

module.exports = router;