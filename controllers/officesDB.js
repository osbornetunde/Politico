import db from '../db/index.js';

class OfficesDBController {
  
  static createOffice(req, res) {
    const text = `INSERT INTO
      offices(id, name, type)
      VALUES($1, $2, $3)
      returning *`;
    const values = [ 
    req.body.name, 
    req.body.type, 
    ];

    try {
        const { rows } = db.query(text, values);
        return res.status(201).send({
            status: '201',
            data: rows[0]
        });
    } catch(error) {
      return res.status(400).send(error);
  }
}
  
  static getAllOffices(req, res) {
    const findAllOffices = 'SELECT * FROM offices';
    try {
        const { rows, rowCount } = db.query(findAllOffices);
        return res.status(200).send({
            status: '200',
            data: { rows, rowCount }
        });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
  
  static getOffice(req, res) {
    const text = 'SELECT * FROM offices WHERE id = $1';
    try {
      const { rows } = db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({
            status: '404',
            error: 'office not found'
        });
      }
      return res.status(200).send({
            status: '404',
            data: rows[0]
        });
    } catch(error) {
      return res.status(400).send(error)
    }
  }
}

export default OfficesDBController;



