import User from "../models/UserModel.js";
import JWT from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';


export const updateUserController = async (req, res, next) => {
    const { fullname, email, password } = req.body;
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (password) {
            user.password = password;
            await user.save();
        }
        const token = user.generateAuthToken();
        res.status(200).json({ user, token });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to handle getting user details
export const getUserController = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to handle creating a new user
export const postUserController = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Controller to handle forgot password functionality
export const forgotPasswordController = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'baryowork@gmail.com',
                pass: 'gsuy xpju ijoe lvuw',
            }
        });

        const mailOptions = {
            from: 'ProjMgmt@gmail.com',
            to: email,
            subject: 'FORGOT PASSWORD',
            text: `It seems like you've forgotten your password, but don't worry, we're here to assist you. Please provide your email address below, and we'll send you detailed instructions on how to reset your password securely.\n\nTo reset your password, please click the link below. You'll receive further instructions via email. Thank you.\n\nIf you did not send this request to change your password, please disregard this message and ensure your account security by contacting our support team immediately.\n\nhttp://localhost:3000/reset-password/${user._id}/${token}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending reset email:', error);
                return res.status(500).json({ message: 'Error sending reset email' });
            } else {
                console.log('Reset email sent:', info.response);
                return res.status(200).json({ message: 'Reset email sent successfully' });
            }
        });
    } catch (error) {
        console.error('Error generating reset token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to handle resetting password
export const resetpassController = async (req, res, next) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const decoded = await JWT.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
