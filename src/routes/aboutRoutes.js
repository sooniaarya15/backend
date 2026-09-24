const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAbout);          // public - frontend reads this
router.put('/', protect, updateAbout); // admin only - CMS writes this

module.exports = router;