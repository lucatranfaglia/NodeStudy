const List = require('../models').List;
// colonne che si voglio visualizzare
const attributes = ['id', 'name', 'userId'];


// ritorna tutte le liste con i relativi utenti
async function getLists(){

    return await List.findAll({
        attributes: attributes,
        include: ['User']
        // limit: 20,
        // offset: 10      // partendo dalla 10° posizione
    });
}

// ritorna la lista con un determinato ID
async function getListById(listId){    
    if(listId){

        // Find by Primary Key
        return await List.findByPk(listId, 
            {
                attributes: attributes
            }
        );


        return await List.findAll({
            attributes: attributes,
            where: {
                id: listId
            }
        });
    }
    return null;
}

// ritorna una lista e le relative info dell'utente (tramite listId)
async function getUserByList(listId){    
    if(listId){

        // Find by Primary Key
        return await List.findByPk(listId, 
            {
                attributes: attributes,
                include: ['User']
            });


        // return await List.findAll({
        //     attributes: attributes,
        //     include: ['User'],
        //     where: {
        //         id:listId
        //     }
        // });
    }
    return null;
}

// rimuove un list con filtro
async function deleteListById(listId){
    if(listId){
        // const [result, ] = await pool.query("DELETE FROM lists WHERE id=?",[account_id]);  // return Promise [results, fields]
        return await List.destroy({
            where: { id: listId}
        })
    }
    return null;
}

async function addList(name){
    if(name){
        
        // const [result, ] = await pool.query("INSERT INTO lists (name, user_id) VALUES (?, ?)",[name, 1]);  // return Promise [results, fields]
        return await List.create({
            userId:1,
            name:name
        })
        
    }
    return null;
}

async function updateList(account_id, name){
    if(account_id && name){

        // const [result, ] = await pool.query("UPDATE lists SET name=? WHERE id=?",[name, account_id]);  // return Promise [results, fields]
        return await List.update(
            {
                name: name
            },
            {
                where: { 
                    id: account_id
                }
            }
        )
    }
    return null
}

module.exports = {
    getLists,
    getListById,
    getUserByList,
    deleteListById,
    addList,
    updateList
}