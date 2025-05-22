const { default: mongoose } = require("mongoose");
const { Expense } = require("../models/Expense");

const addExpense = async (req, res) => {

    const title = req.body.title;
    const amount = req.body.amount;
    const category = req.body.category;
    const date = req.body.date;
    const userId = req.user.id;


    await Expense.create({
        title: title,
        amount: amount,
        category: category,
        date: date,
        userId: userId
    });

    return res.status(201).json({success: true, message: "Expense added successfully!"});
}

const getExpenses = async (req, res) => {

    const userId = req.user.id;

    const expenses = await Expense.find({userId});

    

    res.json({
        success: true,
        expenses
    });
}


const getTotalExpense = async (req, res) => {

    const userId = req.user.id;

    const total = await Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {  $group: { _id: null, totalAmount: {  $sum: "$amount"} } }
    ]);
    res.json({success: true, total: total[0]?.totalAmount || 0});
};

const getCategoryWise = async (req, res) => {

    const userId = req.user.id;

    const data = await  Expense.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);

    res.json({success: true, categorical: data });
};

const getMonthlyTrend = async (req, res) => {

    const userId = req.user.id;

    const data = await Expense.aggregate([

        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: { $month: "$date" }, 
                    total: { $sum: "$amount" } } },
                
        { $sort: { "_id": 1 }}
    ]);

    res.json({success: true, monthly: data });
};


module.exports = { addExpense, getExpenses, getTotalExpense, getCategoryWise, getMonthlyTrend };
