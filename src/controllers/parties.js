import { parties } from '../db/db';

class PartiesController {


    getAllParty(req, res) {
        return res.status(200).json({
               status: '200',
               data: parties
        });
    }

    getAParty(req, res) {
        const id = parseInt(req.params.id, 10);
        parties.map( party => {
            if(party.id === id) {
                return res.status(200).json({
                    status: '200',
                    data: party
                });
            }
        });
    
        return res.status(404).json({
            status: '404',
            error: 'party not found'
        });
    }

}

    

const partiesController = new PartiesController();
export default partiesController;