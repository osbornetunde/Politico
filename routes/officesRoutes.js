import express from 'express';
import OfficesDBController from '../controllers/officesDB';

const router = express.Router();

//create an office
router.get('/api/v1/offices', OfficesDBController.createOffice);

//get all office
router.get('/api/v1/offices', OfficesDBController.getAllOffices);

//get a office
router.get('/api/v1/offices/:id', OfficesDBController.getOffice);

export default router;