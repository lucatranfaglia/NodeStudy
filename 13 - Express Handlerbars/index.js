const logger = require('morgan');
const express = require('express');

const path = require('path');
const ehb = require('express-handlebars');

const methodOverride = require('method-override');

const todosRoutes = require('./routes/api/todos');
const listsRoutes = require('./routes/api/lists');


// creo un'istanza di express
const app = express();

// Engine
// config Engine
let hbs = ehb.create({ 
    defaultLayout: 'main', 
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});
app.engine('.hbs', hbs.engine);
// app.engine('.hbs', ehb({extname: '.hbs'}));
app.set('view engine', '.hbs');

// HTTP request logger middleware for node.js
app.use(logger('dev'));

// POSTMAN POST x-www-form-urlencoded (chiave-valore) : per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
// true: vengono mappati a json anche i paramentri a null e undefined
// false: vengono mappati a json solo stringhe
app.use(express.urlencoded({extended: true}));

// POSTMAN POST raw: per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
app.use(express.json());

// Risorse Statiche - CSS Bootstrap
app.use(express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));


app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

// ROUTES
// api CRUD Todos
app.use('/api/todos', todosRoutes);

// api CRUD Lists
app.use('/api/lists', listsRoutes);


// Per non creare delle costanti, uso app.use con require

// per visualizza tutte le liste sia per '/lists' che per '/' passo una ARRAY di match
app.use(['/lists', '/'], require('./routes/lists'))

app.use('/todos', require('./routes/todos'))

// LISTA di LISTE
// app.use('/lists', require('./routes/lists'))
// app.use('/', (req, res) => {
//     res.render('index')
// });

module.exports = app;