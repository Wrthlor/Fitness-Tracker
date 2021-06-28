# Fitness-Tracker

Fitness-Tracker is a single-page-application which allows users to record the workouts and exercises done in a log format which corresponds to the date of the user's choosing. 

Link to live Heroku app: [Fitness-Tracker](https://fitness-tracker-124.herokuapp.com/)


<!-- Technologies -->
## Technologies
### Frontend
* [React.js](https://reactjs.org/) for rendering and state management
### Backend 
* [Node.js](https://nodejs.dev/) runtime environment to execute server-side code
* [Express.js](http://expressjs.com/) web framework 
* [MySQL](https://www.mysql.com/) relational database management system


<!-- Getting started -->
## Getting started
How to set up locally
### Prerequisites
* npm
    ```sh
    npm install npm@latest -g
    ```
### Installation
1. Clone the repo
    ```sh
    git clone https://github.com/Wrthlor/Fitness-Tracker.git
    ```
2. Install NPM packages
    ```sh
    cd Fitness-Tracker/frontend
    npm install
    cd ../backend
    npm install
    ```
3. Create and update `frontend/.env` and `backend/.env`
    ```md
    REACT_APP_HOST='ENTER YOUR PRODUCTION SERVER HOST'
    ```

    ```md
    # JawsDB Connection String
    JAWSDB_URL=mysql://Username:Password@Server/Database

    # Localhost Connection String
    localhost_URI=mysql://Username:Password@Server/Database

    PORT=3001

    SECRET='ENTER ANY STRING'
    ```

<!-- Features -->
## Features
### Login and Sign up
![](gifs/sample_logging.gif)
* Users can create an account to sign up or log in with an existing account

### Saving workouts per day and user
![](gifs/sample_signup_login.gif)
* Each log saved is dependent on the date selected
* Creating logs and adding workouts are authenticated via JSON Web Token


<!-- Acknowledgements -->
## Acknowledgements
* [Heroku](https://devcenter.heroku.com/)
* [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
* [Cors](https://github.com/expressjs/cors#readme)
* [Dotenv](https://github.com/motdotla/dotenv#readme)
* [Express-Async-Errors](https://github.com/davidbanham/express-async-errors#readme)
* [JSON Web Token](https://github.com/auth0/node-jsonwebtoken#readme)
* [Node MySQL 2](https://github.com/sidorares/node-mysql2#readme)
* [Sequelize](https://sequelize.org/)
