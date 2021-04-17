import axios from 'axios';
// const baseUrl = 'https://fitness-tracker-124-backend.herokuapp.com';
const baseUrl = 'http://localhost:3001'

const getExercises = () => {
    const req = axios.get(`${baseUrl}/exercises`);
    return req.then(res => res.data);
}

const getCategories = () => {
    const req = axios.get(`${baseUrl}/categories`);
    return req.then(res => res.data);
}

const exercises = {
    getExercises,
    getCategories
}

export default exercises;