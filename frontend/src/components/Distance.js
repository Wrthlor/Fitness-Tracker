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
        {
            id: 4,
            name: 'Yards'
        }
    ];

    return (
        <div id='distance'>
            <input
                name="distance"
                id='distance-input'
                type="number"
                min="0"
                max="100000000"
                step="0.01"
                placeholder="Distance"
                value={newWorkout.distance}
                onChange={handleNewWorkout} />
            <Dropdown 
                name='unit'
                id='distance-units'
                list={distanceUnit}
                placeholder={'Meters'} 
                onChange={handleNewWorkout} />
        </div>
    )
}

export default Distance;