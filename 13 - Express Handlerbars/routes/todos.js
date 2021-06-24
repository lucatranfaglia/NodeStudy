const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller con db
const { getTodos, getTodoById, getTodosByListId, deleteTodoById, addTodo, updateTodo } = require('../controllers/todosController');

const { getListByUserId } = require('../controllers/listsController');


router.get('/', async(req, res) => {

    try {
        let { q, completed } = req.query;
        if (completed === undefined) {
            completed = 0;
        }
        const { id } = req.session.user;

        const lists = await getListByUserId(id);
        const result = await getTodos({ q, userId: id, completed });
        res.render('todos', {
            todos: result,
            showBackButton: false,
            user: req.session.user,
            lists,
            errors: req.flash('errors'),
            messages: req.flash('messages')
        });
    } catch (e) {
        res.status(500).send(e.toString());
    }

});
router.post('/', async(req, resp) => {
    try {
        let { listId, completed } = req.body;
        listId = listId ? listId : null;

        const updated = await addTodo({...req.body, listId });
        req.flash('messages', 'Todo added!');
        const todoRoute = listId ? '/' + listId + '/todos' : '/todos';
        resp.redirect(todoRoute);
        // resp.status(deleted ? 200 : 404).json(deleted ? deleted : null);
    } catch (e) {
        console.log(e)
        const errors = e.errors ? e.errors.map(ele => ele.message) : [e.toString()]
        req.flash('errors', errors);
        resp.redirect('/todos');
        // resp.status(500).send(e.toString());
    }
});


module.exports = router;