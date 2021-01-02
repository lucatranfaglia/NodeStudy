let {pool} = require("../db");

// ritorna tutti i todo
async function getTodos(){
    const [result, ] = await pool.query("SELECT * FROM todos");  // return Promise [results, fields]
    console.log("RESULT: ", result)
    return result;
}
// ritorna i todo con filtro
async function getTodoById(account_id){
    if(account_id){
        const [result, ] = await pool.query("SELECT * FROM todos WHERE id=?",[account_id]);  // return Promise [results, fields]

        // return singola lista == result[0]
        return result[0];
    }
    return [];
}

// rimuove un todo con filtro
async function deleteTodoById(account_id){
    if(account_id){
        const [result, ] = await pool.query("DELETE FROM todos WHERE id=?",[account_id]);  // return Promise [results, fields]
        // numero di righe cancellate
        return result.affectedRows;    
    }
    return [];
}

async function addTodo({todo, completed, list_id}){
    const newTodo = {todo, completed, list_id};
    if(newTodo){
        completed = completed || 0;
        const query = "INSERT INTO todos (todo, completed, list_id) VALUES (?, ?, ?)";
        const [result, ] = await pool.query(query,[todo, completed, list_id]);  // return Promise [results, fields]
        
        // return 
        // result => {
        //     "fieldCount": 0,
        //     "affectedRows": 1,
        //     "insertId": 6,
        //     "info": "",
        //     "serverStatus": 2,
        //     "warningStatus": 0
        // }

        

        // return la lista appena inserita
        const post = await getTodoById(result.insertId)
        return post;
    }
    return [];
}

async function updateTodo(account_id, {todo, completed, list_id}){
    const newTodo = {todo, completed, list_id};
    if(account_id && newTodo){
        completed = completed || 0;
        const [result, ] = await pool.query("UPDATE todos SET todo=?, list_id=?, completed=? WHERE id=?",[todo,list_id,completed, account_id]);  // return Promise [results, fields]
        
        console.log("update result: ", result);

        const todos = await getTodoById(account_id);        
        return todos;
    }
    return [];
}

module.exports = {
    getTodos,
    getTodoById,
    deleteTodoById,
    addTodo,
    updateTodo
}