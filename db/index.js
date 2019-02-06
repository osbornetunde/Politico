const {
  Pool
} = require('pg');
const dotenv = require('dotenv')

dotenv.config();

// const connectionString = 'postgres://owgxhncn:5d-j7GPddLUO6IldU9p6FHATh0hS6iTv@pellefant.db.elephantsql.com:5432/owgxhncn';
const pool = new Pool({
  connectionString:  process.env.DATABASE_URL
});

export default {

  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    });
  }
};
