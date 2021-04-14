import React from 'react';

// Displays list of sets (weight, reps) for matching exercise
const Sets = ({ workouts, lift, deleteButton }) => {

    return (
        <ul>
            {workouts.map(set => {
                if (set.lift === lift) {
                    return (
                        <form key={set.workout_id} id={set.workout_id} name='Set' onSubmit={deleteButton} >
                            <li key={set.workout_id} >
                                {`${set.weight !== "" ? set.weight : 0} lbs, ${set.reps !== "" ? set.reps : 0} reps`}
                                {' '}
                                <button>Delete</button>
                            </li>
                        </form>
                    );
                }
                return "";
            })}
        </ul>
    );
};

export default Sets;