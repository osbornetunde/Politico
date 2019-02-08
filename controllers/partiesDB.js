import db from '../db/index.js';

const Parties = {
  
  async createAParty(req, res) {
    const text = `INSERT INTO
      parties(name, hqAdress, logoUrl)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.email, 
      req.body.hqAddress, 
      req.body.logoUrl
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).send({
        status: '201',
        data: rows[0]
      });
    } catch(error) {
      return res.status(400).send({
        status: '400',
        message: 'bad request'
      });
    }
  },
  
  async getAllParties(req, res) {
    const findAllParties = 'SELECT * FROM parties';
    try {
      const { rows, rowCount } = await db.query(findAllParties)
      return res.status(200).json({
                    status: '200',
                    data: { rows, rowCount }
                })
    } catch(error) {
      return res.status(400).send({
        status: '400',
        message: 'Bad request'
      });
    }
  },
  

  async getParty(req, res) {
    const text = 'SELECT * FROM parties WHERE id = $1';
    try {
      const { rows } =  await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: '404',
          message: 'party not found'
        });
      }
      return res.status(200).send({
        status: '200',
        data: rows[0]
      });
    } catch(error) {
      return res.status(400).send({
        status: '400',
        message: 'Bad request'
      });
    }
  },
  

  async editParty(req, res) {
    const findOneQuery = 'SELECT * FROM parteis WHERE id=$1';
    const updateOneQuery =`UPDATE parties
      SET name=$1, hqAddress=$2, logourl=$3,WHERE id=$5 returning *`;
    try {
      const { rows } =  await db.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({
          status: '404',
          message: 'party not found'
        });
      }
      const values = [
        req.body.name || rows[0].name,
        req.body.hqAddress || rows[0].hqAddress,
        req.body.logoUrl || rows[0].logourl,
        req.params.id
      ];
      const response = db.query(updateOneQuery, values);
      return res.status(200).send({
        status: '200',
        data:response.rows[0]
      });
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  
  async deleteParty(req, res) {
    const deleteQuery = 'DELETE FROM parties WHERE id=$1 returning *';
    try {
      const { rows } =  await db.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({
          status: '404',
          message: 'party not found'
        });
      }
      return res.status(204).send({ 
        status: '204',
        message: 'deleted' 
      });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Parties;



