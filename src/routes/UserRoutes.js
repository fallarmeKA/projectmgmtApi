import express from 'express';
import { updateUserController, getUserController, postUserController, forgotPasswordController, resetPasswordController, loginUserController } from '../controllers/userController.js';

const router = express.Router();

router.get('/:userId', getUserController);
router.put('/update', updateUserController);
router.post('/register', postUserController);
router.post('/forgot-password', forgotPasswordController);
router.post('/reset-password/:id/:token', resetPasswordController);
router.post('/login', loginUserController);

export default router;
