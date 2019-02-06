import express from 'express';
import Users from '../controllers/usersDB';


const router = express.Router();


//create users
router.post('/api/v1/users', Users.createAccount);



export default router;