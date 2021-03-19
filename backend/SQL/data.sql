-- Sample "Hard Coded" Data --
-- Based off PHUL routine --

-- Default exercise categories 
INSERT INTO categories (category_name)
VALUES
    ('Shoulders'), ('Triceps'), ('Biceps'), 
    ('Chest'), ('Back'), ('Legs'), 
    ('Abs'), ('Cardio');

-- Default exercise list data 
INSERT INTO exercises (
    exercise_name,
    categories_id
)
VALUES
    ('Arnold Dumbbell Press', 1), ('Behind The Neck Barbell Press', 1), ('Cable Face Pull', 1), ('Front Dumbbell Raise', 1), ('Hammer Strength Shoulder Press', 1), ('Lateral Dumbbell Raise', 1), ('Lateral Machine Raise', 1), ('Log Press', 1), ('One-Arm Standing Dumbbell Press', 1), ('Overhead Press', 1), ('Push Press', 1), ('Rear Delt Dumbbell Raise', 1), ('Seated Dumbbell Press', 1), ('Smith Machine Overhead Press', 1),
    ('Cable Overhead Triceps Extension', 2), ('Close Grip Barbell Bench Press', 2), ('Dumbbell Overhead Triceps Extension', 2), ('EZ-Bar Skullcrusher', 2), ('Lying Triceps Extension', 2), ('Parallel Bar Triceps Dip', 2), ('Ring Dip', 2), ('Rope Push Down', 2), ('Smith Machine Close Grip Bench Press', 2), ('V-Bar Push Down', 2),
    ('Barbell Curl', 3), ('Cable Curl', 3), ('Dumbbell Concentration Curl', 3), ('Dumbbell Curl', 3), ('Dumbbell Hammer Curl', 3), ('Dumbbell Preacher Curl', 3), ('EZ-Bar Curl', 3), ('EZ-Bar Preacher Curl', 3), ('Seated Incline Dumbbell Curl', 3), ('Seated Machine Curl', 3),
    ('Cable Crossover', 4), ('Decline Barbell Bench Press', 4), ('Decline Hammer Strength Chest Press', 4), ('Flat Barbell Bench Press', 4), ('Flat Dumbbell Bench Press', 4), ('Flat Dumbbell Fly', 4), ('Incline Barbell Bench Press', 4), ('Incline Dumbbell Bench Press', 4), ('Incline Dumbbell Fly', 4), ('Incline Hammer Strength Chest Press', 4), ('Seated Machine Fly', 4),
    ('Barbell Row', 5), ('Barbell Shrug', 5), ('Chin Up', 5), ('Deadlift', 5), ('Dumbbell Row', 5), ('Good Morning', 5), ('Hammer Strength Row', 5), ('Lat Pulldown', 5), ('Machine Shrug', 5), ('Neutral Chin Up', 5), ('Pendlay Row', 5), ('Pull Up', 5), ('Rack Pull', 5), ('Seated Cable Row', 5), ('Straight-Arm Cable Pushdown', 5), ('T-Bar Row', 5),
    ('Barbell Calf Raise', 6), ('Barbell Front Squat', 6), ('Barbell Glute Bridge', 6), ('Barbell Squat', 6), ('Donkey Calf Raise', 6), ('Glute-Ham Raise', 6), ('Leg Extension Machine', 6), ('Leg Press', 6), ('Lying Leg Curl Machine', 6), ('Romanian Deadlift', 6), ('Seated Calf Raise Machine', 6), ('Seated Leg Curl Machine', 6), ('Standing Calf Raise Machine', 6), ('Stiff-Legged Deadlift', 6), ('Sumo Deadlift', 6),
    ('Ab-Wheel Rollout', 7), ('Cable Crunch', 7), ('Crunch', 7), ('Crunch Machine', 7), ('Decline Crunch', 7), ('Dragon Flag', 7), ('Hanging Knee Raise', 7), ('Hanging Leg Raise', 7), ('Plank', 7), ('Side Plank', 7),
    ('Cycling', 8), ('Elliptical Trainer', 8), ('Rowing Machine', 8), ('Running (Outdoor)', 8), ('Running (Treadmill)', 8), ('Stationary Bike', 8), ('Swimming', 8), ('Walking', 8)
;

-- Sample sets based off PHUL routine
INSERT INTO metrics (
    created_at, 
    wgt, 
    reps
)
VALUES 
    ('2021-03-01 07:00:00', 165, 3), ('2021-03-01 07:05:00', 165, 3), ('2021-03-01 07:10:00', 165, 3), ('2021-03-01 07:15:00', 165, 3), ('2021-03-01 07:20:00', 165, 3), ('2021-03-01 07:25:00', 140, 5), ('2021-03-01 07:30:00', 140, 5), ('2021-03-01 07:35:00', 140, 5), ('2021-03-01 07:40:00', 140, 5), ('2021-03-01 07:45:00', 105, 4), ('2021-03-01 07:50:00', 105, 3), ('2021-03-01 07:55:00', 105, 3), ('2021-03-01 08:00:00', 105, 2), ('2021-03-01 08:05:00', 140, 5), ('2021-03-01 08:10:00', 140, 5), ('2021-03-01 08:15:00', 140, 5), ('2021-03-01 08:20:00', 140, 5), 
    ('2021-03-02 07:00:00', 225, 3), ('2021-03-02 07:05:00', 225, 3), ('2021-03-02 07:10:00', 225, 3), ('2021-03-02 07:15:00', 225, 3), ('2021-03-02 07:20:00', 225, 3), ('2021-03-02 07:25:00', 375, 10), ('2021-03-02 07:30:00', 375, 10), ('2021-03-02 07:35:00', 375, 10), ('2021-03-02 07:40:00', 155, 15), ('2021-03-02 07:45:00', 155, 15), ('2021-03-02 07:50:00', 155, 15), 
    ('2021-03-04 07:00:00', 135, 7), ('2021-03-04 07:05:00', 135, 7), ('2021-03-04 07:10:00', 135, 7), ('2021-03-04 07:15:00', 135, 7), ('2021-03-04 07:20:00', 160, 5), ('2021-03-04 07:25:00', 160, 5), ('2021-03-04 07:30:00', 160, 5), ('2021-03-04 07:35:00', 40, 10), ('2021-03-04 07:40:00', 40, 10), ('2021-03-04 07:45:00', 40, 10), ('2021-03-04 07:50:00', 40, 10), ('2021-03-04 07:55:00', 100, 10), ('2021-03-04 08:00:00', 100, 10), ('2021-03-04 08:05:00', 100, 10), ('2021-03-04 08:10:00', 100, 10), 
    ('2021-03-05 07:00:00', 220, 3), ('2021-03-05 07:05:00', 220, 3), ('2021-03-05 07:10:00', 220, 3), ('2021-03-05 07:15:00', 220, 3), ('2021-03-05 07:20:00', 220, 3), ('2021-03-05 07:25:00', 140, 7), ('2021-03-05 07:30:00', 140, 7), ('2021-03-05 07:35:00', 140, 7), ('2021-03-05 07:40:00', 140, 7), ('2021-03-05 07:45:00', 170, 12), ('2021-03-05 07:50:00', 170, 12), ('2021-03-05 07:55:00', 170, 12), ('2021-03-05 08:00:00', 170, 12), ('2021-03-05 08:05:00', 70, 10), ('2021-03-05 08:10:00', 70, 10), ('2021-03-05 08:15:00', 70, 10), ('2021-03-05 08:20:00', 70, 10)
;

-- Sample workouts based off PHUL routine
INSERT INTO workouts (
    exercise_id, 
    metrics_id, 
    logs_id
)
VALUES 
    (38, 1, 1), (38, 2, 1), (38, 3, 1), (38, 4, 1), (38, 5, 1), (56, 6, 1), (56, 7, 1), (56, 8, 1), (56, 9, 1), (10, 10, 1), (10, 11, 1), (10, 12, 1), (10, 13, 1), (53, 14, 1), (53, 15, 1), (53, 16, 1), (53, 17, 1), 
    (49, 18, 2), (49, 19, 2), (49, 20, 2), (49, 21, 2), (49, 22, 2), (69, 23, 2), (69, 24, 2), (69, 25, 2), (72, 26, 2), (72, 27, 2), (72, 28, 2),
    (38, 29, 3), (38, 30, 3), (38, 31, 3), (38, 32, 3), (57, 33, 3), (57, 34, 3), (57, 35, 3), (42, 36, 3), (42, 37, 3), (42, 38, 3), (42, 39, 3), (59, 40, 3), (59, 41, 3), (59, 42, 3), (59, 43, 3),
    (65, 44, 4), (65, 45, 4), (65, 46, 4), (65, 47, 4), (65, 48, 4), (71, 49, 4), (71, 50, 4), (71, 51, 4), (71, 52, 4), (72, 53, 4), (72, 54, 4), (72, 55, 4), (72, 56, 4), (73, 57, 4), (73, 58, 4), (73, 59, 4), (73, 60, 4)
;

-- Sample log for PHUL routine (4 days)
INSERT INTO logs (created_at)
VALUES
    ('2021-03-01 07:00:00'),   
    ('2021-03-02 07:00:00'), 
    ('2021-03-04 07:00:00'), 
    ('2021-03-05 07:00:00');