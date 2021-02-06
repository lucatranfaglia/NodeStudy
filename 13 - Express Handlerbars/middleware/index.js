const methodOverride = require('method-override');

// Express-session - Gestione delle sessioni
const session = require('express-session');
const MAX_AGE = process.env.MAX_AGE || 60*60*1000; // 60 minuti, 60 secondi, 1000 secondi
const SECRET = process.env.SECRET || 'Our beautiful secrete';
const DEFAULT_ENV = process.env.DEFAULT_ENV || 'development';


// ------------------------------------
// OVERRIDE: method-override - per lavorare con metodi DELETE, PATH
// ------------------------------------
const overrideMethod = () => {
    return methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
        }
    })
}

// ------------------------------------
// USER LOGIN
// ------------------------------------
// se l'utente è loggato viene rindirizzato alla Home
const redirectHome = (req, res, next) => {
    
    if(req.session.user && !req.path === '/auth/logout'){
        res.redirect('/');
    }
    else{
        next();
    }    
}

// se l'utente NON è loggato viene rindirizzato alla rotta '/auth/login'
const redirectLogin = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/auth/login');
    }
    else{
        next();
    }    
}

// ------------------------------------
// SET SESSION USER
// ------------------------------------
const setSession = () => {
    return session({
        cookie: {
            maxAge: MAX_AGE,            
            secure: DEFAULT_ENV === 'production'
        },
        secret: SECRET,
        resave: false,
        saveUninitialized: false,
    })
}

module.exports = {
    overrideMethod,

    redirectHome,
    redirectLogin,

    setSession
}