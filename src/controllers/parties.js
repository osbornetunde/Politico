import { parties } from '../db/db';

class PartiesController {


    getAllParty(req, res) {
        return res.status(200).json({
               status: '200',
               data: parties
        });
    }

}

    

const partiesController = new PartiesController();
export default partiesController;