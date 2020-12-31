// get the client
const mysql = require('mysql2/promise');


// create the connection to database
const pool = mysql.createPool({
    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'todos'
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: process.env.CONNECTION_LIMIT,
    queue: process.env.LIMIT_QUEUE
});



module.exports={
    pool
}