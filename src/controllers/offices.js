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


    createAOffice(req, res) {
        if(!req.body.type) {
            return res.status(400).json({
                status: '400',
                error: 'type of office is required'
            });
        } else if(!req.body.name) {
            return res.status(400).json({
                status: '400',
                error: 'name of the office is required',
            })
        }
    
        const office = {
            id: offices.length + 1,
            type: req.body.type,
            name: req.body.name
        }
    
        offices.push(office);
        return res.status(201).json({
            status: '201',
            data: office
        });
    }
}

const officesController = new OfficesController();
export default officesController;