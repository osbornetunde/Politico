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



export default router;