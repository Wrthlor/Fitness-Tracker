import React from 'react';
import sampleData from '../sampleData/data';

// Dropdown list of available exercises
const Exercises = ({ newWorkout, handleNewWorkout }) => {
    const exercises = sampleData.exerciseList;

    return (
        <div>
            <select name="lift" defaultValue='Exercises' onChange={handleNewWorkout}>
                {' '}
                <option value="Exercises" hidden disabled>Exercises</option>
                {exercises.map((lift) => 
                    <option key={lift} value={lift}>
                        {lift}
                    </option>)}
            </select>
            <br />  
            <input
                name="weight"
                type="number"
                min="0"
                step="0.25"
                placeholder="Weight [lbs]"
                value={newWorkout.weight}
                onChange={handleNewWorkout} />
            <input
                name="reps"
                type="number"
                min="0"
                step="1"
                placeholder="Reps"
                value={newWorkout.reps}
                onChange={handleNewWorkout} />
            <input
                type="submit"
                value="Save" />
        </div>
    )}
;

export default Exercises;