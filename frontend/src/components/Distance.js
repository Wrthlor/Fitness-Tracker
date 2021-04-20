import React from 'react';

import Dropdown from './Dropdown';

const Distance = ({ newWorkout, handleNewWorkout }) => {

    const distanceUnit = [
        {
            id: 1,
            name: 'Kilometers'
        }, 
        {
            id: 2,
            name: 'Feet'
        }, 
        {
            id: 3,
            name: 'Miles'
        }, 
    ];

    return (
        <div>
            <input
                name="distance"
                type="number"
                min="0"
                step="0.01"
                placeholder="Distance"
                required={true}
                value={newWorkout.distance}
                onChange={handleNewWorkout} />
            <Dropdown 
                name='unit'
                list={distanceUnit}
                placeholder={'Meters'} 
                onChange={handleNewWorkout} />
        </div>
    )
}

export default Distance;