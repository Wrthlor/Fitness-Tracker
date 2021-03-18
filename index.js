require("dotenv").config();             // Enable .env usage 
const mysql = require('mysql');         // Node.js driver for MySQL
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

// HTTP GET request to list all existing exercises
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

// HTTP GET request to list all existing logs
app.get('/logs', async (req, res) => {
    let sql = `SELECT 
                id, 
                DATE_FORMAT(created_at, "%W, %m/%d/%Y") AS date 
            FROM logs`;
    connection.query(sql, (error, result) => {
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

// HTTP POST request to create a new log
app.post('/logs', async (req, res) => {
    let sql = 'INSERT INTO logs (created_at) VALUES (NOW())';
    connection.query(sql, (error, result) => {
        if (error) res.status(400);
        res.status(201).json({ "id" : result.insertId });
    });
})

// HTTP GET request to list all workouts and corresponding weight and reps for specified log (i.e. specified day)
app.get('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    let sql = `SELECT 
                workouts.id AS 'workout_id', 
                exercises.exercise_name AS 'lift', 
                metrics.wgt AS 'weight', 
                metrics.reps AS 'reps' 
            FROM workouts 
            JOIN exercises 
                ON workouts.exercise_id = exercises.id 
            JOIN metrics 
                ON workouts.metrics_id = metrics.id 
            WHERE workouts.logs_id = ? 
            ORDER BY exercises.id`;
    
    connection.query(sql, [log_id], (error, result) => {
        if (error) throw error;
        if (result[0] == undefined ) {
            res
                .send("This log is empty or does not exist")
                .status(404)
                .end();
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

// HTTP GET request to list specific workout with corresponding weight and reps (specified set)
app.get('/logs/:log_id/:workout_id', async (req, res) => {
    const log_id = req.params.log_id;
    const workout_id = req.params.workout_id;
    
    let sql = `SELECT 
                exercises.exercise_name AS 'lift', 
                metrics.wgt AS 'weight', 
                metrics.reps AS 'reps',                
                metrics.id AS 'metrics_id'
            FROM workouts 
            JOIN exercises 
                ON workouts.exercise_id = exercises.id 
            JOIN metrics 
                ON workouts.metrics_id = metrics.id 
            WHERE workouts.logs_id = ? AND workouts.id = ?`;
    connection.query(sql, [log_id, workout_id], (error, result) => {
        if (error) throw error;

        if (result[0] === undefined ) {
            res
                .send("This workout does not exit")
                .status(404)
                .end();
        }
        else 
        {
            res.send(result[0])
        }
    });
})

// HTTP POST request to create specified workout (specified set) for corresponding log (specified day)
app.post('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    let workout = {
        'workout_id' : "",
        'exercise' : req.body.exercise,
        'weight' : req.body.weight,
        'reps': req.body.reps
    };

    let sql = `INSERT INTO metrics (wgt, reps) VALUES (${workout.weight}, ${workout.reps})`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        //console.log(result.insertId);
        let metrics_id = result.insertId;
        
        sql = `SELECT id FROM exercises WHERE exercise_name LIKE '%${workout.exercise}%'`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            //console.log(result[0].id);
            exercise_id = result[0].id;
            
            sql = `INSERT INTO workouts (exercise_id, metrics_id, logs_id) VALUES (${exercise_id}, ${metrics_id}, ${log_id})`;
            connection.query(sql, (error, result) => {
                if (error) throw error;
                workout.workout_id = result.insertId;
                res.status(201).json(workout);
            })
        })
    })
})

// HTTP PUT request to modify existing metrics (specified set) for corresponding log (specified day)
app.put('/logs/:log_id/:workout_id', async (req, res) => {
    const workout_id = req.params.workout_id;

    let workout = {
        'weight' : req.body.weight,
        'reps': req.body.reps
    };

    let sql = `SELECT metrics_id FROM workouts WHERE id = ${workout_id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        //console.log(result[0].metrics_id)
        let metrics_id = result[0].metrics_id;

        sql = `UPDATE metrics SET wgt = ${workout.weight}, reps = ${workout.reps} WHERE id = ${metrics_id}`;
        connection.query(sql, (error) => {
            if (error) throw error;
            workout.metrics_id = metrics_id;
            res
                .status(200)
                .json(workout);
        })
    })
})

// HTTP DELETE request to delete log (and corresponding workouts, metrics)
app.delete('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    // Delete workouts and metrics related to corresponding log
    let sql = `DELETE workouts, metrics
            FROM workouts
            INNER JOIN metrics
                ON workouts.metrics_id = metrics.id
            WHERE workouts.logs_id = ${log_id}`;
    connection.query(sql, (error) => {
        if (error) throw error;

        // Delete (now emptied) log
        sql = `DELETE FROM logs WHERE id = ${log_id}`;
        connection.query(sql, (error) => {
            if (error) throw error;
            res
                .status(200)
                .json({ "Message" : "Log deleted" });
        })
    })
})

// HTTP DELETE request to delete specified workout with corresponding weight and reps (specified set)
app.delete('/logs/:log_id/:workout_id', async (req, res) => {
    const workout_id = req.params.workout_id;
    
    // Determine metrics_id 
    let sql = `SELECT metrics_id FROM workouts WHERE id = ${workout_id}`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        let metrics_id = result[0].metrics_id;

        // Delete metrics row, which deletes corresponding workout row (ON CASCADE DELETE constraint)
        sql = `DELETE FROM metrics WHERE id = ${metrics_id}`;
        connection.query(sql, (error) => {
            if (error) throw error;
            res
                .status(200)
                .json({ "Message" : "Workout deleted" });
        })
    })
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})