require("dotenv").config();             // Enable .env usage 
const mysql = require('mysql');         // Node.js driver for MySQL
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// Connect to "join_us" database 
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.mySQL_Password,
    database: 'fitnessTracker'
})

// Home page
app.get('/', async (req, res) => {
    await res.send('This will be the home page');
})

// Lists all existing exercises
app.get('/exercises', async (req, res) => {
    let q = 'SELECT exercise_name FROM exercises';
    connection.query(q, (error, result) => {
        if (error) throw error;
        let output = [];

        result.forEach(exercise => {
            output.push(exercise.exercise_name);
        })

        res.send(output);
    });
})

// List all existing logs
app.get('/logs', async (req, res) => {
    let q = 'SELECT id, DATE_FORMAT(created_at, "%W, %m/%d/%Y") AS date FROM logs';
    connection.query(q, (error, result) => {
        if (error) throw error;
        let logData = [];

        result.forEach(log => {
            logData.push({
                "id" : log.id,
                "date": log.date
            })
        })

        res.send(logData);
    });
})

// List all workouts and corresponding weight and reps
app.get('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    let q = "SELECT workouts.id AS 'id', exercises.exercise_name AS 'lift', metrics.wgt AS 'weight', metrics.reps AS 'reps' FROM workouts JOIN exercises ON workouts.exercise_id = exercises.id JOIN metrics ON workouts.metrics_id = metrics.id WHERE workouts.logs_id = ?"
    connection.query(q, [log_id], (error, result) => {
        if (error) throw error;
        if (result[0] == undefined ) {
            // console.log("This log does not exist");
            res
                .send("This log does not exist")
                .status(404).end();
        }
        else 
        {
            let output = [];
            result.forEach(workouts => {
                output.push(workouts);
            })
            res.send(output);
        }
    });
})

// List specific workout with corresponding weight and reps
app.get('/logs/:log_id/:workout_id', async (req, res) => {
    const log_id = req.params.log_id;
    const workout_id = req.params.workout_id;
    
    let q = "SELECT exercises.exercise_name AS 'lift', metrics.wgt AS 'weight', metrics.reps AS 'reps' FROM workouts JOIN exercises ON workouts.exercise_id = exercises.id JOIN metrics ON workouts.metrics_id = metrics.id WHERE workouts.logs_id = ? AND workouts.id = ?"
    connection.query(q, [log_id, workout_id], (error, result) => {
        if (error) throw error;

        if (result[0] === undefined ) {
            // console.log("There's no workout at this URL");
            res
                .send("There's no workout at this URL")
                .status(404).end();
        }
        else 
        {
            // console.log(result[0]);
            res.send(result[0])
        }
    })
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})