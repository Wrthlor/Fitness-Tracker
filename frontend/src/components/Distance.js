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
        <div className='distance'>
            <input
                name="distance"
                className='distance-input'
                type="number"
                min="0"
                step="0.01"
                placeholder="Distance"
                required={true}
                value={newWorkout.distance}
                onChange={handleNewWorkout} />
            <Dropdown 
                name='unit'
                className='distance-units'
                list={distanceUnit}
                placeholder={'Meters'} 
                onChange={handleNewWorkout} />
        </div>
    )
}

export default Distance;