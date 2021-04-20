import React from 'react';

// Displays list of sets (weight and reps) or (distance and time) for matching exercise
const Sets = ({ workouts, lift, deleteButton }) => {

    const pad = (num, size) => {
        let output = "000000" + num;
        return output.substr(output.length - size);
    }

    const unitAbbreviation = unit => {
        switch (unit) {
            case 'Meters':
                return 'm';
            case 'Kilometers':
                return 'km';
            case 'Feet':
                return 'ft';
            case 'Miles':
                return 'mi';
            default:
                break;
        }
    }

    return (
        <ul>    
            {workouts.map(set => {
                if (set.lift === lift) {
                    return (
                        <form key={set.workout_id} id={set.workout_id} name='Set' onSubmit={deleteButton} >
                            <li key={set.workout_id} >
                                {set.category !== 'Cardio' 
                                    ? `${Number(set.weight)} lbs, ${set.reps} reps` 
                                    : `Distance: ${set.distance} ${unitAbbreviation(set.unit)}, 
                                        Time: ${set.hh !== 0 ? pad(set.hh, 2) + "h" : ""} 
                                            ${set.hh !== 0 ? pad(set.mm, 2) + "m" : (set.mm !== 0 ? pad(set.mm, 2) + "m" : "" )}
                                            ${pad(set.ss, 2)}s` }
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