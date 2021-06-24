const logger = require('morgan');
const path = require('path');

// ------------------------------------
// Express
// ------------------------------------
const express = require('express');
// creo un'istanza di express
const app = express();


// ------------------------------------
// Express-handlebars - Template Engine
// ------------------------------------
const ehb = require('express-handlebars');

// ------------------------------------
// handlebars-helpers
// ------------------------------------
const helpers = require('handlebars-helpers')();

// ------------------------------------
// FLASH: connect-flash
// ------------------------------------
const flash = require('connect-flash');

// ------------------------------------
// MIDDLEWARE
// ------------------------------------
const { overrideMethod, redirectHome, redirectLogin, setSession } = require('./middleware');


// ------------------------------------
// Routes
// ------------------------------------
const todosRoutes = require('./routes/api/todos');
const listsRoutes = require('./routes/api/lists');
const authRoutes = require('./routes/auth');

// ------------------------------------
// TEMPLATE Engine HandleBars
// ------------------------------------
// config Engine
let hbs = ehb.create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: helpers,
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
app.use(express.urlencoded({ extended: true }));

// POSTMAN POST raw: per la lettura del dato nel req.body è necessario convertire il contenuto in JSON 
app.use(express.json());

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// Risorse Statiche (priorità dall'alto verso il basso)
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// public (js & css) - alias del percorso '/public'
app.use('/public', express.static(path.join(__dirname, 'public')));

// CSS Bootstrap - (rinominiamo il percorso con /bootstrap)
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')));

// sweetalert2 - alias del percorso '/sweetalert2'
app.use('/sweetalert2', express.static(path.join(__dirname, 'node_modules', 'sweetalert2', 'dist')));

// axios - alias percorso '/axios'
app.use('/axios', express.static(path.join(__dirname, 'node_modules', 'axios', 'dist')));


// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// MIDDLEWARE 
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------

// ------------------------------------
// Override Method
// ------------------------------------
app.use(overrideMethod())

// ------------------------------------
// Express-session - config session (middleware)
// ------------------------------------
app.use(setSession());

// ------------------------------------
// Flash - passare dati da una pagina all'altra
// ------------------------------------
// inserisco flash nella request
app.use(flash());

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// ROUTES Management
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------
// API CRUD Todos - può accedere all'API solo se è loggato
app.use('/api/todos', redirectLogin, todosRoutes);

// API CRUD Lists - può accedere all'API solo se è loggato
app.use('/api/lists', redirectLogin, listsRoutes);


// prima di portare l'utente sulla rotta /register e /signup, verifichiamo se l'utente è loggato (se è loggato va in home)
app.use('/auth', redirectHome, authRoutes);
/**
 * Per non creare delle costanti, uso app.use con require per visualizza tutte le liste sia per '/lists' che per '/' passo una ARRAY di match
 * N.B. se non è loggato non può accedere a queste rotte
 */
app.use(['/lists', '/'], redirectLogin, require('./routes/lists'))
app.use('/todos', require('./routes/todos'))

/**
 * Logout utente
 * 
 * @params req
 * @param res
 */
app.get('/logout', async(req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    })
})


module.exports = app;