import db from '../db/index.js';

const Offices = {
  
  async createOffice(req, res) {
    const text = `INSERT INTO
      offices(name, type)
      VALUES($1, $2)
      returning *`;
    const values = [ 
    req.body.name, 
    req.body.type, 
    ];
    const id = req.params.id;
    try {
        const { rows } = await db.query(text, values);
        return res.status(201).send({
            status: '201',
            data: rows[0]
        });
    } catch(error) {
      return res.status(400).send(error);
  }
},
  
  async getAllOffices(req, res) {
    const findAllOffices = 'SELECT * FROM offices';
    try {
        const { rows, rowCount } = await db.query(findAllOffices);
        return res.status(200).send({
            status: '200',
            data: { rows, rowCount }
        });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  
  async getOffice(req, res) {
    const id = req.params.id;
    const text = 'SELECT * FROM offices WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
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
  },

  async getResult(req, res) {
    const text = 'SELECT Offices, candidates, count(candidate) FROM votes WHERE office = $1 GROUP BY candidate, office'
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({
            status: '404',
            error: 'no vote found'
        });
      }
      return res.status(200).send({
            status: '404',
            data: rows
        });
    } catch(error) {
      return res.status(400).send(error)
    }
  }
}

export default Offices;



