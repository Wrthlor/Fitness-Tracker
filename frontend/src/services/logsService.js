import axios from 'axios';

let baseUrl = 'http://localhost:3001';
if (process.env.NODE_ENV === 'production') 
    baseUrl = process.env.REACT_APP_HOST;

    
let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
}

// Logs functions 
const getLogs = async () => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.get(`${baseUrl}/logs`, config);
    return res.data;
}

const createLog = async newLog => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(`${baseUrl}/logs`, newLog, config);
    return res.data;
}

const deleteLog = async log_id => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.delete(`${baseUrl}/logs/${log_id}`, config);
    return res.data;
}

// Workouts functions
const getWorkouts = async () => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.get(`${baseUrl}/workouts`, config);
    return res.data;
}

const saveWorkout = async (log_id, newWorkout) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = await axios.post(`${baseUrl}/workouts/log/${log_id}`, newWorkout, config);
    return res.data;
}

const deleteWorkout = async (workout_id) => {
    const config = {
        headers: { Authorization: token }
    }

    const res = axios.delete(`${baseUrl}/workouts/${workout_id}`, config);
    return res.data;
}

// Exercise functions
const getExercises = async () => {
    const res = await axios.get(`${baseUrl}/exercises`);
    return res.data;
}

const getCategories = async () => {
    const res = await axios.get(`${baseUrl}/categories`);
    return res.data;
}

const logsService = {
    getLogs,
    createLog,
    deleteLog,
    getWorkouts,
    saveWorkout,
    deleteWorkout,
    getExercises,
    getCategories,
    setToken
}

export default logsService;