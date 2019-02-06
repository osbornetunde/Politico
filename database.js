// import  {Pool } from 'pg';
// import dotenv from 'dotenv';


const { Pool, Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
    connectionString:  process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  connectionString: connectionString,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})


/**
 * Create Tables
 */
const createTables = () => {
const queryText = 
    `CREATE TABLE IF NOT EXISTS
        users(
            id SERIAL ,
            firstname VARCHAR(50) NOT NULL,
            lastname VARCHAR(50) NOT NULL,
            othername VARCHAR(50),
            email VARCHAR(300) UNIQUE NOT NULL PRIMARY KEY,
            phoneNumber INT(20) UNIQUE NOT NULL,
            passportUrl TEXT,
            isAdmin BOOL DEFAULT 'f'
    )`;

    pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Tables
 */
const dropTables = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = {
  createTables,
  dropTables
};

require('make-runnable');