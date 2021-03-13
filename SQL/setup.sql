-- Create and use database [if database doesn't exist]
CREATE DATABASE IF NOT EXISTS fitnessTracker;
USE fitnessTracker;

-- Each row is for one unique exercise category
-- Based off primary muscle mover 
-- Ex. Back for "pull up"
CREATE TABLE IF NOT EXISTS categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) UNIQUE NOT NULL
);

-- Each row is one unique exercise
CREATE TABLE IF NOT EXISTS exercises (
    id INT PRIMARY KEY AUTO_INCREMENT,
    exercise_name VARCHAR(100) UNIQUE NOT NULL,
    categories_id INT NOT NULL,
    FOREIGN KEY (categories_id) REFERENCES categories(id)
);

-- Each metrics row is one set
-- Ex. 135 lbs at 3 reps
CREATE TABLE IF NOT EXISTS metrics (
    id INT PRIMARY KEY AUTO_INCREMENT,
    wgt DECIMAL(10,1) DEFAULT 0,
    reps INT NOT NULL,    
    created_at TIMESTAMP DEFAULT NOW()
);

-- Individual workout contains single exercise done and corresponding reps/set
CREATE TABLE IF NOT EXISTS workouts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    exercise_id INT NOT NULL,
    metrics_id INT NOT NULL,
    logs_id INT NOT NULL,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id),
    FOREIGN KEY (metrics_id) REFERENCES metrics(id)
);

-- Log to associate user (in future) and workout per day
CREATE TABLE IF NOT EXISTS logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- -- Users table (for future)
-- CREATE TABLE IF NOT EXISTS users (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     created_at TIMESTAMP DEFAULT NOW(),
--     logs_id INT NOT NULL
-- )