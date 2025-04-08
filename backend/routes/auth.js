const express = require('express');
const router = express.Router();

const authController = require('../controllers/authControllers');
const authMiddleware = require('../middleware/auth');

// Register a new user
router.post('/register', authController.register);

// Login user
router.post('/login', authController.login);

// Get current user
router.get('/me', authMiddleware, authController.getMe);

// Logout user
router.get('/logout', authMiddleware, authController.logout);

module.exports = router;