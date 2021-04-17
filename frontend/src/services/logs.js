import axios from 'axios';
const baseUrl = 'https://fitness-tracker-124-backend.herokuapp.com';
// const baseUrl = 'http://localhost:3001';

// Logs functions 
const getLogs = () => {
    const req = axios.get(`${baseUrl}/logs`);
    return req.then(res => res.data);
}

const createLog = newLog => {
    const req = axios.post(`${baseUrl}/logs`, newLog);
    return req.then(res => res.data);
}

const deleteLog = log_id => {
    const req = axios.delete(`${baseUrl}/logs/${log_id}`);
    return req.then(res => res.data);
}

// Workouts functions
const getWorkouts = () => {
    const req = axios.get(`${baseUrl}/workouts`);
    return req.then(res => res.data);
}

const saveWorkout = (log_id, newWorkout) => {
    const req = axios.post(`${baseUrl}/logs/${log_id}`, newWorkout);
    return req.then(res => res.data);
}

const deleteWorkout = (log_id, workout_id) => {
    const req = axios.delete(`${baseUrl}/logs/${log_id}/${workout_id}`);
    return req.then(res => res.data);
}

const logData = {
    getLogs,
    createLog,
    deleteLog,
    getWorkouts,
    saveWorkout,
    deleteWorkout
}

export default logData;