const express = require('express')
const { register, login } = require("../controllers/authController")


const app = express.Router();

app.post('/register', register);

app.post('/login', login);

module.exports = app;