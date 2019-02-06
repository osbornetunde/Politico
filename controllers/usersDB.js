import db from '../db/index.js';
import Helper from '.helper';


class Users {

  static createAccount(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({
        status: '400',
        message : 'Please fill the required fields'
      })
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: 400,
        message: 'Plaese enter a valid email'
      });
    }

    const passwordHash = Helper.hashPassword(req.body.password);
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
      req.body.passportUrl,
      passwordHash
    ];

          try {
            const { rows } =  db.query(text, values);
            const token = Helper.generateToken(rows[0].id);
            return res.status(201).send({
              status: '201',
              data: [token, rows[0]]
            });
        } catch(error) {
          if(error.routine === '_bt_check_unique') {
            return res.status(400).send({
              status: '400',
              message: 'User with that email already exists'
            })
          }
          return res.status(400).send({
            status: '400',
            message: 'Bad request'
          });
      }
}
  
  static login(req, res) {
    if (!req.body.email || req.body.password) {
      return res.status(400).send({
        status: '400',
        message: 'Please fill the required fields'
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: '400',
        message: 'Please enter a valid email address'
      })
    }

    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = db.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).send({
          status: '400',
          message: 'The credentials you provided are incorrect'
        })
      }
      const token = Helper.generateToken(rows[0].id);
      return res.status(200).send({
        status: '200',
        data: { token }
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
  
}

export default Users;