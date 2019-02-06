import db from '../db/index.js';

class Users {
  
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
      req.body.passportUrl];

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
}
  
  
}

export default Users;



// class PartiesDBcontroller{

//      getAllParties (req, res) {
//      return pool.query('SELECT * FROM parties', (err, results) => {
//         if (err) {
//         throw err
//         }
//         return res.status(200).json({
//             status: '200',
//             data: results.rows
//         })
//     })
//     }

//      getAParty (req, res) {
//     const id = parseInt(req.params.id)

//     return pool.query('SELECT * FROM paries WHERE id = $1', [id], (err, results) => {
//         if (err) {
//         throw err
//         }
//         return res.status(200).json({
//             status: '200',
//             data: results.rows
//         })
//     })
//     }

//      createParty (req, res)  {
//     const { name, hqAddress, logoUrl} = req.body

//     return pool.query('INSERT INTO parties (name, hqAddress, logoUrl) VALUES ($1, $2, $3)', [name, hqAddress, logoUrl], (err, results) => {
//         if (err) {
//         throw err
//         }
//         return res.status(201).send(
//             status: '201',
//             message:'Party successfully created')
//     })
//     }

//     editParty (req, res)  {
//     const id = parseInt(req.params.id)
//     const { name, hqAddress, logoUrl } = req.body

//     return pool.query(
//         'UPDATE users SET name = $1, hqAddress = $2, logoUrl = $3 WHERE id = $3',
//         [name, hqAddress, id],
//         (err, results) => {
//         if (err) {
//             throw err
//         }
//         return res.status(200).send(
//             status: '200',
//             message:'Party updated'
//             )}
//     )
//     }

//      deleteParty (req, res)  {
//     const id = parseInt(req.params.id)

//     return pool.query('DELETE FROM parties WHERE id = $1', [id], (err, results) => {
//         if (err) {
//         throw err
//         }
//         return res.status(200).send(
//             status: '200',
//             message:'Party deleted'
//             )
//     })
//     }
// }
// const partiesDBcontroller = new PartiesDBcontroller();
// export default partiesDBcontroller;

// module.exports = {
// getAllParties,
// getAParty,
// createParty,
// editParty,
// deleteParty,
// }