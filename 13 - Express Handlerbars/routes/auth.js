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

router.post('/register', async (req, res)=>{    
    try {
        // const {name, email, password} = req.body;
        console.log("req.body: ",req.body);
        const result = await register(req.body);

        res.status(result ? 200 : 404).json(result ? result : "Error result")
        
    } 
    catch (error) {
        console.log("Error:", error);
        res.status(500).send({message: error.toString()});
    }
})

module.exports = router;