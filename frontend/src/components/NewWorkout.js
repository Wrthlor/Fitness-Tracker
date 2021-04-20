import React, { useEffect, useState } from 'react';

import Dropdown from './Dropdown';
import NewSet from './NewSet';

import exerciseData from '../services/logs';

const NewWorkout = ({ handleSave, newWorkout, handleNewWorkout }) => {

    const [show, setShow] = useState({ workout: false, categories: false, exercises: false})

    const [categoryList, setCategoryList ] = useState([{ id: 0, name: 'Loading...'}]);
    const [initialExercises, setInitial ] = useState([]);
    const [exerciseList, setExerciseList ] = useState([]);
    const [selectedExercise, setSelected] = useState('Exercises');
    
    // Categories data
    useEffect(() => {
        let mounted = true;
        exerciseData
            .getCategories()
            .then(categories => mounted && setCategoryList(categories))
            .catch(error => console.log(error));
        return () => {
            mounted = false;
        }
    }, []);

    // Exercises data
    useEffect(() => {
        let mounted = true;
        exerciseData
            .getExercises()
            .then(exercises => mounted && setInitial(exercises))
            .catch(error => console.log(error));
        return () => {
            mounted = false;
        }
    }, []);

    // Adjusts what exercises are shown according to category selected 
    const handleExerciseList = (event) => {
        event.preventDefault();

        let targetCategory = categoryList.filter(category => 
            category.name === event.target.value);
        let categorizedExercises = initialExercises.filter(exercise => 
            exercise.categories_id === targetCategory[0].id);
        
        setExerciseList(categorizedExercises);
    };

    // Gets selected exercise from grandchild component: Dropdown
    const getExercise = (event) => setSelected(event.target.value);

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
                if (categoryList[0].id !== 0) {
                    setShow({
                        ...show,
                        categories: false,
                        exercises: true
                    })
                }
                else {
                    console.log('Loading...')
                }
                break;
            case 'Back':
                setShow({
                    ...show,
                    categories: true,
                    exercises: false
                })
                break;
            default: 
                if (selectedExercise !== '' && selectedExercise !== 'Exercises') {
                    setShow({
                        ...show,
                        workout: false
                    })
                    setSelected("");
                }
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
                    <form name='test' onSubmit={handleSave}>
                        <br />
                        {show.categories && 
                            <div onChange={handleClicks}>
                                <Dropdown 
                                    name='Category'
                                    list={categoryList}
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
                                    getExercise={getExercise}
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