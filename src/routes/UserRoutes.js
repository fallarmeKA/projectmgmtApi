import express from 'express';
import { updateUserController, getUserController, forgotPasswordController, resetPasswordController, loginUserController } from '../controllers/UserController.js';

const router = express.Router();

// Define routes
router.get('/:userId', getUserController);
router.put('/update', updateUserController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:id/:token', resetPasswordController);
router.post('/login', loginUserController); 

export default router;
