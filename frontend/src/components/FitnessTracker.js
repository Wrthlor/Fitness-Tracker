import React, { useEffect, useState, useRef } from 'react';

import DatePicker from 'react-date-picker';
import Logs from './Logs';
import LogButton from './LogButton';

import logsService from '../services/logsService';

const FitnessTracker = ({ setUser, setMessage }) => {

    const [workouts, setWorkouts ] = useState([]);
    const [newWorkout, setNewWorkout ] = useState({ 
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

    const [date, setDate ] = useState(new Date());
    const [logs, setLogs ] = useState([]);

    const [deleteStatus, setDeleteStatus ] = useState(false);

    const idRef = useRef();


    // Formats date
    let formattedDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    let mySQL_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

    // Check if there's an existing log for date
    const checkExistingLog = (logs, date) => logs.map(log => log.date === date).includes(true);

    // Logs data
    useEffect(() => {
        logsService
            .getLogs()
            .then(logs => setLogs(logs))
            .catch(error => console.log(error));
    }, []);

    // Workouts data
    useEffect(() => {
        logsService
            .getWorkouts()
            .then(workouts => setWorkouts(workouts))
            .catch(error => console.log(error));
    }, []);

    const validNewWorkout = () => {
        if (newWorkout.lift !== 'Exercises') {
            if (newWorkout.category === 'Cardio')
                if (newWorkout.distance !== '' && newWorkout.mm !== '' && newWorkout.ss !== '')
                    if (newWorkout.distance >= 0 && 
                        newWorkout.mm >= 0 && newWorkout.mm <= 59 && 
                        newWorkout.ss >= 0 && newWorkout.ss <= 59) 
                        return true;
                        
            if (newWorkout.category !== 'Cardio') 
                if (newWorkout.weight !== '' && newWorkout.reps !== '')
                    if (newWorkout.weight >= 0 && newWorkout.reps >= 0 )
                        return true;
        }
        return false;
    }

    // Returns log id
    const getLogId = (logs, date) => {
        const log = logs.find(log => log.date === date);
        if (log !== undefined)
            return log.id;
        return "";
    };

    // Manages button click events
    const handleClick = async (event) => {
        event.preventDefault();

        switch (event.target.name) {
            case 'createLog':
                if (!checkExistingLog(logs, formattedDate)) {     
                    let logObject = {
                        date: mySQL_date
                    }
                    
                    logsService
                        .createLog(logObject)
                        .then(newLog => {
                            logObject = {
                                id: newLog.id,
                                date: formattedDate
                            }
                            setLogs(logs.concat(logObject));
                        })
                        .catch(error => {
                            console.log(error);
                            
                            window.localStorage.removeItem('loggedUser');
                            setUser(null);

                            setMessage({
                                message: 'Your session has expired. Please log in',
                                type: "expired"
                            });
                            const id = setTimeout(() => {
                                setMessage({
                                    message: '',
                                    type: ''
                                });
                            }, 5000);
                            idRef.current = id;
                        });
                }
                break;

            // Triggers confirmation response
            case 'deleteLog': 
                setDeleteStatus(true);
                break;

            // Deletes log depending on confirmation response
            case 'confirmDelete':
                if (event.target.value === 'yes') {
                    const log_id = getLogId(logs, formattedDate);
                    logsService
                        .deleteLog(log_id)
                        .then(() => {
                            setLogs(logs.filter(log => log.id !== log_id));
                        })
                        .catch(error => {
                            console.log(error);
                            
                            window.localStorage.removeItem('loggedUser');
                            setUser(null);

                            setMessage({
                                message: 'Your session has expired. Please log in',
                                type: "expired"
                            });
                            const id = setTimeout(() => {
                                setMessage({
                                    message: '',
                                    type: ''
                                });
                            }, 5000);
                            idRef.current = id;
                        });
                }
                setDeleteStatus(false);
                break;

            // Deletes individual set
            case 'deleteSet':
                const id = Number(event.target.id);
                const deleteById = (arr, id) => {
                    return arr.filter(workout => workout.workout_id !== id);
                }
                logsService
                    .deleteWorkout(id)
                    .then(() => {
                        setWorkouts(
                            deleteById(workouts, id)
                        );
                    })
                    .catch(error => {
                        console.log(error);
                            
                        window.localStorage.removeItem('loggedUser');
                        setUser(null);

                        setMessage({
                            message: 'Your session has expired. Please log in',
                            type: "expired"
                        });
                        const id = setTimeout(() => {
                            setMessage({
                                message: '',
                                type: ''
                            });
                        }, 5000);
                        idRef.current = id;
                    });
                break;
            
            default:
                // Do nothing
                break;
        }
    }

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
        
        if (validNewWorkout() === true) {
            logsService
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
                        log_id: newWorkout.log_id
                    })
                })
                .catch(error => {
                    console.log(error);
                            
                    window.localStorage.removeItem('loggedUser');
                    setUser(null);

                    setMessage({
                        message: 'Your session has expired. Please log in',
                        type: "expired"
                    });
                    const id = setTimeout(() => {
                        setMessage({
                            message: '',
                            type: ''
                        });
                    }, 5000);
                    idRef.current = id;
                });
        }
    };

    const cardioUnits = ['distance', 'hh', 'mm', 'ss'];
    const nonCardioUnits = ['weight', 'reps'];

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
                log_id: getLogId(logs, formattedDate)
            })
        }
        else {
            if (nonCardioUnits.includes(event.target.name)) {
                if (event.target.value >= 0) {
                    setNewWorkout({
                        ...newWorkout,
                        log_id: getLogId(logs, formattedDate),
                        [event.target.name]: event.target.value,
                    });
                }
            }
            else if (cardioUnits.includes(event.target.name)) {
                if (event.target.name === 'mm' || event.target.name === 'ss') {
                    if (event.target.value >= 0  && event.target.value <= 59) {
                        setNewWorkout({
                            ...newWorkout,
                            log_id: getLogId(logs, formattedDate),
                            [event.target.name]: event.target.value,
                        });
                    } 
                }
                else if (event.target.name === 'hh') {
                    if (event.target.value >= 0 && event.target.value <= 99) {
                        setNewWorkout({
                            ...newWorkout,
                            log_id: getLogId(logs, formattedDate),
                            [event.target.name]: event.target.value,
                        });
                    }
                }
                else {
                    if (event.target.value >= 0) {
                        setNewWorkout({
                            ...newWorkout,
                            log_id: getLogId(logs, formattedDate),
                            [event.target.name]: event.target.value,
                        });
                    }
                }
            }
            else {
                setNewWorkout({
                    ...newWorkout,
                    log_id: getLogId(logs, formattedDate),
                    [event.target.name]: event.target.value,
                });
            }
        }
    };

    // Gets an array of workouts that match the current log_id / date
    const getWorkouts = (log, workouts) => {
        if (checkExistingLog(log, formattedDate)) {
            let log_id = getLogId(log, formattedDate);
            if (log_id !== undefined) {
                return workouts.filter(workout => workout.log_id === log_id);
            }
        }
        return [];
    };

    // Clear timeoutId
    useEffect(() => {
        const timeoutId = idRef.current;
        return () => {
            clearTimeout(timeoutId);
        };
    });

    return (
        <div id='fitness-tracker'>
            <DatePicker 
                className='date-picker'
                calendarClassName='calendar-date-picker'
                calendarType="US"
                onChange={setDate}
                value={date} 
                clearIcon={null} 
                showLeadingZeros={true} />

            <LogButton 
                handleClick={handleClick}
                logStatus={checkExistingLog(logs, formattedDate)}
                deleteStatus={deleteStatus} />

            {!deleteStatus 
                && checkExistingLog(logs, formattedDate)
                && (
                    <Logs  
                        handleSave={handleSave}
                        newWorkout={newWorkout}
                        handleNewWorkout={handleNewWorkout}
                        loggedWorkouts={getWorkouts(logs, workouts)}
                        deleteButton={handleClick}
                        validSubmission={validNewWorkout} /> )
            }
        </div>
    );
};

export default FitnessTracker;