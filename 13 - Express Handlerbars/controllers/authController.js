const {User} = require('../models');


async function register(data){
    
    return await User.create(
    {
        name: data.name, 
        email: data.email, 
        password: data.password
    });
    
}



module.exports = {
    register,
}