import React, { useState, useEffect, useRef } from 'react';

import Dropdown from './Dropdown';
import NewSet from './NewSet';
import Notification from './Notification';

import exerciseData from '../services/logsService';

const NewWorkout = ({ handleSave, newWorkout, handleNewWorkout, validSubmission }) => {

    const [categoryList, setCategoryList ] = useState([{ id: 0, name: 'Loading...'}]);
    const [initialExercises, setInitial ] = useState([]);
    const [exerciseList, setExerciseList ] = useState([]);

    const [show, setShow ] = useState({ workout: false, categories: false, exercises: false});
    const [selectedWorkout, setSelected ] = useState({ category: 'Categories', exercise: 'Exercises' });

    const [message, setMessage ] = useState('');
    const idRef = useRef();

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

    // Gets selected category/exercise from grandchild component: Dropdown
    const getCategory = (event) => setSelected({ ...selectedWorkout, category: event.target.value });
    const getExercise = (event) => setSelected({ ...selectedWorkout, exercise: event.target.value });

    const handleClicks = (event) => { 
        switch (event.target.name) {
            case 'new-cancel':
                setShow({
                    workout: !show.workout,
                    categories: true,
                    exercises: false
                })
                setMessage("");
                break;
            case 'category':
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
            case 'back':
                setShow({
                    ...show,
                    categories: true,
                    exercises: false
                });                
                setSelected({ category: 'Categories', exercise: 'Exercises' });
                setMessage('');
                break;
            default: 
                if (selectedWorkout.exercise !== 'Exercises') {
                    // Selected cardio exercise
                    if (selectedWorkout.category === 'Cardio') {
                        if (newWorkout.distance === '') 
                            setMessage('Please enter a value for distance');
                        else if (newWorkout.mm === '') 
                            setMessage('Please enter a value for minutes');
                        else if (newWorkout.ss === '') 
                            setMessage('Please enter a value for seconds');
                    }
                    // Selected non-cardio exercise
                    else {
                        if (newWorkout.weight === '') 
                            setMessage('Please enter a value for weight');
                        else if (newWorkout.reps === '') 
                            setMessage('Please enter a value for reps');
                    }
                    const id = setTimeout(() => {
                        setMessage('');
                    }, 5000);
                    idRef.current = id;

                    if (validSubmission()) {
                        setShow({
                            ...show,
                            workout: false
                        })
                        setSelected({ category: 'Categories', exercise: 'Exercises' });
                        setMessage('');
                    }
                }
                else {
                    if (selectedWorkout.exercise === 'Exercises') {  
                        setMessage('Please select an exercise');
                        const id = setTimeout(() => {
                            setMessage('');
                        }, 5000);
                        idRef.current = id;     // timeout id saved in ref
                    }
                }
                break;
        };
    };

    // Clear timeoutId
    useEffect(() => {
        const timeoutId = idRef.current;
        return () => {
            clearTimeout(timeoutId);
        };
    });

    return (
        <div>
            <br />
            
            <button name='new-cancel' className='create-delete-button' onClick={handleClicks}>
                {show.workout ? 'Cancel Workout' : 'New Workout'}
            </button>

            {show.workout &&  
                <div onSubmit={handleClicks}>
                    <form onSubmit={handleSave}> 
                        <br />
                        {show.categories && 
                            <div onChange={handleClicks}>
                                <Dropdown 
                                    name='category'
                                    list={categoryList}
                                    hidden={true}
                                    disabled={true}
                                    placeholder={'Categories'}
                                    onChange={e => {getCategory(e); handleNewWorkout(e); handleExerciseList(e)}} />
                            </div>
                        }
                                 
                        {show.exercises && 
                            <div>
                                <button name='back' onClick={handleClicks}>
                                    Go Back
                                </button>

                                {message !== "" && 
                                    <Notification 
                                        message={message}
                                        className='warning' /> 
                                }

                                <NewSet 
                                    exerciseList={exerciseList}
                                    getExercise={getExercise}
                                    selectedWorkout={selectedWorkout}
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