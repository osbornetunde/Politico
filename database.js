// import  {Pool } from 'pg';
// import dotenv from 'dotenv';


const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();
const pool = new Pool({
    connectionString:  process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('connected to the db');
})



/**
 * Create Tables
 */
const createTables = () => {
const queryUser = 
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
const queryParty = 
`CREATE TABLE IF NOT EXISTS
    parties(
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        "hqAddress" VARCHAR(50) UNIQUE NOT NULL,
        "logoUrl" TEXT
)`;

const queryOffice = 
    `CREATE TABLE IF NOT EXISTS
        offices(
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL,
            type VARCHAR(50)  NOT NULL
    )`;

    pool.query(queryUser, queryParty, queryOffice)
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
  const queryUser = 'DROP TABLE IF EXISTS users';
  const queryParty = 'DROP TABLE IF EXISTS parties';
  const queryOffice = 'DROP TABLE IF EXISTS offices';
  pool.query(queryUser, queryParty, queryOffice)
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