import React, { useEffect, useState } from 'react';

import DatePicker from 'react-date-picker';
import Logs from './components/Logs';

import logData from './services/logs';

const App = () => {
    const [workouts, setWorkouts] = useState([]);
    const [newWorkout, setNewWorkout] = useState({ lift: 'Exercises', weight: '', reps: '' });
    
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
    const handleSave = (event) => {
        event.preventDefault();
        let workoutObject = {
            ...newWorkout
        };
        if (newWorkout.lift !== 'Exercises')
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
                    weight: '', 
                    reps: '',
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
            const message = `Deleting log will remove all existing sets.\nAre you sure you want to delete?`;         
            if (window.confirm(message)) {
                const log_id = getLogId(logs, formattedDate);
                logData
                    .deleteLog(log_id)
                    .then(() => {
                        setLogs(logs.filter(log => log.id !== log_id))
                        console.log(`Log ${log_id} deleted`);
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
                    console.log(`Workout id: ${id} deleted`)
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
        setNewWorkout({
            ...newWorkout,
            logs_id: getLogId(logs, formattedDate),
            [event.target.name]: event.target.value,
        });
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
        <div>
            <DatePicker 
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
