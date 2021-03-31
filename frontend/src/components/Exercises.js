import React from 'react';
import sampleData from '../sampleData/data';

// Dropdown list of available exercises
// Note: Possible future feature: Add capability to make new exercises (name and category)
const Exercises = ({ newWorkout, handleNewWorkout }) => {
    const exercises = sampleData.exerciseList_with_ids;
    
    return (
        <div>
            <select name='lift' defaultValue='Exercises' onChange={handleNewWorkout}>
                {' '}
                <option value='Exercises' hidden disabled>Exercises</option>
                {exercises.map(lift => 
                    <option key={lift.id} value={lift.exercise_name}>
                        {lift.exercise_name}
                    </option>)}
            </select>
        </div>
    )
};

export default Exercises;