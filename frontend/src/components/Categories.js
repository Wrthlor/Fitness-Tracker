import React, { useState } from 'react';
import sampleData from '../sampleData/data';

import Dropdown from './Dropdown';

const Categories = ({ newWorkout, handleNewWorkout }) => {

    const categories = sampleData.exerciseCategory;
    const exercises = sampleData.exerciseList_with_ids;
    const [exerciseList, setExerciseList ] = useState(exercises);
    
    let categoriesPlaceholder = 'Filter by category';

    // Adjusts what exercises are shown according to category selected 
    const handleExerciseList = (event) => {
        event.preventDefault();
        let value = event.target.value;

        if (value === categoriesPlaceholder) {
            setExerciseList(exercises);
        }
        else {
            let targetCategory = categories.filter(category => category.name === value)
            let categorizedExercises = exercises.filter(exercise => exercise.categories_id === targetCategory[0].id)
            setExerciseList(categorizedExercises)
        }
    }

    return (
        <div name="test">
            <Dropdown 
                list={categories}
                placeholder={categoriesPlaceholder}
                onChange={handleExerciseList} 
            />

            <Dropdown
                name='lift'
                list={exerciseList}
                placeholder={'Exercises'}
                onChange={handleNewWorkout} 
            />

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
            <button>
                Save
            </button>
        </div>
    )
};

export default Categories;