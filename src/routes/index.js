import express from 'express';
import { parties, offices } from '../db/db';
import partiesController from '../controllers/parties';


const router = express.Router();


// get all political parties

router.get('/api/v1/parties', partiesController.getAllParty);

// Get a specific political party

router.get('/api/v1/parties/:id', partiesController.getAParty);

//Create political party

router.post('/api/v1/parties', partiesController.createAParty);

// Delete a party
router.delete('/api/v1/parties/:id', partiesController.deleteAParty);

// Edit a political party
router.patch('/api/v1/parties/:id', partiesController.editAParty);

export default router;