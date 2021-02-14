const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller con db
const {getTodos, getTodoById, getTodosByListId, deleteTodoById, addTodo, updateTodo} = require('../controllers/todosController');


router.get('/', async (req, res)=>{
    try {

        let {qSearch, completed} = req.query;    

        if(completed === undefined){
            completed=0;
        }

        const { id } = req.session.user;
        let result = await getTodos();        
        
        res.render('todos', {
            todos: result,
            showBackButton: false,
            // queryVar : qSearch.q,
            user: req.session.user,
            errors: req.flash('errors'),            
            messages: req.flash('messages')
        });
    } 
    catch (error) {
        res.status(500).send(error.toString());
    }
})

router.post('/', async (req, res)=>{
    try {
        
        const {listId} = req.body;
        
        const updated = await addTodo(
            {...req.body}
        );
        
        // flash (key, value)
        req.flash('messages', 'Todo added correctly.' );

        const todoRoute = listId ? '/'+listId+'/todos' : '/todos';
        res.redirect(todoRoute);
    } 
    catch (error) {
        console.log("Error", error);
        // Passo come paramentro il messaggio di errore tramite flash
        req.flash('errors', error.errors ? error.errors.map(el => el.message) : error.toString() );

        // Passo nella res.query.q l'errore
        // res.redirect('/?error='+error.toString());        
        res.redirect('/todos');
    }
})


module.exports = router;