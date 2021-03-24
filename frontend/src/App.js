import React, { useState } from 'react';

import Workouts from './components/Workouts';
import Exercises from './components/Exercises';

const sampleWorkout = [
  {
    workout_id: 96,
    lift: 'Overhead Press',
    weight: 120,
    reps: 5,
  },
  {
    workout_id: 97,
    lift: 'Overhead Press',
    weight: 125,
    reps: 5,
  },
  {
    workout_id: 98,
    lift: 'Overhead Press',
    weight: 130,
    reps: 5,
  },
  {
    workout_id: 102,
    lift: 'Overhead Press',
    weight: 135,
    reps: 5,
  },
  {
    workout_id: 99,
    lift: 'Deadlift',
    weight: 265,
    reps: 3,
  },
  {
    workout_id: 101,
    lift: 'Deadlift',
    weight: 285,
    reps: 3,
  },
  {
    workout_id: 103,
    lift: 'Deadlift',
    weight: 305,
    reps: 3,
  },
  {
    workout_id: 104,
    lift: 'Deadlift',
    weight: 315,
    reps: 3,
  },
  {
    workout_id: 200,
    lift: 'Pull Up',
    weight: 165,
    reps: 5,
  },
  {
    workout_id: 201,
    lift: 'Pull Up',
    weight: 170,
    reps: 5,
  },
  {
    workout_id: 202,
    lift: 'Pull Up',
    weight: 175,
    reps: 5,
  },
];
const exerciseList = [
  'Ab-Wheel Rollout',
  'Arnold Dumbbell Press',
  'Barbell Calf Raise',
  'Barbell Curl',
  'Barbell Front Squat',
  'Barbell Glute Bridge',
  'Barbell Row',
  'Barbell Shrug',
  'Barbell Squat',
  'Behind The Neck Barbell Press',
  'Cable Crossover',
  'Cable Crunch',
  'Cable Curl',
  'Cable Face Pull',
  'Cable Overhead Triceps Extension',
  'Chin Up',
  'Close Grip Barbell Bench Press',
  'Crunch',
  'Crunch Machine',
  'Cycling',
  'Deadlift',
  'Decline Barbell Bench Press',
  'Decline Crunch',
  'Decline Hammer Strength Chest Press',
  'Donkey Calf Raise',
  'Dragon Flag',
  'Dumbbell Concentration Curl',
  'Dumbbell Curl',
  'Dumbbell Hammer Curl',
  'Dumbbell Overhead Triceps Extension',
  'Dumbbell Preacher Curl',
  'Dumbbell Row',
  'Elliptical Trainer',
  'EZ-Bar Curl',
  'EZ-Bar Preacher Curl',
  'EZ-Bar Skullcrusher',
  'Flat Barbell Bench Press',
  'Flat Dumbbell Bench Press',
  'Flat Dumbbell Fly',
  'Front Dumbbell Raise',
  'Glute-Ham Raise',
  'Good Morning',
  'Hammer Strength Row',
  'Hammer Strength Shoulder Press',
  'Hanging Knee Raise',
  'Hanging Leg Raise',
  'Incline Barbell Bench Press',
  'Incline Dumbbell Bench Press',
  'Incline Dumbbell Fly',
  'Incline Hammer Strength Chest Press',
  'Lat Pulldown',
  'Lateral Dumbbell Raise',
  'Lateral Machine Raise',
  'Leg Extension Machine',
  'Leg Press',
  'Log Press',
  'Lying Leg Curl Machine',
  'Lying Triceps Extension',
  'Machine Shrug',
  'Neutral Chin Up',
  'One-Arm Standing Dumbbell Press',
  'Overhead Press',
  'Parallel Bar Triceps Dip',
  'Pendlay Row',
  'Plank',
  'Pull Up',
  'Push Press',
  'Rack Pull',
  'Rear Delt Dumbbell Raise',
  'Ring Dip',
  'Romanian Deadlift',
  'Rope Push Down',
  'Rowing Machine',
  'Running (Outdoor)',
  'Running (Treadmill)',
  'Seated Cable Row',
  'Seated Calf Raise Machine',
  'Seated Dumbbell Press',
  'Seated Incline Dumbbell Curl',
  'Seated Leg Curl Machine',
  'Seated Machine Curl',
  'Seated Machine Fly',
  'Side Plank',
  'Smith Machine Close Grip Bench Press',
  'Smith Machine Overhead Press',
  'Standing Calf Raise Machine',
  'Stationary Bike',
  'Stiff-Legged Deadlift',
  'Straight-Arm Cable Pushdown',
  'Sumo Deadlift',
  'Swimming',
  'T-Bar Row',
  'V-Bar Push Down',
  'Walking',
];

const App = () => {
    const [workouts, setWorkouts] = useState(sampleWorkout);
    const [newWorkout, setNewWorkout] = useState({ lift: '', weight: 0, reps: 0 });

    // Placeholder function for RNG workout_id's
    const newId = () => {
        const rng = Math.floor(Math.random() * 100000000000000000);
        if (workouts.map((element) => element.workout_id).includes(rng)) {
            return newId();
        } 
        else {
            return rng;
        }
    };

    const onClick = (event) => {
        event.preventDefault();
        // console.log('New Log', event.target);
    };

    const addExercise = (event) => {
        event.preventDefault();
        const workoutObject = {
            workout_id: newId(),
            ...newWorkout,
        };
        setWorkouts(workouts.concat(workoutObject));
        setNewWorkout({ lift: '', weight: 0, reps: 0 });
    };

    const handleNewWorkout = (event) => {
        setNewWorkout({
            ...newWorkout,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <div>
        <form onSubmit={onClick}>
            <h2>Log Date</h2>
            <button>New Workout</button>
        </form>
        <form onSubmit={addExercise}>
            <Exercises
                exercises={exerciseList}
                onChange={handleNewWorkout} />
            <input
                name="weight"
                type="number"
                min="0"
                value={newWorkout.weight}
                onChange={handleNewWorkout} />
            <input
                name="reps"
                type="number"
                min="0"
                value={newWorkout.reps}
                onChange={handleNewWorkout} />
            <input
                type="submit"
                value="Create" />
        </form>
            <Workouts workouts={workouts} />
        </div>
    );
};

export default App;
