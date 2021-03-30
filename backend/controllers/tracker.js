require('dotenv').config();  
const mysql = require('mysql');
const trackerRouter = require('express').Router();

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.mySQL_Password,
    database: 'fitnessTracker'
})

// Home page
trackerRouter.get('/', async (req, res) => {
    await res.send('This will be the home page');
})

// HTTP GET request to list all existing exercises
trackerRouter.get('/exercises', async (req, res) => {
    let q = 'SELECT exercise_name, categories_id FROM exercises';
    connection.query(q, (error, result) => {
        if (error) throw error;
        let output = [];
        result.forEach(exercise => {
            output.push(exercise);
        })
        res.send(output);
    });
})

// HTTP GET request to list all existing logs
trackerRouter.get('/logs', async (req, res) => {
    let sql = `SELECT 
                id, 
                DATE_FORMAT(created_at, "%W, %c/%e/%Y") AS date 
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
trackerRouter.post('/logs', async (req, res) => {
    let sql = 'INSERT INTO logs (created_at) VALUES (NOW())';
    connection.query(sql, (error, result) => {
        if (error) res.status(400);
        res.status(201).json({ "id" : result.insertId });
    });
})

// HTTP GET request to list all workouts and corresponding weight and reps for specified log (i.e. specified day)
trackerRouter.get('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    let sql = `SELECT 
                workouts.logs_id AS 'logs_id',
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
            ORDER BY exercise_name, metrics.created_at`;    
    connection.query(sql, [log_id], (error, result) => {
        if (error) throw error;
        if (result[0] == undefined ) {
            res
                .send("This log is empty or does not exist")
                .status(404)
                .end();
        }
        else {
            let output = [];
            result.forEach(workouts => {
                output.push(workouts);
            })
            res.send(output);
        }
    });
})

// HTTP GET request to list specific workout with corresponding weight and reps (specified set)
trackerRouter.get('/logs/:log_id/:workout_id', async (req, res) => {
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
            res.send("This workout does not exist").status(404).end();
        }
        else {
            res.send(result[0])
        }
    });
})

// HTTP POST request to create specified workout (specified set) for corresponding log (specified day)
trackerRouter.post('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    let workout = {
        'workout_id' : "",
        'exercise' : req.body.exercise,
        'weight' : req.body.weight,
        'reps': req.body.reps
    };

    let sql = `INSERT INTO metrics (wgt, reps) VALUES (?, ?)`;
    connection.query(sql, [workout.weight, workout.reps], (error, result) => {
        if (error) throw error;
        //console.log(result.insertId);
        let metrics_id = result.insertId;
        sql = `INSERT INTO workouts (
                exercise_id, 
                metrics_id, 
                logs_id
            )
            VALUES (
                (
                    SELECT id
                    FROM exercises
                    WHERE exercise_name = ?
                ),
                ?,
                ?
            )`;
        connection.query(sql, [workout.exercise, metrics_id, log_id], (error, result) => {
            if(error) throw error;
            workout.workout_id = result.insertId;
            res.status(201).json(workout);
        })
    })
})

// HTTP PUT request to modify existing metrics (specified set) for corresponding log (specified day)
trackerRouter.put('/logs/:log_id/:workout_id', async (req, res) => {
    const workout_id = req.params.workout_id;

    let workout = {
        'weight' : req.body.weight,
        'reps': req.body.reps
    };

    let sql = `UPDATE metrics 
            SET 
                wgt = ?,
                reps = ?
            WHERE id = (
                SELECT metrics_id
                FROM workouts
                WHERE id = ?
            )`;
    connection.query(sql, [workout.weight, workout.reps, workout_id], (error, result) => {
        if (error) throw error;
        console.log(result)
        res.status(200).json(workout);
    })
})

// HTTP DELETE request to delete log (and corresponding workouts, metrics)
trackerRouter.delete('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    // Delete workouts and metrics related to corresponding log
    let sql = `DELETE workouts, metrics
            FROM workouts
            INNER JOIN metrics
                ON workouts.metrics_id = metrics.id
            WHERE workouts.logs_id = ?`;
    connection.query(sql, [log_id], (error) => {
        if (error) throw error;

        // Delete (now emptied) log
        sql = `DELETE FROM logs WHERE id = ?`;
        connection.query(sql, [log_id], (error) => {
            if (error) throw error;
            res.status(200).json({ "Message" : "Log deleted" });
        })
    })
})

// HTTP DELETE request to delete specified workout with corresponding weight and reps (specified set)
trackerRouter.delete('/logs/:log_id/:workout_id', async (req, res) => {
    const workout_id = req.params.workout_id;
    
    // Delete metrics row, which deletes corresponding workout row (ON CASCADE DELETE constraint)
    let sql = `DELETE FROM metrics 
            WHERE id = (
                SELECT metrics_id 
                FROM workouts 
                WHERE id = ?
            )`;
    connection.query(sql, [workout_id], (error) => {
        if (error) throw error;
        res.status(200).json({ "Message" : "Workout deleted" });
    })
})

module.exports = trackerRouter;