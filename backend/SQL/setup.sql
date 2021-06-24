-- Create and use database [if database doesn't exist]
-- CREATE DATABASE IF NOT EXISTS fitnessTracker;
-- USE fitnessTracker;

-- -- Each row is for one unique exercise category
-- -- Based off primary muscle mover 
-- -- Ex. Back for "pull up"
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

-- -- Each row is one unique exercise
CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(100) UNIQUE NOT NULL,
    categories_id INT NOT NULL,
    FOREIGN KEY (categories_id) 
        REFERENCES categories(id)
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    person_name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    passhash VARCHAR(72) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Log to represent per day
-- Includes workout per day and association per user 
CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Individual workout contains single exercise done and corresponding reps/set
CREATE TABLE IF NOT EXISTS workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT NOT NULL,
    log_id INT NOT NULL,
    FOREIGN KEY (log_id)
        REFERENCES logs(id)
        ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) 
        REFERENCES exercises(id)
);

-- Each metrics row is one set
-- Ex. 135 lbs at 3 reps
CREATE TABLE IF NOT EXISTS metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wgt DECIMAL(11,2) DEFAULT 0,
    metric BOOLEAN DEFAULT false,
    reps INT NOT NULL,
    distance DECIMAL(11,2) DEFAULT 0,
    unit VARCHAR(11) DEFAULT 'Meters',
    hour INT DEFAULT 0,
    minute INT DEFAULT 0,
    second INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    workout_id INT NOT NULL,
    FOREIGN KEY (workout_id)
        REFERENCES workouts(id)
        ON DELETE CASCADE
);