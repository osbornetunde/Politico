import express from 'express';
import Candidates from '../controllers/candidateDB';


const router = express.Router();




//express Interest
router.post(`/${id}/users`, Candidates.expressInterest);







export default router;