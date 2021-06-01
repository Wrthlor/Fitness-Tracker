const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const usersRouter = require('express').Router();
const mySQL_URI = require('../utils/config').mySQL_URI;

let connection = mysql.createConnection(mySQL_URI);

// Grabs list of users
usersRouter.get('/users', async (req, res, next) => {
    let sql = 'SELECT id, person_name AS name, username FROM users';
    connection.query(sql, (error, result) => {
        if (error) next(error);
        let output = [];
        result.forEach(user => {
            output.push(user); 
        });
        res.send(output);
    })
})

// Creates new user 
usersRouter.post('/users', async (req, res, next) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = {
        name : body.name,
        username: body.username,
        passwordHash
    };

    let sql = `INSERT INTO users (
                person_name,
                username,
                passhash
            )
            VALUES (
                ?,
                ?,
                ?
            )`;
    connection.query(sql, [user.name, user.username, user.passwordHash], (error) => {
        if (error) throw error;
        res.status(201).json(user);
    })
})

// Logins to user
usersRouter.post('/login', async (req, res, next) => {
    const body = req.body;

    let sql = `SELECT 
            id, 
            person_name AS name, 
            username, 
            passhash
        FROM users 
        WHERE username = ?`;
    connection.query(sql, [body.username], async (error, result) => {
        if (error) next(error);

        let user = null;
        if (result.length === 1) {
            user = {
                id: result[0].id,
                name: result[0].name,
                username: result[0].username
            }
        }

        const correctPassword = (user === null)
            ? false
            : await bcrypt.compare(body.password, result[0].passhash);
        
        if (!(user && correctPassword)) {
            return res.status(401).json({
                error: "Invalid username or password"
            });
        }

        const userForToken = {
            id: user.id,
            username: user.username
        };

        const token = jwt.sign(userForToken, process.env.SECRET);

        res
            .status(200)
            .send({ 
                token, 
                username: user.username,
                name: user.name
            })

    })
})

module.exports = usersRouter;