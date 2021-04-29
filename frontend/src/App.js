import React, { useEffect, useState } from 'react';

import DatePicker from 'react-date-picker';
import Logs from './components/Logs';

import logData from './services/logs';

const App = () => {
    const [workouts, setWorkouts] = useState([]);
    const [newWorkout, setNewWorkout] = useState({ 
        lift: 'Exercises', 
        category: 'Categories',
        weight: '', 
        metric: false,
        reps: '',
        distance: '',
        unit: 'Meters',
        hh: '',
        mm: '',
        ss: ''
    });
    
    const [date, setDate] = useState(new Date());
    const [logs, setLogs ] = useState([]);

    // Formats date
    let formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    let mySQL_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

    // Logs data
    useEffect(() => {
        logData
            .getLogs()
            .then(logs => setLogs(logs))
            .catch(error => console.log(error));
    }, [])

    // Workouts data
    useEffect(() => {
        logData
            .getWorkouts()
            .then(workouts => setWorkouts(workouts))
            .catch(error => console.log(error));
    }, [])

    // Placeholder function for RNG workout_id's
    // const newId = () => {
    //     const rng = Math.floor(Math.random() * 1000000);
    //     if (workouts.map((workout) => workout.workout_id).includes(rng)) 
    //         return newId();
    //     else 
    //         return rng;
    // };

    // Saves weight/reps when save button pressed
    // Zeroes out "unnecessary information"
    const handleSave = (event) => {
        event.preventDefault();
        let workoutObject = {
            ...newWorkout
        };

        if (newWorkout.category === 'Cardio') {
            if (newWorkout.hh === '') {
                workoutObject = {
                    ...workoutObject,
                    hh: 0
                }
            }
            workoutObject = {
                ...workoutObject,
                weight : 0.0,
                reps : 0,
                distance : Number(workoutObject.distance),
                hh : Number(workoutObject.hh),
                mm : Number(workoutObject.mm),
                ss : Number(workoutObject.ss)
            }
        }
        else {
            workoutObject = {
                ...workoutObject,
                distance : 0.0,
                hh : 0,
                mm : 0,
                ss : 0
            }
        }

        if (newWorkout.lift !== 'Exercises' )
            logData
                .saveWorkout(getLogId(logs, formattedDate), workoutObject)
                .then(savedWorkout => {
                    workoutObject = {
                        workout_id: savedWorkout.workout_id,
                        ...workoutObject
                    }
                    setWorkouts(workouts.concat(workoutObject));
                    setNewWorkout({
                        lift: 'Exercises', 
                        category: 'Categories',
                        weight: '', 
                        metric: false,
                        reps: '',
                        distance: '',
                        unit: 'Meters',
                        hh: '',
                        mm: '',
                        ss: '',
                        logs_id: newWorkout.logs_id
                    })
                })
                .catch(error => console.log(error));
    };

    // Deletes selected workout
    const handleDelete = (event) => {
        event.preventDefault();

        // Deleting logs - identifier: attribute name = 'Log'
        if (event.target.name === 'Log') {
            if (event.target.value === 'yes') {
                const log_id = getLogId(logs, formattedDate);
                logData
                    .deleteLog(log_id)
                    .then(() => {
                        setLogs(logs.filter(log => log.id !== log_id));
                    })
                    .catch(error => console.log(error));
            }
        }

        // Deleting workouts/set - identifier: attribute name = 'Set'
        if (event.target.name === 'Set') {            
            const id = Number(event.target.id);
            const deleteById = (arr, id) => {
                return arr.filter(workout => workout.workout_id !== id);
            }
            logData
                .deleteWorkout(getLogId(logs, formattedDate), id)
                .then(() => {
                    setWorkouts(
                        deleteById(workouts, id)
                    );
                })
                .catch(error => console.log(error));
        }
    };
    
    // Returns log id
    const getLogId = (logs, date) => {
        const log = logs.find(log => log.date === date);
        if (log !== undefined)
            return log.id;
        return "";
    };

    // Check if there's an existing log for date
    const checkExistingLog = (logs, date) => logs.map(log => log.date === date).includes(true);

    // Creates new log if existing log does not exist
    const handleNewLog = () => {
        if (!checkExistingLog(logs, formattedDate)) {     
            let logObject = {
                date: mySQL_date
            }
            
            logData
                .createLog(logObject)
                .then(newLog => {
                    logObject = {
                        id: newLog.id,
                        date: formattedDate
                    }
                    setLogs(logs.concat(logObject));
                })
                .catch(error => console.log(error));
        }
        else {
            console.log("Log already exists");
        }
    };

    // Creates new workout 
    const handleNewWorkout = (event) => {
        event.preventDefault();

        // Changing categories reset exercise and metrics
        if (event.target.name === 'category') {
            setNewWorkout({
                lift: 'Exercises', 
                [event.target.name]: event.target.value,
                weight: '', 
                metric: false,
                reps: '',
                distance: '',
                unit: 'Meters',
                hh: '',
                mm: '',
                ss: '',                
                logs_id: getLogId(logs, formattedDate)
            })
        }
        else {
            setNewWorkout({
                ...newWorkout,
                logs_id: getLogId(logs, formattedDate),
                [event.target.name]: event.target.value,
            });
        }
    };

    // Gets an array of workouts that match the current log_id / date
    const getWorkouts = (log, workouts) => {
        if (checkExistingLog(log, formattedDate)) {
            let log_id = getLogId(log, formattedDate);
            if (log_id !== undefined) {
                return workouts.filter(workout => workout.logs_id === log_id);
            }
        }
        return [];
    };

    return (
        <div className='center'>
            <DatePicker 
                className='date-picker'
                calendarClassName='calendar-date-picker'
                onChange={setDate}
                value={date} 
                clearIcon={null} 
                showLeadingZeros={true} 
            />
            <br />            
            {checkExistingLog(logs, formattedDate) 
                ? (
                    <Logs 
                        handleSave={handleSave}
                        newWorkout={newWorkout}
                        handleNewWorkout={handleNewWorkout}
                        loggedWorkouts={getWorkouts(logs, workouts)}
                        deleteButton={handleDelete} /> ) 
                : (
                    <button onClick={handleNewLog}>
                        Create Workout Log
                    </button> )
            }
        </div>
    );
};

export default App;
