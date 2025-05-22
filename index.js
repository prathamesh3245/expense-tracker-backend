const express = require("express");
const mongoose = require('mongoose');
const authRoutes = require("../server/routes/authRoutes");
const expenseRoutes = require("../server/routes/expenseRoutes");
const cors = require("cors")

const app = express();


app.use(express.json());


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


mongoose.connect("mongodb+srv://shelkeprathmesh587:be4P1SS0otCD5VqH@cluster0.ub8ui.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0")
    .then( () => console.log("Mongodb connected"))
        .catch( () => console.error("MongoDB failed to connect", err));

    
// app.options("*", cors());

app.use('/api/auth',authRoutes);

app.use('/api/expenses', expenseRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port no: ${PORT}`);
});
