import { offices } from '../db/db';

class OfficesController {

	getAllOffices(req, res) {
        return res.status(200).json({
                status: '200',
                data: offices
        });
    }

    getAOffice(req, res) {
        const id = parseInt(req.params.id, 10);
        offices.map((office) => {
            if(office.id === id) {
                return res.status(200).json({
                    status: '200',
                    data: office,
                });
            }
        });
        return res.status(404).json({
            status: '404',
            error: 'Office not found',
        });
    }
}

const officesController = new OfficesController();
export default officesController;