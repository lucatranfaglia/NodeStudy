const express = require('express');

// creo un'istanza di express
const router = express.Router();

// controller con db
const {register} = require('../controllers/authController');

router.get('/signup', async (req, res)=>{    
    try {
        
        res.render('login', {
            signup: true
        });
    } 
    catch (error) {
        console.log("Error:", error);
        req.flash('errors', error.errors.map(el => el.message));        
        res.redirect('/');
    }
})

/**
 * Registrazione utente
 * 
 * @params req
 * @param res
 */
router.post('/register', async (req, res)=>{    
    try {
        // const {name, email, password} = req.body;
        console.log("req.body: ",req.body);
        const {name, email, id} = await register(req.body);

        // object
        const User = {name,email, id};
        
        // verificare se l'utente è loggato
        req.session.user = User

        res.status(id ? 200 : 404).json(id ? User : "Error result")
        
    } 
    catch (error) {
        console.log("Error:", error);
        const errorMessages =error.errors.map(error => error.message).join('\n');
        res.status(500).send({message: errorMessages});
    }
})


/**
 * Login utente
 * 
 * @params req
 * @param res
 */
router.get('/login', async (req, res)=>{    
    try {
        
        res.render('login', {
            signup: false
        });
    } 
    catch (error) {
        console.log("Error:", error);
        req.flash('errors', error.errors.map(el => el.message));        
        res.redirect('/');
    }
})

module.exports = router;