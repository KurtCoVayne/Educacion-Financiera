const mongoose = require('mongoose');
const { Schema } = mongoose;
const DebtSchema = new Schema({
    userId: { type: String, unique: true },
    amount: { type: Number },
    dues: { type: Number },
    payedAmount: { type: Number, default: 0 },
    interest: {type: Number, default: 0.05, max: 0.7, min: 0.01},
    totalAmount: { type: Number },
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Debt', DebtSchema);