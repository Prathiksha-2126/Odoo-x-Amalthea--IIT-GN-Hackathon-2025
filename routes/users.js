const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');

router.post('/create', protect, checkRole('Admin'), createUser);

module.exports = router;