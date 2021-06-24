-- Simple, sample data for exercises and categories

-- Default exercise categories 
INSERT INTO categories (category_name, id)
VALUES
    ('Shoulders', 1), ('Triceps', 2), ('Biceps', 3), 
    ('Chest', 4), ('Back', 5), ('Legs', 6), 
    ('Abs', 7), ('Cardio', 8);

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