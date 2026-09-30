const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

router.post('/', submitContact); // public - anyone can submit the contact form

module.exports = router;