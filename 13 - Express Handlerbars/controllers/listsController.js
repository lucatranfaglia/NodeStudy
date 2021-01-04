const List = require('../models').List;
// colonne che si voglio visualizzare
const attributes = ['id', 'name', 'userId'];


// ritorna tutti i list
async function getLists(){

    return await List.findAll({
        attributes: attributes,
        // limit: 20,
        // offset: 10      // partendo dalla 10° posizione
    });
}

// ritorna i list con filtro
async function getListById(account_id){    
    if(account_id){

        // Find by Primary Key
        return await List.findByPk(account_id, {attributes: attributes});


        return await List.findAll({
            attributes: attributes,
            where: {
                id: account_id
            }
        });
    }
    return null;
}

// ritorna i list con filtro
async function getUserByList(accountId){    
    if(accountId){

        // Find by Primary Key
        return await List.findByPk(accountId, 
            {
                attributes: attributes,
                include: ['User']
            });


        // return await List.findAll({
        //     attributes: attributes,
        //     include: ['User'],
        //     where: {
        //         id:accountId
        //     }
        // });
    }
    return null;
}

// rimuove un list con filtro
async function deleteListById(account_id){
    if(account_id){
        // const [result, ] = await pool.query("DELETE FROM lists WHERE id=?",[account_id]);  // return Promise [results, fields]
        return await List.destroy({
            where: { id: account_id}
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