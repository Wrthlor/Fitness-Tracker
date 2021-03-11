require("dotenv").config();             // Enable .env usage 
const mysql = require('mysql');         // Node.js driver for MySQL
const express = require('express');     
const app = express();

// Connect to "join_us" database 
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.mySQL_Password,
    database: 'fitnessTracker'
})

// Home page
app.get('/', async (req, res) => {
    await res.send(sqlFake)
    //await res.send('This will be the home page');
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})