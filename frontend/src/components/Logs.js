import React from 'react';

import Workouts from './Workouts';
import Exercises from './Exercises';

const Logs = ({ handleSave, newWorkout, handleNewWorkout, loggedWorkouts, deleteButton }) => {

    return (
        <div>
            <form onSubmit={handleSave}>
                <h4>Start New Workout</h4>
                <Exercises
                    newWorkout={newWorkout}
                    handleNewWorkout={handleNewWorkout} />
            </form>

            <Workouts 
                loggedWorkouts={loggedWorkouts} 
                deleteButton={deleteButton} /> 
        </div>
    );
}

export default Logs;