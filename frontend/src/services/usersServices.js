import axios from 'axios';

let baseUrl = 'http://localhost:3001';
if (process.env.NODE_ENV === 'production') 
    baseUrl = process.env.REACT_APP_HOST;

    
// Gets list of users
const getUsers = async () => {
    const res = await axios.get(`${baseUrl}/users`);
    return res.data;
}

// Create user
const createUser = async newUser => {
    const res = await axios.post(`${baseUrl}/users`, newUser);
    return res.data;
}

// Login into user
const login = async credentials => {
    const res = await axios.post(`${baseUrl}/login`, credentials);
    return res.data;
}

const usersServices = {
    getUsers,
    createUser,
    login
}

export default usersServices;