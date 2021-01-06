const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller con db
const {getLists, getListById, getUserByList, deleteListById, addList, updateList} = require('../controllers/listsController');
const {getTodosByListId} = require('../controllers/todosController');

router.get('/', async (req, res)=>{
    try {
        // req.query:  { q: 'asdad' }
        
        const qSearch = req.query;
        
        console.log("qSearch: ", qSearch);
        const result = await getLists(qSearch);
        
        res.render('index', {
            lists: result, 
            showBackButton: false,
            queryVar : qSearch.q
        });
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

// Modifico la lista listId
router.get('/:listId([0-9]+)/edit', async (req, res)=>{
    try {
        const listId = req.params.listId;
        const listObj = await getListById(listId);
        const result = listObj.dataValues;
        // res.render('list/edit', {list: result});

        res.render('list/edit', {...result});
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

// creo una nuova lista
router.get('/new', async (req, res)=>{
    try {
        
        res.render('list/new', {showBackButton: true});
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


// Cancello la lista
router.delete('/:listId([0-9]+)', async (req, res)=>{
    try {
        const listId = req.params.listId;
        const result = await deleteListById(listId);

        // res.status(result ? 200 : 404).json(result ? result : "List not found!");
        res.redirect('/');
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})


// Modifico nome della lista
router.patch('/:listId([0-9]+)', async (req, res)=>{
    try {
        const listId = req.params.listId;
        const name = req.body.list_name;
        const result = await updateList(listId, name);

        // res.status(result ? 200 : 404).json(result ? result : "List not found!");
        res.redirect('/');
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})


// creo una nuova lista
router.post('/', async (req, res)=>{
    try {
        const name = req.body.list_name;
        const result = await addList(name);

        // res.status(result ? 200 : 404).json(result ? result : "List not found!");
        res.redirect('/');
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

module.exports = router;