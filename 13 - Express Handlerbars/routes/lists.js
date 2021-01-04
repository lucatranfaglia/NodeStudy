const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller con db
const {getLists, getListById, getUserByList, deleteListById, addList, updateList} = require('../controllers/listsController');
const {getTodosByListId} = require('../controllers/todosController');

router.get('/', async (req, res)=>{
    try {
        const result = await getLists();
        
        res.render('index', {lists: result});
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

router.get('/:listId([0-9]+)', async (req, res)=>{
    try {
        const listId = req.params.listId;
        const result = await getListById(listId);
        res.render('lists', {list: result});
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})


router.get('/:listId([0-9]+)/todos', async (req, res)=>{
    try {
        const listId = req.params.listId;
        const list_result = await getListById(listId);
        const todos_result = await getTodosByListId(listId);
        res.render('todos', {todos: todos_result, list: list_result });
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

router.get('/:userId([0-9]+)/user', async (req, res)=>{
    try {
        const userId = req.params.userId;
        const result = await getUserByList(userId);
        res.render('users', {user: result});
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

module.exports = router;