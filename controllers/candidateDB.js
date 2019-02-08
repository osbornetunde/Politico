import db from '../db/index.js';






const Candidates = {

    async expressInterest (req, res) {
        const id = req.params.id;
        const text = `INSERT INTO
      candidates(office, party, candidate)
      VALUES($1, $2, $3)
      returning *`;
        const values = [
            req.body.office,
            req.body.party,
            req.body.candidate
        ];

            try {
                const { rows } = await db.query(text, values);
                return res.status(201).send({
                    status: '201',
                    data: rows[0]
                });
            } catch (error) {
                return res.status(400).send(error);
            }

    }

   }

   export default Candidates