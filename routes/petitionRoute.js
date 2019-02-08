import express from 'express';
import Petition from '../controllers/petitionDB';


const router = express.Router();




//express Interest
router.post(`/petitions/`, Petition.createPetition);







export default router;