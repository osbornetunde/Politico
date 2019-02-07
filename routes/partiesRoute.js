import express from 'express';
import PartiesDBController from '../controllers/parties';



const router = express.Router();


// get all political parties

router.get('/api/v1/parties', PartiesDBController.getAllParties);

// Get a specific political party

router.get('/api/v1/parties/:id', PartiesDBController.getParty);

//Create political party

router.post('/api/v1/parties', PartiesDBController.createParty);

// Delete a party
router.delete('/api/v1/parties/:id', PartiesDBController.deleteParty);

// Edit a political party
router.patch('/api/v1/parties/:id', PartiesDBController.editParty);