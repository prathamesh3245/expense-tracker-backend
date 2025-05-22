const mongoose = require("mongoose")

const ExpenseSchema = new mongoose.Schema({

    title: {type: String, required: true},
    amount: {type: Number, required: true},
    category: {type: String},
    date: {type: Date, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId , ref: 'User', required: true}
});

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = { Expense }
