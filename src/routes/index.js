import express from 'express';
import { parties, offices } from '../db/db';
import partiesController from '../controllers/parties';


const router = express.Router();


// get all political parties

router.get('/api/v1/parties', partiesController.getAllParty);

/

export default router;