import React from 'react';

// Dropdown list of available exercises
const Exercises = ({ exercises, onChange }) => (
    <div>
        <select name="lift" defaultValue="Exercises" onChange={onChange}>
            {' '}
            <option value="Exercises" hidden disabled>Exercises</option>
            {exercises.map((lift) => <option key={lift} value={lift}>{lift}</option>)}
        </select>
    </div>
);

export default Exercises;
