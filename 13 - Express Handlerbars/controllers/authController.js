const {User} = require('../models');


async function register({name, email, password}){
    
    const result= await User.create({name, email, password});
    console.log("result:",result);
    return result;
    
}



module.exports = {
    register,
}