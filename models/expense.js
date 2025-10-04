const mongoose = require('mongoose');

const ApprovalSchema = new mongoose.Schema({
    approver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    comment: String,
    approvedAt: Date
}, { _id: false });


const ExpenseSchema = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        uppercase: true
    },
    amountInCompanyCurrency: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    date: {
        type: Date,
        required: true
    },
    receiptUrl: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Processing'],
        default: 'Pending'
    },
    currentApproverIndex: {
        type: Number,
        default: 0
    },
    approvers: [ApprovalSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Expense', ExpenseSchema);