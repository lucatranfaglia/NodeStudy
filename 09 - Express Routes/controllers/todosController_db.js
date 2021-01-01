const data = require("../data.json");


// ritorna tutti i todo
function getTodos(){
    return data.todos;
}
// ritorna i todo con filtro
function getTodoById(account_id){
    
    return data.todos.find((todo)=>{
        return todo.id === parseInt(account_id);
    });
}

// rimuove un todo con filtro
function deleteTodoById(account_id){
    const idx = data.todos.findIndex((todo)=>{
        return todo.id === parseInt(account_id);
    });

    if(idx>-1){
        // ritorniamo l'elemento rimosso
        const el = data.todos.slice(idx, 1)
        return el;
    }
    return false;
}

function addTodo({todo, completed, list}){
    const newTodo = {todo, completed, list};

    // inserimento dell'elemento alla fine dell'array e ritorna la nuova lunghezza dell'array
    // data.todos.push({ todo, completed, lisst });

    // inserimento in testa dell'elemento nell'array e ritorna la nuova lunghezza dell'array
    data.todos.unshift(newTodo);
    return newTodo;
}

function updateTodo(id, newTodo){
    const idx = data.todos.findIndex(todo=> todo.id === parseInt(account_id));

    if(idx>-1){
        // aggiorno i dati
        return data.todos[idx]= {...data.todos[idx], ...newTodo};
    }
    return false;
}

module.exports = {
    getTodos,
    getTodoById,
    deleteTodoById,
    addTodo,
    updateTodo
}