const logger = require('morgan');
const path = require('path');

// ------------------------------------
// Express
// ------------------------------------
const express = require('express');

// Express-handlebars - Template Engine
const ehb = require('express-handlebars');

// Express-session - Gestione delle sessioni
const session = require('express-session');

// ------------------------------------
// connect-flash - 
// ------------------------------------
const flash = require('connect-flash');

// ------------------------------------
// method-override - per lavorare con metodi DELETE, PATH
// ------------------------------------
const methodOverride = require('method-override');

// ------------------------------------
// Routes
// ------------------------------------
const todosRoutes = require('./routes/api/todos');
const listsRoutes = require('./routes/api/lists');


// creo un'istanza di express
const app = express();

// ------------------------------------
// TEMPLATE Engine HandleBars
// ------------------------------------
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

// ------------------------------------
// HTTP request logger middleware for node.js
// ------------------------------------
app.use(logger('dev'));

// ------------------------------------
// FORMAT 
// ------------------------------------
// POSTMAN POST x-www-form-urlencoded (chiave-valore) : per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
// true: vengono mappati a json anche i paramentri a null e undefined
// false: vengono mappati a json solo stringhe
app.use(express.urlencoded({extended: true}));

// POSTMAN POST raw: per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
app.use(express.json());

// ------------------------------------
// ------------------------------------
// Risorse Statiche (priorità dall'alto verso il basso)
// ------------------------------------
// ------------------------------------

// public (js & css) - alias del percorso '/public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// CSS Bootstrap - (rinominiamo il percorso con /bootstrap)
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

// sweetalert2 - alias del percorso '/sweetalert2'
app.use('/sweetalert2', express.static(path.join(__dirname, 'node_modules', 'sweetalert2', 'dist')));

// ------------------------------------
// Override Method
// ------------------------------------
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

// ------------------------------------
// Express-session - config session
// ------------------------------------
const MAX_AGE = process.env.MAX_AGE || 60*60*1000; // 60 minuti, 60 secondi, 1000 secondi
const SECRET = process.env.SECRET || 'Our beautiful secrete';
const DEFAULT_ENV = process.env.DEFAULT_ENV || 'development';
app.use(session({
        cookie: {
            maxAge: MAX_AGE,            
            secure: DEFAULT_ENV === 'production'
        },
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// ------------------------------------
// Flash - passare dati da una pagina all'altra
// ------------------------------------
// inserisco flash nella request
app.use(flash());


// ------------------------------------
// MIDDLEWARE per testare se funzionano le sessioni
// ------------------------------------
app.use((req, res, next)=>{
    req.session.userId = 1;
    next();
})

// ------------------------------------
// ROUTES
// ------------------------------------
// API CRUD Todos
app.use('/api/todos', todosRoutes);

// API CRUD Lists
app.use('/api/lists', listsRoutes);


// Per non creare delle costanti, uso app.use con require
// per visualizza tutte le liste sia per '/lists' che per '/' passo una ARRAY di match
app.use(['/lists', '/'], require('./routes/lists'))
app.use('/todos', require('./routes/todos'))


module.exports = app;