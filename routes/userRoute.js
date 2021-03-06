import express from 'express';
import Users from '../controllers/usersDB';


const router = express.Router();


//create users account
router.post('/auth/signup',  Users.createAccount);
//user login
router.post('/auth/login',  Users.login)
export default router;