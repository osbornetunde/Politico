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

    createAParty(req, res) {
        if(!req.body.name) {
            return res.status(400).json({
                status: '400',
                error: 'name is required'
            });
        } else if(!req.body.hqAddress) {
            return res.status(400).json({
                status: '400',
                error: 'Headquarter Address is required'
            });
        } else if(!req.body.logoUrl){
            return res.status(400).json({
                status: '400',
                error: 'logoUrl is required'
            });
        }
    
        const party = {
            id: parties.length + 1,
            name: req.body.name,
            hqAddress: req.body.hqAddress,
            logoUrl: req.body.logoUrl,
        }
    
        parties.push(party);
        return res.status(201).json({
            status: '201',
            data: party
        })
    }

}

    

const partiesController = new PartiesController();
export default partiesController;