import React from 'react';

// Displays list of sets (weight, reps) for matching exercise
const Sets = ({ workouts, lift }) => (
    <ul>
        {workouts.map((set) => {
            if (set.lift === lift) {
                return (
                    <li key={set.workout_id}>
                        {' '}
                        {`${set.weight} lbs, ${set.reps} reps`}
                        {' '}
                    </li>
                );
            }
            return '';
        })}
    </ul>
);

// Workout block - contains lift name and corresponding weight/reps
const Workouts = ({ workouts }) => {
    // Array of unique exercise (lift) names
    const exercises = Array.from(new Set(workouts.map((element) => element.lift)));
    return (
        <div>
            {exercises.map((exercise) => (
                <div key={exercise}>
                <h3>{exercise}</h3>
                <Sets workouts={workouts} lift={exercise} />
                </div>
            ))}
        </div>
    );
};

export default Workouts;
