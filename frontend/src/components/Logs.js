import React, { useState } from 'react';

import ExistingWorkouts from './ExistingWorkouts';
import NewWorkout from './NewWorkout';
import DeleteLog from './DeleteLog';

const Logs = ({ handleSave, newWorkout, handleNewWorkout, loggedWorkouts, deleteButton }) => {

    const [deleteLog, setDeleteLog] = useState(false);

    const handleClick = (event) => {
        event.preventDefault();
        
        if (event.target.value === 'delete') 
            setDeleteLog(true);
        else
            setDeleteLog(false);
    }

    return (
        <div className='logs'>
            <button value='delete' onClick={handleClick}>
                Delete Log
            </button>

            {deleteLog
                ? (
                    <DeleteLog 
                        handleClick={handleClick}
                        deleteButton={deleteButton} /> )
                : (
                    <div>
                        <NewWorkout
                            handleSave={handleSave}
                            newWorkout={newWorkout}
                            handleNewWorkout={handleNewWorkout} />

                        <ExistingWorkouts 
                            loggedWorkouts={loggedWorkouts} 
                            deleteButton={deleteButton} /> 
                    </div> )
            }
        </div>
    );
}

export default Logs;