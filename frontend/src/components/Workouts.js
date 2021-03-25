import React from 'react';

// Displays list of sets (weight, reps) for matching exercise
const Sets = ({ workouts, lift, onDelete }) => (
    <ul>
        {workouts.map((set) => {
            if (set.lift === lift) {
                return (
                    <form key={set.workout_id} id={set.workout_id} onSubmit={onDelete}>
                        <li key={set.workout_id}>
                            {' '}
                            {`${set.weight} lbs, ${set.reps} reps`}
                            {' '}                            
                            <button>Delete</button>
                        </li>
                    </form>
                );
            }
            return "";
        })}
    </ul>
);

// Workout block - contains lift name and corresponding weight/reps
const Workouts = ({ workouts, buttonPress }) => {
    // Array of unique exercise (lift) names
    const exercises = Array.from(new Set(workouts.map((element) => element.lift)));
    return (
        <div>
            {exercises.map((exercise) => {
                if (exercise !== "Exercises") {
                    return (
                        <div key={exercise} >
                            <h3>{exercise}</h3>
                            <Sets workouts={workouts} lift={exercise} onDelete={buttonPress} />
                            <button>Update</button>
                        </div>
                    );
                }
                return "";
            })}
        </div>
    );
};

export default Workouts;
