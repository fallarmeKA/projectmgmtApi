import User from "../models/userModel.js";
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import logger from './src/utils/logger.js';

// Update User
export const updateUserController = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            logger.warn('User not found for update:', req.user.userId);
            return res.status(404).json({ message: "User not found" });
        }
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        await user.save();
        const token = user.generateAuthToken();
        logger.info('User updated successfully:', user._id);
        res.status(200).json({ user, token });
    } catch (error) {
        logger.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get User
export const getUserController = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            logger.warn('User not found for get:', userId);
            return res.status(404).json({ message: "User not found" });
        }
        logger.info('User retrieved successfully:', userId);
        res.status(200).json({ user });
    } catch (error) {
        logger.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Create User
export const postUserController = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = user.generateAuthToken();
        logger.info('User created successfully:', user._id);
        res.status(201).json({ user, token });
    } catch (error) {
        logger.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Forgot Password
export const forgotPasswordController = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.warn('User not found for forgot password:', email);
            return res.status(404).json({ message: "User not found" });
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'FORGOT PASSWORD',
            text: `It seems like you've forgotten your password, but don't worry, we're here to assist you. Please provide your email address below, and we'll send you detailed instructions on how to reset your password securely.\n\nTo reset your password, please click the link below. You'll receive further instructions via email. Thank you.\n\nIf you did not send this request to change your password, please disregard this message and ensure your account security by contacting our support team immediately.\n\nhttp://localhost:3000/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logger.error('Error sending reset email:', error);
                return res.status(500).json({ message: 'Error sending reset email' });
            } else {
                logger.info('Reset email sent successfully:', info.response);
                return res.status(200).json({ message: 'Reset email sent successfully' });
            }
        });
    } catch (error) {
        logger.error('Error generating reset token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password
export const resetPasswordController = async (req, res, next) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            logger.warn('User not found for reset password:', id);
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        logger.info('Password reset successfully:', id);
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        logger.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
