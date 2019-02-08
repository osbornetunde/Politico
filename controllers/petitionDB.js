import db from '../db/index.js';






const Petition = {

    async createPetition (req, res) {

        const text = `INSERT INTO
      petitons("createdOn", "createdBy", office, bodies)
      VALUES($1, $2, $3)
      returning *`;
        const values = [
            req.body.createdOn,
            req.body.createdBy,
            req.body.office,
            req.body.bodies
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

   export default Petition