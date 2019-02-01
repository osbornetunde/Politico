import { offices } from '../db/db';

class OfficesController {

	getAllOffices(req, res) {
        return res.status(200).json({
                status: '200',
                data: offices
        });
    }
}