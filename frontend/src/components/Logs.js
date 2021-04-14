import React from 'react';

import ExistingWorkouts from './ExistingWorkouts';
import NewWorkout from './NewWorkout';

const Logs = ({ handleSave, newWorkout, handleNewWorkout, loggedWorkouts, deleteButton }) => {

    return (
        <div>
            <button name='Log' onClick={deleteButton}>
                Delete Log
            </button>

            <NewWorkout
                handleSave={handleSave}
                newWorkout={newWorkout}
                handleNewWorkout={handleNewWorkout} 
            />

            <ExistingWorkouts 
                loggedWorkouts={loggedWorkouts} 
                deleteButton={deleteButton} 
            /> 
        </div>
    );
}

export default Logs;