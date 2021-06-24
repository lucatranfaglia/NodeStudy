const List = require('../models').List;
const Todo = require('../models').Todo;
const Op = require('../models').Sequelize.Op;
// colonne che si voglio visualizzare
// const attributes = ['id', 'name', 'userId'];

const attributes = {
    include: [
        // funzione: [count (colonna da contare), alias]
        [
            List.sequelize.fn('COUNT',
                // colonna e alias
                List.sequelize.col('Todos.id')),
            'nTodos'
        ]
    ],
    exclude: ['createdAt', 'updatedAt']
};


// ritorna tutte le liste con i relativi utenti
async function getLists(pars = {}) {

    // search into page
    const where = pars.q ? {
        name: {
            [Op.like]: '%' + pars.q + '%'
        },
    } : {};

    return await List.findAll({
        attributes: attributes,
        subQuery: false,
        include: [
            // per contare quanti todos ha una lista
            { model: Todo, attributes: [] },
            'User'
        ],
        group: ['List.id'],
        order: [
            ['createdAt', 'DESC']
        ],
        where: where
            // limit: 20,
            // offset: 10      // partendo dalla 10° posizione
    });
}

// ritorna la lista con un determinato ID
async function getListById(listId) {
    if (listId) {

        // Find by Primary Key
        return await List.findByPk(listId, {
            attributes: attributes,
            include: [
                // per contare quanti todos ha una lista
                { model: Todo, attributes: [] },
                'User'
            ],
            order: [
                ['createdAt', 'DESC']
            ]
        });


        // return await List.findAll({
        //     attributes: attributes,
        //     where: {
        //         id: listId
        //     }
        // });
    }
    return null;
}

// ritorna tutte le lista di uno User tramite UserId 
async function getListByUserId(userId) {
    if (userId) {

        // Find by Primary Key
        return await List.findAll({
            where: { userId },

            attributes: ['id', 'name'],

            order: [
                ['name', 'ASC']
            ]
        });
    }
    return null;
}

// ritorna una lista e le relative info dell'utente (tramite listId)
async function getUserByList(listId) {
    if (listId) {

        // Find by Primary Key
        return await List.findByPk(listId, {
            attributes: attributes,
            include: [
                { model: Todo, attributes: [] },
                'User'
            ]
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
async function deleteListById(listId) {
    if (listId) {
        // const [result, ] = await pool.query("DELETE FROM lists WHERE id=?",[account_id]);  // return Promise [results, fields]
        return await List.destroy({
            where: { id: listId }
        })
    }
    return null;
}

async function addList(listName) {
    if (listName) {

        // const [result, ] = await pool.query("INSERT INTO lists (name, user_id) VALUES (?, ?)",[name, 1]);  // return Promise [results, fields]
        return await List.create({
            userId: 1,
            name: listName
        })

    }
    return null;
}

async function updateList(listId, listName) {
    if (listId && listName) {

        // const [result, ] = await pool.query("UPDATE lists SET name=? WHERE id=?",[name, listId]);  // return Promise [results, fields]
        return await List.update({ name: listName }, {
            where: {
                id: listId
            }
        })
    }
    return null
}

module.exports = {
    getLists,
    getListById,
    getListByUserId,
    getUserByList,
    deleteListById,
    addList,
    updateList
}