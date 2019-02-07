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
        };
    
        parties.push(party);
        return res.status(201).json({
            status: '201',
            data: party
        });
    }

    deleteAParty(req, res) {
        const id = parseInt(req.params.id);
        parties.map((party, index) => {
            if(party.id === id) {
                parties.splice(index, 1);
                    return res.status(200).json({
                        status: '200',
                        message: 'Party deleted successfully',
                    });
            }
        });
        return res.status(404).json({
            status: '404',
            error: 'party not found'
        });
    }

    editAParty(req, res) {
        const id = parseInt(req.params.id);
        let partyFound;
        let partyIndex;
        parties.map((party, index) => {
            if(party.id === id) {
                partyFound = party;
                partyIndex = index;
            }
        });
    
    if(!partyFound) {
        return res.status(404).json({
            status: '404',
            error: 'party not found'
        });
    }
    
    if(!req.body.name) {
        return res.status(400).json({
            status: '400',
            error: 'party name is required'
        });
    } else if(!req.body.hqAddress) {
        return res.status(400).json({
            status: '400',
            error: 'party headquarters Address required'
        });
    } else if(!req.body.logoUrl) {
        return res.status(400).json({
            status: '400',
            error: 'party logo url is required'
        });
    }
    
    const editedparty = {
        id: partyFound.id,
        name: req.body.name || partyFound.name,
        hqAddress: req.body.hqAddress || partyFound.hqAddress,
        logoUrl: req.body.logoUrl || partyFound.logoUrl
    };
    
    parties.splice(partyIndex, 1, editedparty);
    
    return res.status(201).json({
        status: '201',
        data: editedparty
    });
    }

}

    

const partiesController = new PartiesController();
export default partiesController;