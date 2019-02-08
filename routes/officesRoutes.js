import express from 'express';
import Offices from '../controllers/officesDB';

const router = express.Router();

//create an office
router.post('/api/v1/office', Offices.createOffice);

//get all office
router.get('/api/v1/offices', Offices.getAllOffices);

//get a office
router.get('/api/v1/offices/:id', Offices.getOffice);

export default router;