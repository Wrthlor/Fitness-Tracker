const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const trackerRouter = require('express').Router();
const mySQL_URI = require('../utils/config').mySQL_URI;

let connection = mysql.createConnection(mySQL_URI);

const getTokenFrom = req => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7);
    }
    return null;
}

// HTTP GET request to list all existing exercises
// getExercises()
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
// getCategories()
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
// getLogs()
trackerRouter.get('/logs', async (req, res) => {

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user_id = await decodedToken.id;
    
    let sql = `SELECT 
                id, 
                DATE_FORMAT(created_at, "%c/%e/%Y") AS date 
            FROM logs
            WHERE user_id = ? `;
    connection.query(sql, [user_id], (error, result) => {
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
// createLog(newLog)
trackerRouter.post('/logs', async (req, res) => { 
    const newDate = req.body.date;

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user_id = await decodedToken.id;

    let sql = 'INSERT INTO logs (user_id, created_at) VALUES (?, ?)';
    connection.query(sql, [user_id, newDate], (error, result) => {
        if (error) res.status(400);
        res.status(201).json({ "id" : result.insertId });
    });
})

// HTTP DELETE request to delete log (and corresponding workouts, metrics)
// deleteLog(log_id)
trackerRouter.delete('/logs/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    sql = `DELETE FROM logs WHERE id = ?`;
    connection.query(sql, [log_id], (error) => {
        if (error) throw error;
        res.status(200).json({ "Message" : "Log deleted" });
    })
})


// HTTP GET request to list all existing workouts
// getWorkouts()
trackerRouter.get('/workouts', async (req, res) => {
    
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user_id = await decodedToken.id;
    
    let sql = `SELECT 
                workouts.log_id AS 'log_id', 
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
                metrics.second AS 'ss'
            FROM workouts 
            JOIN exercises 
                ON workouts.exercise_id = exercises.id 
            JOIN metrics 
                ON workouts.id = metrics.workout_id 
            JOIN categories
                ON exercises.categories_id = categories.id
            JOIN logs
                ON workouts.log_id = logs.id
            WHERE logs.user_id = ?
            ORDER BY workout_id, log_id`
    connection.query(sql, [user_id], (error, result) => {
        if (error) throw error;
        if (result[0] == undefined ) {
            res
                .send([])
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

// HTTP POST request to create specified workout (specified set) for corresponding log (specified day)
// saveWorkout(log_id, newWorkout)
trackerRouter.post('/workouts/log/:log_id', async (req, res) => {
    const log_id = req.params.log_id;

    const token = getTokenFrom(req);

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

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

    let sql = `INSERT INTO workouts (
                exercise_id, 
                log_id
            )
            VALUES (
                (
                    SELECT id
                    FROM exercises
                    WHERE exercise_name = ?
                ),
                ?
            )`;
    connection.query(sql, [workout.exercise, log_id], (error, result) => {
        if (error) throw error;
        let workout_id = result.insertId;
        sql = `INSERT INTO metrics (
                wgt, 
                reps, 
                distance, 
                unit, 
                hour, 
                minute, 
                second,
                workout_id 
            ) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        connection.query(sql, [workout.weight, workout.reps, workout.distance, workout.unit, workout.hour, workout.minute, workout.second, workout_id], (error, result) => {
            if(error) throw error;
            workout.workout_id = result.insertId;
            res.status(201).json(workout);
        })
    })
})

// HTTP DELETE request to delete specified workout with corresponding weight and reps (specified set)
// deleteWorkout(log_id, workout_id)
trackerRouter.delete('/workouts/:workout_id', async (req, res) => {
    const workout_id = req.params.workout_id;
    
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    let sql = `DELETE FROM workouts WHERE id = ?`;
    connection.query(sql, [workout_id], (error) => {
        if (error) throw error;
        res.status(200).json({ "Message" : "Workout deleted" });
    })
})

module.exports = trackerRouter;