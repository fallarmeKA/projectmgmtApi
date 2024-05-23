const express = require('express');
const authRoutes = require('./authRoutes');
const protectedRoutes = require('./protectedRoutes');

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/protected', protectedRoutes);

module.exports = router;
