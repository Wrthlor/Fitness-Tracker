import React from 'react';

import Workouts from './Workouts';
import Categories from './Categories';

const Logs = ({ handleSave, newWorkout, handleNewWorkout, loggedWorkouts, deleteButton }) => {

    return (
        <div>
            <form onSubmit={handleSave}>
                <h4>Start New Workout</h4>
                <Categories
                    newWorkout={newWorkout}
                    handleNewWorkout={handleNewWorkout} 
                />
            </form>

            <Workouts 
                loggedWorkouts={loggedWorkouts} 
                deleteButton={deleteButton} 
            /> 
        </div>
    );
}

export default Logs;