-- SAMPLE TEST DATA (WIP) --

-- Sample person data
INSERT INTO person (person_name)
VALUES 
    ('Jack'),
    ('Jill');

-- Sample routine data
INSERT INTO routines (
    routine_name,
    descriptions
)
VALUES 
    ('Pull', 'pull exercises'),
    ('Push', 'push exercises'),
    ('Legs', 'leg exercises'),
    ('Chest', 'chest exercises'),
    ('Back', 'back exercises'),
    ('Arms', 'arm exercises');

-- Sample exercises data
INSERT INTO exercises (exercise_name)
VALUES 
    ('Deadlift'),
    ('Bent-Over Row'),
    ('Pull-Up'),
    ('Flat Bench Press'),
    ('Barbell Overhead Press'),
    ('Parallel-bar Dips'),
    ('Back Squat'),
    ('Dumbbell Lunge'),
    ('Calf Raise'),
    ('Barbell Bicep Curl');

-- Sample personRoutine data
INSERT INTO personalRoutine (
    personalRoutine_name,
    person_id,
    routine_id
)
VALUES
    ('Jack Pull Routine', 1, 1), ('Jack Push Routine', 1, 2), ('Jack Legs Routine', 1, 3),
    ('Jill Chest Routine', 2, 4), ('Jill Back Routine', 2, 5), ('Jill Arm Routine', 2, 6), ('Jill Legs Routine', 2, 3);

-- Sample workout data
INSERT INTO workouts (
    workouts_name,
    routine_id,
    exercise_id
)
VALUES 
    ('Workout 1', 1, 1), ('Workout 1', 1, 2), ('Workout 1', 1, 3),
    ('Workout 1', 2, 4), ('Workout 1', 2, 5), ('Workout 1', 2, 6),
    ('Workout 1', 3, 7), ('Workout 1', 3, 8), ('Workout 1', 3, 9),
    ('Workout 2', 4, 4), ('Workout 2', 4, 5),
    ('Workout 2', 5, 2), ('Workout 2', 4, 3),
    ('Workout 2', 6, 10),
    ('Workout 2', 3, 1), ('Workout 2', 3, 7);

-- Sample schedule data
INSERT INTO schedule (
    schedule_name,
    personalRoutine_id,
    workout_id
)
VALUES
    ('PPL', 1, 1), ('PPL', 1, 2), ('PPL', 1, 3), ('PPL', 1, 4), ('PPL', 1, 5), ('PPL', 1, 6), ('PPL', 1, 7), ('PPL', 1, 8), ('PPL', 1, 9), 
    ('Bro split', 2, 10), ('Bro split', 2, 11), ('Bro split', 2, 12), ('Bro split', 2, 13), ('Bro split', 2, 14), ('Bro split', 2, 15), ('Bro split', 2, 16);