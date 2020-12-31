const data = require("../data.json");
let {pool} = require("../db");

// ritorna tutti i list
async function getLists(){
    // return data.lists;
    
    const [result, ] = await pool.query("SELECT * FROM lists");  // return Promise [results, fields]
    return result;
}
// ritorna i list con filtro
async function getListById(account_id){    
    // return data.lists.find((list)=>{
    //     return list.id === parseInt(account_id);
    // });
}

// rimuove un list con filtro
function deleteListById(account_id){
    const idx = data.lists.findIndex((List)=>{
        return List.id === parseInt(account_id);
    });

    if(idx>-1){
        // ritorniamo l'elemento rimosso
        const el = data.lists.slice(idx, 1)
        return el;
    }
    return 0;
}

function addList(name){
    // id è il numero di elementi nelle lissta +1
    const id = data.lists.length+1;
    const list = {name, id:id}
    // inserimento in testa dell'elemento nell'array e ritorna la nuova lunghezza dell'array
    data.lists.unshift(list);
    return newList;
}

function updateList(account_id, name){
    // cerco l'id nel db
    const idx = data.lists.findIndex((List)=>{
        return List.id === parseInt(account_id);
    });

    
    if(idx !== -1) {
        // modifico 
        return data.lists[idx] = { ...data.lists[idx], name};
    }

    return false;
}

module.exports = {
    getLists,
    getListById,
    deleteListById,
    addList,
    updateList
}