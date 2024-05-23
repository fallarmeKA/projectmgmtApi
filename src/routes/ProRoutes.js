// protectedRoutes.js

const express = require('express');
const { authenticateUser } = require('../middleware/authMiddleware.js');
const { authorizeUser } = require('../middleware/authMiddleware.js'); 

const router = express.Router();

// Protected route accessible only to admins
router.get('/admin-route', authenticateUser, authorizeUser, (req, res) => {
    // Route logic for admin-only access
});

module.exports = router;
