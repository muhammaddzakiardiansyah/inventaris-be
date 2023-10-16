const { Pool } = require('pg');
require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.DB_PORT;

const db = new Pool({
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    database: DB_NAME,
    password: DB_PASS
});

db.connect((err) => {
    if(err) {
        console.log({message : "Database don't connected!", error : err});
    } else {
        console.log('Database success connected!');
    }
});

module.exports = db;
