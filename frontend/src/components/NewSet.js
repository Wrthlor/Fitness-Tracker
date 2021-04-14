import React from 'react';
import Dropdown from './Dropdown';

const NewSet = ({ exerciseList, newWorkout, getExercise, handleNewWorkout }) => {
    
    return (
        <div>
            <Dropdown
                name='lift'
                list={exerciseList}
                hidden={true}
                disabled={true}
                placeholder={'Exercises'}
                onChange={e => {getExercise(e); handleNewWorkout(e)} } />
            <input
                name="weight"
                type="number"
                min="0"
                step="0.25"
                placeholder="Weight [lbs]"
                required={true}
                value={newWorkout.weight}
                onChange={handleNewWorkout} />
            <input
                name="reps"
                type="number"
                min="0"
                step="1"
                placeholder="Reps"
                required={true}
                value={newWorkout.reps}
                onChange={handleNewWorkout} />
            <button >
                Save
            </button>
        </div>
    );
}

export default NewSet;