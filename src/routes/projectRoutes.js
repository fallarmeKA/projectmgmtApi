import express from 'express';
import { createProjectController, getProjectsController } from '../controllers/projectController.js';

const router = express.Router();

router.post('/create', createProjectController);
router.get('/', getProjectsController);

export default router;
