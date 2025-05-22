const express = require("express");
const { addExpense, getExpenses } =  require("../controllers/expenseController");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getTotalExpense, getCategoryWise, getMonthlyTrend } = require("../controllers/expenseController");

const app = express.Router();

app.post("/addExpense", authMiddleware, addExpense);

app.get("/getExpenses", authMiddleware, getExpenses);

app.get("/total", authMiddleware, getTotalExpense);

app.get("/category", authMiddleware, getCategoryWise);

app.get("/monthly", authMiddleware, getMonthlyTrend);

module.exports = app;