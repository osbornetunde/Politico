import db from '../db/index.js';
import Helper from './helper';


const Users = {

  async  createAccount(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
      return res.status(400).send({
        status: '400',
        message : 'Please fill the required fields'
      })
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).send({
        status: '400',
        message: 'Please enter a valid email'
      });
    }

    const hashPassword = Helper.hashPassword(req.body.password);
    const text = `INSERT INTO
      users(firstname, lastname, othername, email, phoneNumber, passportUrl, password)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      returning *`;
    const values = [
      req.body.firstname, 
      req.body.lastname, 
      req.body.othername, 
      req.body.email, 
      req.body.phoneNumber, 
      req.body.passportUrl,
      hashPassword
    ];

          try {
            const { rows } =  await db.query(text, values);
            const token = Helper.generateToken(rows[0].id);
            return res.status(201).send({
              status: '201',
              data:   [token, rows]
            });
        } catch (error) {
          if(error.routine === '_bt_check_unique') {
            return res.status(400).send({
              status: '400',
              message: 'User with that email or phone number already exists'
            })
        }
          return res.status(400).send(error);
      }
},

async login(req, res) {
  if (!req.body.email || !req.body.password) {
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
    const { rows } = await db.query(text, [req.body.email]);
    if (!rows[0]) {
      return res.status(400).send({
        status: '400',
        message: 'The credentials you provided are incorrect'
      })
    }
    if(!Helper.comparePassword(rows[0].password, req.body.password)) {
      return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
    }
    const token = Helper.generateToken(rows[0].id);
    return res.status(200).send({
      status: '200',
      data: [token, rows] 
    });
  } catch(error) {
    return res.status(400).send(error);
  }
}
  
}

export default Users;