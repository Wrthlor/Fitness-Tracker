import React from 'react';
import Sets from './Sets';

// Workout block - contains lift name and corresponding weight/reps
const ExistingWorkouts = ({ loggedWorkouts, deleteButton }) => {
    // Array of unique exercises, aka lifts
    const exercises = Array.from(new Set(loggedWorkouts.map(element => element.lift)));

    return (
        <div>
            {exercises.map(lift => {
                if (lift !== "Exercises") {
                    return (
                        <div key={lift} >
                            <h4>{lift}</h4>
                            <Sets 
                                workouts={loggedWorkouts} 
                                lift={lift} 
                                deleteButton={deleteButton} />
                        </div>
                    );
                }
                return "";
            })}
        </div>
    );
};

export default ExistingWorkouts;