import db from '../db/index.js';






const Votes= {

    async createVote (req, res) {

        const text = `INSERT INTO
      votes("createdOn", "createdBy", office, candidate)
      VALUES($1, $2, $3)
      returning *`;
        const values = [
            req.body.createdOn,
            req.body.createdBy,
            req.body.office,
            req.body.candidate
        ];

            try {
                const { rows } = db.query(text, values);
                return res.status(201).send({
                    status: '201',
                    data: rows[0]
                });
            } catch (error) {
                return res.status(400).send(error);
            }

    }

   }

   export default Votes