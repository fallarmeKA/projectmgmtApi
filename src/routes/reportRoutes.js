import express from 'express';
import { getProjectReportController } from '../controllers/reportController.js';

const router = express.Router();

// Route to get a project report
router.get('/project/:projectId', getProjectReportController);

export default router;
