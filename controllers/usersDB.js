import db from '../db/index.js';
import bcrypt from 'bcryptjs';

class Users {
  
  const passwordHash = (password, callback) => {
    brcypt.hash(password, bcrypt.genSalt(10), function(err, hash) {
        if (err) {
              return null
        } else {
            return callback(hash);
        }
    })
}
  static createAccount(req, res) {
    const text = `INSERT INTO
      users(firstname, lastname, othername, email, phoneNumber, passportUrl, password)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      req.bodyfirstname, 
      req.body.lastname, 
      req.body.othername, 
      req.body.email, 
      req.body.phoneNumber, 
      req.body.passportUrl
    ];

    passwordHash(req.body.password, ((hash) => {
          try {
            const { rows } =  db.query(text, values);
            return res.status(201).send({
              status: '201',
              data: rows[0]
            });
        } catch(error) {
          return res.status(400).send({
            status: '400',
            message: 'Bad request'
          });
      }
    }));
}
  
  
}

export default Users;