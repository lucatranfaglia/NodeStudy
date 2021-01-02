let {pool} = require("../db");

// ritorna tutti i list
async function getLists(){
    const [result, ] = await pool.query("SELECT * FROM lists");  // return Promise [results, fields]
    return result;
}
// ritorna i list con filtro
async function getListById(account_id){    
    if(account_id){
        const [result, ] = await pool.query("SELECT * FROM lists WHERE id=?",[account_id]);  // return Promise [results, fields]

        // return singola lista == result[0]
        return result[0];
    }
    return [];
}

// rimuove un list con filtro
async function deleteListById(account_id){
    if(account_id){
        const [result, ] = await pool.query("DELETE FROM lists WHERE id=?",[account_id]);  // return Promise [results, fields]
        return result;    
    }
    return [];
}

async function addList(name){
    if(name){
        const user_id=1;
        const query = "INSERT INTO lists (name, user_id) VALUES (?, ?)";
        const [result, ] = await pool.query(query,[name, user_id]);  // return Promise [results, fields]
        
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
        const list = await getListById(result.insertId)
        return list;
    }
    return [];
}

async function updateList(account_id, name){
    if(account_id && name){

        const [result, ] = await pool.query("UPDATE lists SET name=? WHERE id=?",[name, account_id]);  // return Promise [results, fields]
        
        const list = await getListById(account_id);        
        return list;
    }
    return [];
}

module.exports = {
    getLists,
    getListById,
    deleteListById,
    addList,
    updateList
}