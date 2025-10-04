const express = require('express');
const router = express.Router();
const { 
    submitExpense,
    approveExpense,
    rejectExpense
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');
const { checkRole } = require('../middleware/roleCheck');
const upload = require('../middleware/upload');

router.post('/submit', protect, checkRole('Employee'), upload, submitExpense);
router.post('/approve/:id', protect, checkRole('Manager', 'Admin'), approveExpense);
router.post('/reject/:id', protect, checkRole('Manager', 'Admin'), rejectExpense);


module.exports = router;