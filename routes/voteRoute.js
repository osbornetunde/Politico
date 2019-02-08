import express from 'express';
import Vote from '../controllers/voteDB';


const router = express.Router();




//express Interest
router.post(`/votes/`, Vote.createVote);







export default router;