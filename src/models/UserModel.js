const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, 'your-secret-key', { expiresIn: '1h' });
    return token;
};

// Verify JWT token
userSchema.statics.verifyAuthToken = function (token) {
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        return decoded;
    } catch (error) {
        return null;
    }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
