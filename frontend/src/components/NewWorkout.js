import React, { useState } from 'react';
import sampleData from '../sampleData/data';

import Dropdown from './Dropdown';
import NewSet from './NewSet';

const NewWorkout = ({ handleSave, newWorkout, handleNewWorkout }) => {

    const [show, setShow] = useState({ workout: false, categories: false, exercises: false})

    const categories = sampleData.exerciseCategory;
    const exercises = sampleData.exerciseList_with_ids;
    const [exerciseList, setExerciseList ] = useState(exercises);
    
    // Adjusts what exercises are shown according to category selected 
    const handleExerciseList = (event) => {
        event.preventDefault();

        let targetCategory = categories.filter(category => 
            category.name === event.target.value);
        let categorizedExercises = exercises.filter(exercise => 
            exercise.categories_id === targetCategory[0].id);
        
        setExerciseList(categorizedExercises);
    };

    const handleClicks = (event) => {
        switch (event.target.name) {
            case 'New':
                setShow({
                    workout: !show.workout,
                    categories: true,
                    exercises: false
                })
                break;
            case 'Category':
                setShow({
                    ...show,
                    categories: false,
                    exercises: true
                })
                break;
            case 'Back':
                setShow({
                    ...show,
                    categories: true,
                    exercises: false
                })
                break;
            default: 
                setShow({
                    ...show,
                    workout: false
                })
                break;
        };
    };

    return (
        <div>
            <br />
            <button name='New' onClick={handleClicks}>
                {show.workout ? 'Cancel Workout' : 'New Workout'}
            </button>

            {show.workout &&  
                <div onSubmit={handleClicks}> 
                    <form onSubmit={handleSave}>
                        <br />
                        {show.categories && 
                            <div onChange={handleClicks}>
                                <Dropdown 
                                    name='Category'
                                    list={categories}
                                    hidden={true}
                                    disabled={true}
                                    placeholder={'Categories'}
                                    onChange={handleExerciseList} />
                            </div>
                        }                        
                        {show.exercises && 
                            <div>
                                <button name='Back' onClick={handleClicks}>
                                    Go Back
                                </button>
                                <NewSet 
                                    exerciseList={exerciseList}
                                    newWorkout={newWorkout}
                                    handleNewWorkout={handleNewWorkout} />
                            </div> 
                        }
                    </form>
                </div>
            }
        </div>
    );
};

export default NewWorkout;