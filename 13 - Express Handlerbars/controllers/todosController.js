const Todo = require('../models').Todo;

// colonne che si voglio visualizzare
const attributes = ['id', 'todo', 'listID', 'completed'];

// ritorna tutti i todo
async function getTodos(){
    // const [result, ] = await pool.query("SELECT * FROM todos");  // return Promise [results, fields]    
    return await Todo.findAll({
        attributes:attributes
    });
}
// ritorna i todo con filtro
async function getTodoById(account_id){
    if(account_id){
        // const [result, ] = await pool.query("SELECT * FROM todos WHERE id=?",[account_id]);  // return Promise [results, fields]
        return await Todo.findAll({
            attributes: attributes,
            where: {
                id: account_id
            }
            
        });
    }
    return null
}

// ritorna tutti i todo che hanno la lista_id
async function getTodosByListId(listId){
    if(listId){
        return await Todo.findAll({
            attributes: attributes,
            include: ['List'],
            where: {
                listId:listId
            }
        });
        // const [result, ] = await pool.query("SELECT * FROM todos WHERE listId=?",[listId]);  // return Promise [results, fields]        
    }
    return null;
}

// rimuove un todo con filtro
async function deleteTodoById(account_id){
    if(account_id){
        // const [result, ] = await pool.query("DELETE FROM todos WHERE id=?",[account_id]);  // return Promise [results, fields]
        return await Todo.destroy({
            attributes:attributes,
            where: { 
                id: account_id
            }
        })        
    }
    return null;
}

async function addTodo({todo, completed, listId}){
    const newTodo = {todo, completed, listId};
    if(newTodo){
        completed = completed || 0;

        // const [result, ] = await pool.query("INSERT INTO todos (todo, completed, listId) VALUES (?, ?, ?)",[todo, completed, listId]);  // return Promise [results, fields]
        return await List.create({
            todo:todo,
            completed:completed,
            listId: listId
        })
    }
    return null;
}

async function updateTodo(account_id, {todo, completed, listId}){
    const newTodo = {todo, completed, listId};
    if(account_id && newTodo){
        completed = completed || 0;
        // const [result, ] = await pool.query("UPDATE todos SET todo=?, listId=?, completed=? WHERE id=?",[todo,listId,completed, account_id]);  // return Promise [results, fields]
        
        return await Todo.update(
            {
                todo:todo,
                completed:completed,
                listId: listId
            },
            {
                where: {
                    id: account_id
                }
            }
        )
    }
    return null;
}

module.exports = {
    getTodos,
    getTodoById,
    getTodosByListId,
    deleteTodoById,
    addTodo,
    updateTodo
}