import React from 'react';

import ExistingWorkouts from './ExistingWorkouts';
import NewWorkout from './NewWorkout';

const Logs = ({ 
    handleSave, 
    newWorkout, 
    handleNewWorkout, 
    loggedWorkouts, 
    deleteButton,
    validSubmission
}) => {

    return (
        <div>
            <NewWorkout
                handleSave={handleSave}
                newWorkout={newWorkout}
                handleNewWorkout={handleNewWorkout}
                validSubmission={validSubmission} />

            <ExistingWorkouts 
                loggedWorkouts={loggedWorkouts} 
                deleteButton={deleteButton} /> 
        </div> 
    );
}

export default Logs;