-- Display Monday logs of exercises and corresponding weight and reps
SELECT
    exercise_name AS 'Monday lifts',
    wgt AS 'weight',
    reps
FROM workouts
INNER JOIN logs
    ON workouts.logs_id = logs.id
INNER JOIN exercises
    ON workouts.exercise_id = exercises.id
INNER JOIN metrics
    ON workouts.metrics_id = metrics.id
WHERE DAYNAME(logs.created_at) = 'Monday';

-- Display log of exercises and corresponding weight and reps for '2021-03-05'
SELECT 
    exercise_name AS 'lifts on 2021-03-0',
    wgt AS 'weight'
FROM workouts
INNER JOIN logs
    ON logs.id = workouts.logs_id
INNER JOIN exercises
    ON exercises.id = workouts.exercise_id
INNER JOIN metrics
    ON metrics.id = workouts.metrics_id
WHERE DATE(logs.created_at) = '2021-03-05';

-- Determine the average weight for deadlift variations
SELECT 
    exercise_name AS 'Deadlift variations',
    AVG(wgt) AS 'Avg wgt'
FROM workouts
INNER JOIN metrics
    ON workouts.metrics_id = metrics.id
INNER JOIN exercises
    ON workouts.exercise_id = exercises.id
GROUP BY exercise_name
HAVING exercise_name LIKE '%deadlift%';

-- Determine heaviest lift, the weight and time
SELECT
    exercise_name AS 'Heaviest lift',
    wgt AS 'Heaviest weight',
    TIME(metrics.created_at) AS 'Time'
FROM workouts
JOIN exercises
    ON workouts.exercise_id = exercises.id
JOIN metrics
    ON workouts.metrics_id = metrics.id
ORDER BY wgt DESC
LIMIT 1;

-- Group exercises by primary muscle mover (category), alphabetically
SELECT
    category_name AS 'Primary Muscles',
    exercise_name AS 'Lift'
FROM exercises
INNER JOIN categories
    ON exercises.categories_id = categories.id
ORDER BY category_name, exercise_name;
