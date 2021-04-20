import React from 'react';

const WeightReps = ({ newWorkout, handleNewWorkout }) => {

    return (
        <div>
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
        </div>
    )
}

export default WeightReps;