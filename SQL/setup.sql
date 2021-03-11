-- Create and use database [if database doesn't exist]
CREATE DATABASE IF NOT EXISTS fitnessTracker;
USE fitnessTracker;

-- Create tables to imiate exercise tracker [if tables don't exist]
-- Table for individual person
CREATE TABLE IF NOT EXISTS person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    person_name VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Table for routines
CREATE TABLE IF NOT EXISTS routines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    routine_name VARCHAR(100) NOT NULL,
    descriptions VARCHAR(255)
);

-- Table for individual exercises
CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_name VARCHAR(100) UNIQUE NOT NULL
);

-- Table for a individual person's routine
CREATE TABLE IF NOT EXISTS personalRoutine (
    personalRoutine_name VARCHAR(255) NOT NULL,     -- Ex. "Jack's routine"
    person_id INT NOT NULL,                         -- Keeps associated with name
    routine_id INT NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (routine_id) REFERENCES routines(id)
);

-- Table for workout plans (comprised of exercises)
CREATE TABLE IF NOT EXISTS workouts (
    workouts_name VARCHAR(255) NOT NULL,             -- Ex. "Pull exercises" or "Arm workout"
    workouts_id INT AUTO_INCREMENT PRIMARY KEY,      -- Keeps associated with name
    routine_id INT NOT NULL,
    exercise_id INT NOT NULL,
    FOREIGN KEY (routine_id) REFERENCES routines(id),
    FOREIGN KEY (exercise_id) REFERENCES exercises(id)
);

-- Table for schedules (compilation of workouts per person)
CREATE TABLE IF NOT EXISTS schedule (
    schedule_name VARCHAR(100) NOT NULL,
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    personalRoutine_id INT NOT NULL,
    workout_id INT NOT NULL,
    FOREIGN KEY (personalRoutine_id) REFERENCES personalRoutine(person_id),
    FOREIGN KEY (workout_id) REFERENCES workouts(workouts_id)
);