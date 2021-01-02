const logger = require('morgan');
const express = require('express');


const todosRoutes = require('./routes/todos');
const listsRoutes = require('./routes/lists');


// creo un'istanza di express
const app = express();

// HTTP request logger middleware for node.js
app.use(logger('dev'));

// POSTMAN POST x-www-form-urlencoded (chiave-valore) : per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
// true: vengono mappati a json anche i paramentri a null e undefined
// false: vengono mappati a json solo stringhe
app.use(express.urlencoded({extended: true}));

// POSTMAN POST raw: per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
app.use(express.json());


// per quale rotta deve essere utilizzato
app.use('/todos', todosRoutes);


app.use('/lists', listsRoutes);

module.exports = app;