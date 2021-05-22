import React from 'react';

const Time = ({ newWorkout, handleNewWorkout }) => {

    return (
        <div id='time'>
            <input
                className='time-measurement'
                name="hh"
                type="number"
                min="0"
                max='99'
                step="1"
                placeholder="hh"
                value={newWorkout.hh}
                onChange={handleNewWorkout} />
            <input
                className='time-measurement'
                name="mm"
                type="number"
                min="0"
                max="59" 
                step="1"
                placeholder="mm"
                value={newWorkout.mm}
                onChange={handleNewWorkout} />
            <input
                className='time-measurement'
                name="ss"
                type="number"
                min="0"
                max="59"
                step="1"
                placeholder="ss"
                value={newWorkout.ss}
                onChange={handleNewWorkout} />
        </div>
    )
}

export default Time;