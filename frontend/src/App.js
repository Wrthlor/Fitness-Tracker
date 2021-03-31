import React, { useState } from 'react';

import DatePicker from 'react-date-picker';
import Logs from './components/Logs';

import sampleData from './sampleData/data';

const App = () => {
    const [workouts, setWorkouts] = useState(sampleData.sampleWorkouts);
    const [newWorkout, setNewWorkout] = useState({ lift: 'Exercises', weight: '', reps: '' });
    
    const [date, setDate] = useState(new Date());
    const [logs, setLogs ] = useState(sampleData.sampleLogs);

    // Formats date
    let formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric' });

    // Placeholder function for RNG workout_id's
    const newId = () => {
        const rng = Math.floor(Math.random() * 1000000);
        if (workouts.map((workout) => workout.workout_id).includes(rng)) 
            return newId();
        else 
            return rng;
    };

    // Saves weight/reps when save button pressed
    const handleSave = (event) => {
        event.preventDefault();
        const workoutObject = {
            logs_id: getLogId(logs, formattedDate),
            workout_id: newId(),
            ...newWorkout,
        };
        setWorkouts(workouts.concat(workoutObject));
        setNewWorkout({
            lift: newWorkout.lift, 
            weight: '', 
            reps: '',
            logs_id: newWorkout.logs_id
        });
    };

    // Deletes selected workout
    const handleDelete = (event) => {
        event.preventDefault();
        const id = Number(event.target.id);

        const deleteById = (arr, id) => {
            return arr.filter(workout => workout.workout_id !== id);
        }

        setWorkouts(
            deleteById(workouts, id)
        );
    };
    
    // Returns log id
    const getLogId = (logs, date) => {
        const log = logs.find(log => log.date === date);
        if (log !== undefined)
            return log.id;
        return "";
    };

    // Check if there's an existing log for date
    const checkExistingLog = (logs, date) => {
        return logs.map(log => log.date === date).includes(true);
    };

    // Creates new log if existing log does not exist
    const handleNewLog = () => {
        if (!checkExistingLog(logs, formattedDate)) {
            const logObject = {
                id: newId(),
                date: formattedDate
            };    
            setLogs(logs.concat(logObject));
        }
        else {
            console.log("Log already exists");
        }
    };

    // Creates new workout 
    const handleNewWorkout = (event) => {
        // let target = event.target;
        setNewWorkout({
            ...newWorkout,
            logs_id: getLogId(logs, formattedDate),
            [event.target.name]: event.target.value,
        });
    };

    // Gets an array of workouts that match the current log_id / date
    const getWorkouts = (sampleLogs, workouts) => {
        if (checkExistingLog(sampleLogs, formattedDate)) {
            let log_id = getLogId(sampleLogs, formattedDate);
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
            
            {checkExistingLog(logs, formattedDate) ?
                (
                    <Logs 
                        handleSave={handleSave}
                        newWorkout={newWorkout}
                        handleNewWorkout={handleNewWorkout}
                        loggedWorkouts={getWorkouts(logs, workouts)}
                        deleteButton={handleDelete} 
                    />
                ) :
                (
                    <button onClick={handleNewLog}>
                        Create Workout Log
                    </button>
                )
            }
        </div>
    );
};

export default App;
