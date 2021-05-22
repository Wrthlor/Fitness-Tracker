import React from 'react';

const WeightReps = ({ newWorkout, handleNewWorkout }) => {

    return (
        <div id='wgt-reps'>
            <input
                name="weight"
                id='wgt'
                type="number"
                min="0"
                max="100000000"
                step="0.25"
                placeholder="Weight [lbs]"
                value={newWorkout.weight}
                onChange={handleNewWorkout} />
            <input
                name="reps"
                id='reps'
                type="number"
                min="0"
                max="100000000"
                step="1"
                placeholder="Reps"
                value={newWorkout.reps}
                onChange={handleNewWorkout} />
        </div>
    )
}

export default WeightReps;