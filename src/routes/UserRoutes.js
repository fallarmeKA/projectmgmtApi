import express from 'express';
import userController from '../controllers/userController.js';  

const router = express.Router();

router.get('/:userId', userController.getUserController);
router.put('/update', userController.updateUserController);
router.post('/register', userController.postUserController);
router.post('/forgot-password', userController.forgotPasswordController);
router.post('/reset-password/:id/:token', userController.resetPasswordController);
router.post('/login', userController.loginUserController);

export default router;
