import express from 'express';
import { createLoginController, getLoginsController } from '../controllers/loginController.js';

const router = express.Router();

router.post('/create', createLoginController);
router.get('/', getLoginsController);

export default router;
