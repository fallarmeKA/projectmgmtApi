import express from 'express';
import { createTimeTableController, getTimeTablesController } from '../controllers/timeTableController.js';

const router = express.Router();

router.post('/create', createTimeTableController);
router.get('/', getTimeTablesController);

export default router;
