import React from 'react';

// Dropdown list of available exercises
const Exercises = ({ exercises, newWorkout, handleNewWorkout }) => (
    <div>
        <select name="lift" defaultValue='Exercises' onChange={handleNewWorkout}>
            {' '}
            <option value="Exercises" hidden disabled>Exercises</option>
            {exercises.map((lift) => <option key={lift} value={lift}>{lift}</option>)}
        </select>
        <br />  
        <input
            name="weight"
            type="number"
            min="0"
            value={newWorkout.weight}
            onChange={handleNewWorkout} />
        <input
            name="reps"
            type="number"
            min="0"
            value={newWorkout.reps}
            onChange={handleNewWorkout} />
        <input
                type="submit"
                value="Save" />
    </div>
);

export default Exercises;
