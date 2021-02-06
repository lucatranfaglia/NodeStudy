const {User} = require('../models');

const bc = require('bcrypt');


async function register({name, email, password}){
    
    const result= await User.create({name, email, password});
    console.log("result:",result);
    return result;
    
}

async function login({email, password}){    

    if(!email){
        throw new Error("email not found!");
    }
    if(!password){
        throw new Error("password not found!");
    }

    const user =  await User.findOne({ where :{email}});
    console.log("user:",user);

    if(!user){
        throw new Error("User not found by email/password!");
    }
    // Compara la password con hash della password presente del db
    if(!bc.compareSync(password, user.password)){
        throw new Error("User not found: passord/email does not match.");
    }
    return user;    
}



module.exports = {
    register,
    login
}