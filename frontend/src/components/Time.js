import React from 'react';

const Time = ({ newWorkout, handleNewWorkout }) => {

    return (
        <div>
            <input
                name="hh"
                type="number"
                min="0"
                max='99'
                step="1"
                placeholder="hh"
                value={newWorkout.hh}
                onChange={handleNewWorkout} />
            <input
                name="mm"
                type="number"
                min="0"
                max="59"
                step="1"
                placeholder="mm"
                required={true}
                value={newWorkout.mm}
                onChange={handleNewWorkout} />
            <input
                name="ss"
                type="number"
                min="0"
                max="59"
                step="1"
                placeholder="ss"
                required={true}
                value={newWorkout.ss}
                onChange={handleNewWorkout} />
        </div>
    )
}

export default Time;