import React from 'react';
import Dropdown from './Dropdown';

import WeightReps from './WeightReps';
import Distance from './Distance';
import Time from './Time';

const NewSet = ({ 
    exerciseList, 
    getExercise, 
    selectedWorkout, 
    newWorkout, 
    handleNewWorkout 
}) => {
    
    return (
        <div id='new-set'>
            <Dropdown
                name='lift'
                list={exerciseList}
                hidden={true}
                disabled={true}
                placeholder={'Exercises'}
                onChange={e => {getExercise(e); handleNewWorkout(e)} } />
            
            {selectedWorkout.category !== 'Cardio' 
                ? (
                    <WeightReps
                        newWorkout={newWorkout}
                        handleNewWorkout={handleNewWorkout} /> )
                : (
                    <div id='distance-time'>
                        <Distance 
                            newWorkout={newWorkout}
                            handleNewWorkout={handleNewWorkout} />
                        <Time 
                            newWorkout={newWorkout}
                            handleNewWorkout={handleNewWorkout} />
                    </div> )}

            <button id='save-button'>
                Save
            </button>
        </div>
    );
}

export default NewSet;