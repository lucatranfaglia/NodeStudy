const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller con db
const { getLists, getListById, getUserByList, getListByUserId, deleteListById, addList, updateList } = require('../controllers/listsController');
const { getTodosByListId } = require('../controllers/todosController');

router.get('/', async(req, res) => {
    try {
        // req.query:  { q: 'asdad', error: 'Error...' }
        const qSearch = req.query;


        const result = await getLists(qSearch);

        res.render('index', {
            lists: result,
            showBackButton: false,
            queryVar: qSearch.q,
            user: req.session.user,
            errors: req.flash('errors'),
            messages: req.flash('messages')
        });
    } catch (error) {
        console.log("Error:", error);
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})

router.get('/:listId([0-9]+)', async(req, res) => {
    try {
        const listId = req.params.listId;
        const result = await getListById(listId);
        res.render('lists', {
            user: req.session.user,
            list: result
        });
    } catch (error) {
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})


router.get('/:listId([0-9]+)/todos', async(req, res) => {
    try {
        const userId = req.session.user;

        const listId = req.params.listId;
        const list_result = await getListById(listId);
        const todos_result = await getTodosByListId(listId);
        const lists = await getListByUserId(userId)
        res.render('todos', {
            user: req.session.user,
            todos: todos_result,
            list: list_result,
            lists,
            userId
        });
    } catch (error) {
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})

// vado alla pagina
router.get('/:listId([0-9]+)/edit', async(req, res) => {
    try {
        const listId = req.params.listId;
        const listObj = await getListById(listId);
        const result = listObj.dataValues;

        // Gestione errori e messaggi
        const errors = req.flash('errors');
        const messages = req.flash('messages');
        // res.render('list/edit', {list: result});

        res.render('list/edit', {
            ...result,
            errors,
            messages,
            user: req.session.user
        });
    } catch (error) {
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/' + req.params.listId + '/edit');
    }
})

// redirect into page newList 
router.get('/new', async(req, res) => {
    try {
        res.render('list/new', {
            user: req.session.user,
            showBackButton: true
        });
    } catch (error) {
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/new');
    }
})


router.get('/:userId([0-9]+)/user', async(req, res) => {
    try {
        const userId = req.params.userId;
        const result = await getUserByList(userId);
        res.render('users', { user: result });
    } catch (error) {
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/' + req.params.userId + '/user');
    }
})


// ----------------------------------------------------------------
// CRUD
// ----------------------------------------------------------------

// Cancello la lista
router.delete('/:listId([0-9]+)', async(req, res) => {
    try {
        const listId = req.params.listId;
        const result = await deleteListById(listId);
        req.flash('messages', 'List delete correctly.');
        // res.status(result ? 200 : 404).json(result ? result : "List not found!");
        res.redirect('/');
    } catch (error) {
        req.flash('errors', error.errors.map(el => el.message));
        res.redirect('/');
    }
})


// Modifico nome della lista
router.patch('/:listId([0-9]+)', async(req, res) => {
    try {
        const listId = req.params.listId;
        const name = req.body.list_name;
        const result = await updateList(listId, name);
        req.flash('messages', 'List patch correctly.');

        res.redirect('/');
    } catch (error) {
        // Passo come paramentro il messaggio di errore tramite flash
        req.flash('errors', error.errors.map(el => el.message));
        // res.redirect('/');
        res.redirect('/');

    }
})


// creo una nuova lista
router.post('/', async(req, res) => {
    try {
        const name = req.body.list_name;
        const result = await addList(name);

        // flash (key, value)
        req.flash('messages', 'List added correctly.');

        res.redirect('/');
    } catch (error) {
        // Passo come paramentro il messaggio di errore tramite flash
        req.flash('errors', error.errors.map(el => el.message));

        // Passo nella res.query.q l'errore
        // res.redirect('/?error='+error.toString());        
        res.redirect('/');
    }
})

module.exports = router;