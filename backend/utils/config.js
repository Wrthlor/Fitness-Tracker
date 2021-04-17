require('dotenv').config();

const PORT = process.env.PORT || 3001;

const mySQL_URI = process.env.NODE_ENV === 'development' 
    ? process.env.localhost_URI
    : process.env.JAWSDB_URL;

module.exports = {
    mySQL_URI, 
    PORT
}