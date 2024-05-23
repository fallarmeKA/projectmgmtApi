// protectedRoutes.js

const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const { authorizeUser } = require('../middleware/auth');

const router = express.Router();

// Protected route accessible only to admins
router.get('/admin-route', authenticateUser, authorizeUser, (req, res) => {
    // Route logic for admin-only access
});

module.exports = router;
