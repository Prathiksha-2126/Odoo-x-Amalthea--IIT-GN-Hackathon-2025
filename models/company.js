const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    defaultCurrency: {
        type: String,
        required: true,
        uppercase: true,
        trim: true
    },
    approvalRules: {
        type: {
            type: String,
            enum: ['Percentage', 'Specific', 'Hybrid', 'Sequential'],
            default: 'Sequential'
        },
        percentage: { // For 'Percentage' rule
            type: Number,
            min: 1,
            max: 100
        },
        specificApprover: { // For 'Specific' rule
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        sequentialApprovers: [{ // For 'Sequential' flow
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
        }]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);