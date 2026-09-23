const express = require('express');
const router = express.Router();
const { login, refresh } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', login);
router.post('/refresh', protect, refresh);

module.exports = router;