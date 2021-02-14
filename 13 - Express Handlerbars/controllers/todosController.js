const Todo = require('../models').Todo;

// colonne che si voglio visualizzare
const attributes = ['id', 'todo', 'listID', 'createdAt', 'completed'];

// ritorna tutti i todo
async function getTodos(){
    // const [result, ] = await pool.query("SELECT * FROM todos");  // return Promise [results, fields]    
    return await Todo.findAll({
        include : ['List'],
        attributes:attributes,
        limit:20
    });
}
// ritorna i todo con filtro
async function getTodoById(account_id){
    if(account_id){
        // const [result, ] = await pool.query("SELECT * FROM todos WHERE id=?",[account_id]);  // return Promise [results, fields]
        // return await Todo.findAll({
        //     attributes: attributes,
        //     where: {
        //         id: account_id
        //     }            
        // });

        return await Todo.findByPk(id, {
            attributes: attributes,
            include : ['List']
        });
    }
    return null
}

// ritorna tutti i todo che hanno la lista_id
async function getTodosByListId(listId, completed = null, userId = null){
    const where = {listId:listId};
    if(completed!==null){
        where.completed = completed;
    }

    if(userId!==null){
        where.userId = userId;
    }
    
    if(listId){
        return await Todo.findAll({
            attributes: attributes,
            include : ['List'],
            limit: 20,
            where: where
        });
        // NON OTTIMIZZATO
        // return await Todo.findAll({
        //     attributes: attributes,
        //     include: ['List'],
        //     where: {
        //         listId:listId
        //     }
        // });
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
        completed===true ? 1 : 0;
        // completed = completed || 0;

        // const [result, ] = await pool.query("INSERT INTO todos (todo, completed, listId) VALUES (?, ?, ?)",[todo, completed, listId]);  // return Promise [results, fields]
        return await List.create({
            todo:todo,
            completed:completed,
            listId: listId
        })
    }
    return null;
}


async function updateTodo(account_id, {todo, listId, completed}){
    if(completed=="true" || completed==true){
        completed=1;
    }
    else{
        completed=0;
    }    
    // const [result, ] = await pool.query("UPDATE todos SET todo=?, listId=?, completed=? WHERE id=?",[todo,listId,completed, account_id]);  // return Promise [results, fields]        
    return await Todo.update(
        {todo, completed, listId},
        {
            where: {
                id: account_id
            }
        }
    )

}

// async function updateTodo(account_id, {todo, listId, completed}){
//     const newTodo = {todo, listId, completed};
//     if(account_id && newTodo){
//         completed = completed || 0;
//         // const [result, ] = await pool.query("UPDATE todos SET todo=?, listId=?, completed=? WHERE id=?",[todo,listId,completed, account_id]);  // return Promise [results, fields]
        
//         return await Todo.update(
//             {
//                 todo:todo,
//                 completed:completed,
//                 listId: listId
//             },
//             {
//                 where: {
//                     id: account_id
//                 }
//             }
//         )
//     }
//     return null;
// }

module.exports = {
    getTodos,
    getTodoById,
    getTodosByListId,
    deleteTodoById,
    addTodo,
    updateTodo
}