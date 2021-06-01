// const mysql = require('mysql');
const mysql = require('mysql2');
const trackerRouter = require('express').Router();
const mySQL_URI = require('../utils/config').mySQL_URI;

let connection = mysql.createConnection(mySQL_URI);

// HTTP GET request to list all existing exercises
trackerRouter.get('/exercises', async (req, res, next) => {
    let sql = 'SELECT id, exercise_name AS name, categories_id FROM exercises';
    connection.query(sql, (error, result) => {
        if (error) next(error);
        let output = [];
        result.forEach(exercise => {
            output.push(exercise);
        })
        res.send(output);
    });
})

// HTTP GET request to list all existing categories (for exercises)
trackerRouter.get('/categories', async (req, res) => {
    let sql = 'SELECT id, category_name AS name FROM categories ORDER BY id';
    connection.query(sql, (error, result) => {
        if (error) throw error;
        let output = [];
        result.forEach(category => {
            output.push(category);
        })
        res.send(output);
    })
})

// HTTP GET request to list all existing logs
trackerRouter.get('/logs', async (req, res) => {
    let sql = `SELECT 
                id, 
                DATE_FORMAT(created_at, "%c/%e/%Y") AS date 
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

// HTTP GET request to list all existing workouts
trackerRouter.get('/workouts', async (req, res) => {
    let sql = `SELECT                  
                workouts.id AS 'workout_id',                  
                exercises.exercise_name AS 'lift',
                categories.category_name AS 'category',
                metrics.wgt AS 'weight',
                metrics.metric AS 'metric',
                metrics.reps AS 'reps',
                metrics.distance AS 'distance',
                metrics.unit AS 'unit',
                metrics.hour AS 'hh',
                metrics.minute AS 'mm',
                metrics.second AS 'ss',
                workouts.log_id AS 'log_id' 
            FROM workouts              
            JOIN exercises                  
                ON workouts.exercise_id = exercises.id              
            JOIN metrics                  
                ON workouts.id = metrics.workout_id
            JOIN categories
                ON exercises.categories_id = categories.id
            ORDER BY workout_id, log_id;`
    connection.query(sql, (error, result) => {
        if (error) throw error;
        let workoutData = [];
        result.forEach(workout => {
            workoutData.push(workout)
        })
        res.send(workoutData);
    });
})

// HTTP POST request to create a new log
trackerRouter.post('/logs', async (req, res) => {
    const user_id = req.body.user_id;
    const newDate = req.body.date;

    let sql = 'INSERT INTO logs (user_id, created_at) VALUES (?, ?)';
    connection.query(sql, [user_id, newDate], (error, result) => {
        if (error) res.status(400);
        res.status(201).json({ "id" : result.insertId });
    });
})

// HTTP GET request to list all workouts and corresponding weight and reps for specified log (i.e. specified day)
trackerRouter.get('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    let sql = `SELECT 
                workouts.id AS 'workout_id', 
                exercises.exercise_name AS 'lift', 
                categories.category_name AS 'category',
                metrics.wgt AS 'weight', 
                metrics.metric AS 'metric',
                metrics.reps AS 'reps',
                metrics.distance AS 'distance',
                metrics.unit AS 'unit',
                metrics.hour AS 'hh',
                metrics.minute AS 'mm',
                metrics.second AS 'ss',
                workouts.log_id AS 'log_id' 
            FROM workouts 
            JOIN exercises 
                ON workouts.exercise_id = exercises.id 
            JOIN metrics 
                ON workouts.id = metrics.workout_id 
            JOIN categories
                ON exercises.categories_id = categories.id
            WHERE workouts.log_id = ? 
            ORDER BY metrics.created_at, exercise_name`;
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
                metrics.metric AS 'metric',
                metrics.reps AS 'reps',
                metrics.distance AS 'distance',
                metrics.unit AS 'unit',
                metrics.hour AS 'hh',
                metrics.minute AS 'mm',
                metrics.second AS 'ss',
                metrics.id AS 'metrics_id'
            FROM workouts 
            JOIN exercises 
                ON workouts.exercise_id = exercises.id 
            JOIN metrics 
                ON workouts.id = metrics.workout_id 
            WHERE workouts.log_id = ? AND workouts.id = ?`;
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
        'exercise' : req.body.lift,
        'weight' : req.body.weight,
        'metric' : req.body.metric,
        'reps': req.body.reps,
        'distance' : req.body.distance,
        'unit' : req.body.unit,
        'hour' : req.body.hh,
        'minute' : req.body.mm,
        'second' : req.body.ss
    };

    let sql = `INSERT INTO metrics (wgt, reps, distance, unit, hour, minute, second) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(sql, [workout.weight, workout.reps, workout.distance, workout.unit, workout.hour, workout.minute, workout.second], (error, result) => {
        if (error) throw error;
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

// HTTP DELETE request to delete log (and corresponding workouts, metrics)
trackerRouter.delete('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    sql = `DELETE FROM logs WHERE id = ?`;
    connection.query(sql, [log_id], (error) => {
        if (error) throw error;
        res.status(200).json({ "Message" : "Log deleted" });
    })
})

// HTTP DELETE request to delete specified workout with corresponding weight and reps (specified set)
trackerRouter.delete('/logs/:log_id/:workout_id', async (req, res) => {
    const workout_id = req.params.workout_id;
    
    let sql = `DELETE FROM workouts WHERE id = ?`;
    connection.query(sql, [workout_id], (error) => {
        if (error) throw error;
        res.status(200).json({ "Message" : "Workout deleted" });
    })
})

module.exports = trackerRouter;