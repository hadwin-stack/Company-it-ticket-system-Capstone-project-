const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register); // Matches: POST /api/auth/register
router.post('/login', authController.login);       // Matches: POST /api/auth/login
module.exports = router;


