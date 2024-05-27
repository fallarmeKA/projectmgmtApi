import express from 'express';
import { createReportController, getReportsController } from '../controllers/reportController.js';

const router = express.Router();

router.post('/create', createReportController);
router.get('/', getReportsController);

export default router;
