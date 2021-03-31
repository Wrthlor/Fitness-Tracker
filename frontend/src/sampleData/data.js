const sampleLogs = [
    {
        id:1,
        "date":"Monday, 3/29/2021"
    },
    {
        id:2,
        "date":"Tuesday, 3/30/2021"
    },
    {
        id:3,
        "date":"Thursday, 4/1/2021"
    },
    {
        id:4,
        "date":"Friday, 4/2/2021"
    },
    {
        id:10,
        "date":"Friday, 3/26/2021"
    }
];

const sampleWorkouts = [
    {"logs_id":1,"workout_id":2,"lift":"Flat Barbell Bench Press","weight":165,"reps":3},{"logs_id":1,"workout_id":3,"lift":"Flat Barbell Bench Press","weight":165,"reps":3},{"logs_id":1,"workout_id":4,"lift":"Flat Barbell Bench Press","weight":165,"reps":3},{"logs_id":1,"workout_id":5,"lift":"Flat Barbell Bench Press","weight":165,"reps":3},{"logs_id":1,"workout_id":14,"lift":"Lat Pulldown","weight":140,"reps":5},{"logs_id":1,"workout_id":15,"lift":"Lat Pulldown","weight":140,"reps":5},{"logs_id":1,"workout_id":16,"lift":"Lat Pulldown","weight":140,"reps":5},{"logs_id":1,"workout_id":17,"lift":"Lat Pulldown","weight":140,"reps":5},{"logs_id":1,"workout_id":10,"lift":"Overhead Press","weight":105,"reps":4},{"logs_id":1,"workout_id":11,"lift":"Overhead Press","weight":105,"reps":3},{"logs_id":1,"workout_id":12,"lift":"Overhead Press","weight":105,"reps":3},{"logs_id":1,"workout_id":13,"lift":"Overhead Press","weight":105,"reps":2},{"logs_id":1,"workout_id":6,"lift":"Pendlay Row","weight":140,"reps":5},{"logs_id":1,"workout_id":7,"lift":"Pendlay Row","weight":140,"reps":5},{"logs_id":1,"workout_id":8,"lift":"Pendlay Row","weight":140,"reps":5},{"logs_id":1,"workout_id":9,"lift":"Pendlay Row","weight":140,"reps":5},
    {"logs_id":2,"workout_id":18,"lift":"Deadlift","weight":225,"reps":3},{"logs_id":2,"workout_id":19,"lift":"Deadlift","weight":225,"reps":3},{"logs_id":2,"workout_id":20,"lift":"Deadlift","weight":225,"reps":3},{"logs_id":2,"workout_id":21,"lift":"Deadlift","weight":225,"reps":3},{"logs_id":2,"workout_id":22,"lift":"Deadlift","weight":225,"reps":3},{"logs_id":2,"workout_id":23,"lift":"Leg Press","weight":375,"reps":10},{"logs_id":2,"workout_id":24,"lift":"Leg Press","weight":375,"reps":10},{"logs_id":2,"workout_id":25,"lift":"Leg Press","weight":375,"reps":10},{"logs_id":2,"workout_id":26,"lift":"Seated Calf Raise Machine","weight":155,"reps":15},{"logs_id":2,"workout_id":27,"lift":"Seated Calf Raise Machine","weight":155,"reps":15},{"logs_id":2,"workout_id":28,"lift":"Seated Calf Raise Machine","weight":155,"reps":15},
    {"logs_id":3,"workout_id":29,"lift":"Flat Barbell Bench Press","weight":135,"reps":7},{"logs_id":3,"workout_id":30,"lift":"Flat Barbell Bench Press","weight":135,"reps":7},{"logs_id":3,"workout_id":31,"lift":"Flat Barbell Bench Press","weight":135,"reps":7},{"logs_id":3,"workout_id":32,"lift":"Flat Barbell Bench Press","weight":135,"reps":7},{"logs_id":3,"workout_id":36,"lift":"Incline Dumbbell Bench Press","weight":40,"reps":10},{"logs_id":3,"workout_id":37,"lift":"Incline Dumbbell Bench Press","weight":40,"reps":10},{"logs_id":3,"workout_id":38,"lift":"Incline Dumbbell Bench Press","weight":40,"reps":10},{"logs_id":3,"workout_id":39,"lift":"Incline Dumbbell Bench Press","weight":40,"reps":10},{"logs_id":3,"workout_id":33,"lift":"Pull Up","weight":160,"reps":5},{"logs_id":3,"workout_id":34,"lift":"Pull Up","weight":160,"reps":5},{"logs_id":3,"workout_id":35,"lift":"Pull Up","weight":160,"reps":5},{"logs_id":3,"workout_id":40,"lift":"Seated Cable Row","weight":100,"reps":10},{"logs_id":3,"workout_id":41,"lift":"Seated Cable Row","weight":100,"reps":10},{"logs_id":3,"workout_id":42,"lift":"Seated Cable Row","weight":100,"reps":10},{"logs_id":3,"workout_id":43,"lift":"Seated Cable Row","weight":100,"reps":10},
    {"logs_id":4,"workout_id":45,"lift":"Barbell Squat","weight":220,"reps":3},{"logs_id":4,"workout_id":46,"lift":"Barbell Squat","weight":220,"reps":3},{"logs_id":4,"workout_id":47,"lift":"Barbell Squat","weight":220,"reps":3},{"logs_id":4,"workout_id":48,"lift":"Barbell Squat","weight":220,"reps":3},{"logs_id":4,"workout_id":49,"lift":"Romanian Deadlift","weight":140,"reps":7},{"logs_id":4,"workout_id":50,"lift":"Romanian Deadlift","weight":140,"reps":7},{"logs_id":4,"workout_id":51,"lift":"Romanian Deadlift","weight":140,"reps":7},{"logs_id":4,"workout_id":52,"lift":"Romanian Deadlift","weight":140,"reps":7},{"logs_id":4,"workout_id":53,"lift":"Seated Calf Raise Machine","weight":170,"reps":12},{"logs_id":4,"workout_id":54,"lift":"Seated Calf Raise Machine","weight":170,"reps":12},{"logs_id":4,"workout_id":55,"lift":"Seated Calf Raise Machine","weight":170,"reps":12},{"logs_id":4,"workout_id":56,"lift":"Seated Calf Raise Machine","weight":170,"reps":12},{"logs_id":4,"workout_id":57,"lift":"Seated Leg Curl Machine","weight":70,"reps":10},{"logs_id":4,"workout_id":58,"lift":"Seated Leg Curl Machine","weight":70,"reps":10},{"logs_id":4,"workout_id":59,"lift":"Seated Leg Curl Machine","weight":70,"reps":10},{"logs_id":4,"workout_id":60,"lift":"Seated Leg Curl Machine","weight":70,"reps":10},
    {"logs_id":10,"workout_id":96,"lift":"Overhead Press","weight":135,"reps":7},{"logs_id":10,"workout_id":97,"lift":"Overhead Press","weight":135,"reps":7},{"logs_id":10,"workout_id":98,"lift":"Overhead Press","weight":135,"reps":7},{"logs_id":10,"workout_id":102,"lift":"Overhead Press","weight":135,"reps":7},{"logs_id":10,"workout_id":99,"lift":"Romanian Deadlift","weight":135,"reps":7},{"logs_id":10,"workout_id":101,"lift":"Romanian Deadlift","weight":135,"reps":7},{"logs_id":10,"workout_id":103,"lift":"Romanian Deadlift","weight":135,"reps":7}
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

const exerciseCategory = [
    {
        id: 1,
        name: "Shoulders"
    },
    {
        id: 2,
        name: "Triceps"
    },
    {
        id: 3,
        name: "Biceps"
    },
    {
        id: 4,
        name: "Chest"
    },
    {
        id: 5,
        name: "Back"
    },
    {
        id: 6,
        name: "Legs"
    },
    {
        id: 7,
        name: "Abs"
    },
    {
        id: 8,
        name: "Cardio"
    },
];

const exerciseList_with_ids = [
    {"id":1,"name":"Arnold Dumbbell Press","categories_id":1},{"id":2,"name":"Behind The Neck Barbell Press","categories_id":1},{"id":3,"name":"Cable Face Pull","categories_id":1},{"id":4,"name":"Front Dumbbell Raise","categories_id":1},{"id":5,"name":"Hammer Strength Shoulder Press","categories_id":1},{"id":6,"name":"Lateral Dumbbell Raise","categories_id":1},{"id":7,"name":"Lateral Machine Raise","categories_id":1},{"id":8,"name":"Log Press","categories_id":1},{"id":9,"name":"One-Arm Standing Dumbbell Press","categories_id":1},{"id":10,"name":"Overhead Press","categories_id":1},{"id":11,"name":"Push Press","categories_id":1},{"id":12,"name":"Rear Delt Dumbbell Raise","categories_id":1},{"id":13,"name":"Seated Dumbbell Press","categories_id":1},{"id":14,"name":"Smith Machine Overhead Press","categories_id":1},
    {"id":15,"name":"Cable Overhead Triceps Extension","categories_id":2},{"id":16,"name":"Close Grip Barbell Bench Press","categories_id":2},{"id":17,"name":"Dumbbell Overhead Triceps Extension","categories_id":2},{"id":18,"name":"EZ-Bar Skullcrusher","categories_id":2},{"id":19,"name":"Lying Triceps Extension","categories_id":2},{"id":20,"name":"Parallel Bar Triceps Dip","categories_id":2},{"id":21,"name":"Ring Dip","categories_id":2},{"id":22,"name":"Rope Push Down","categories_id":2},{"id":23,"name":"Smith Machine Close Grip Bench Press","categories_id":2},{"id":24,"name":"V-Bar Push Down","categories_id":2},
    {"id":25,"name":"Barbell Curl","categories_id":3},{"id":26,"name":"Cable Curl","categories_id":3},{"id":27,"name":"Dumbbell Concentration Curl","categories_id":3},{"id":28,"name":"Dumbbell Curl","categories_id":3},{"id":29,"name":"Dumbbell Hammer Curl","categories_id":3},{"id":30,"name":"Dumbbell Preacher Curl","categories_id":3},{"id":31,"name":"EZ-Bar Curl","categories_id":3},{"id":32,"name":"EZ-Bar Preacher Curl","categories_id":3},{"id":33,"name":"Seated Incline Dumbbell Curl","categories_id":3},{"id":34,"name":"Seated Machine Curl","categories_id":3},
    {"id":35,"name":"Cable Crossover","categories_id":4},{"id":36,"name":"Decline Barbell Bench Press","categories_id":4},{"id":37,"name":"Decline Hammer Strength Chest Press","categories_id":4},{"id":38,"name":"Flat Barbell Bench Press","categories_id":4},{"id":39,"name":"Flat Dumbbell Bench Press","categories_id":4},{"id":40,"name":"Flat Dumbbell Fly","categories_id":4},{"id":41,"name":"Incline Barbell Bench Press","categories_id":4},{"id":42,"name":"Incline Dumbbell Bench Press","categories_id":4},{"id":43,"name":"Incline Dumbbell Fly","categories_id":4},{"id":44,"name":"Incline Hammer Strength Chest Press","categories_id":4},{"id":45,"name":"Seated Machine Fly","categories_id":4},
    {"id":46,"name":"Barbell Row","categories_id":5},{"id":47,"name":"Barbell Shrug","categories_id":5},{"id":48,"name":"Chin Up","categories_id":5},{"id":49,"name":"Deadlift","categories_id":5},{"id":50,"name":"Dumbbell Row","categories_id":5},{"id":51,"name":"Good Morning","categories_id":5},{"id":52,"name":"Hammer Strength Row","categories_id":5},{"id":53,"name":"Lat Pulldown","categories_id":5},{"id":54,"name":"Machine Shrug","categories_id":5},{"id":55,"name":"Neutral Chin Up","categories_id":5},{"id":56,"name":"Pendlay Row","categories_id":5},{"id":57,"name":"Pull Up","categories_id":5},{"id":58,"name":"Rack Pull","categories_id":5},{"id":59,"name":"Seated Cable Row","categories_id":5},{"id":60,"name":"Straight-Arm Cable Pushdown","categories_id":5},{"id":61,"name":"T-Bar Row","categories_id":5},
    {"id":62,"name":"Barbell Calf Raise","categories_id":6},{"id":63,"name":"Barbell Front Squat","categories_id":6},{"id":64,"name":"Barbell Glute Bridge","categories_id":6},{"id":65,"name":"Barbell Squat","categories_id":6},{"id":66,"name":"Donkey Calf Raise","categories_id":6},{"id":67,"name":"Glute-Ham Raise","categories_id":6},{"id":68,"name":"Leg Extension Machine","categories_id":6},{"id":69,"name":"Leg Press","categories_id":6},{"id":70,"name":"Lying Leg Curl Machine","categories_id":6},{"id":71,"name":"Romanian Deadlift","categories_id":6},{"id":72,"name":"Seated Calf Raise Machine","categories_id":6},{"id":73,"name":"Seated Leg Curl Machine","categories_id":6},{"id":74,"name":"Standing Calf Raise Machine","categories_id":6},{"id":75,"name":"Stiff-Legged Deadlift","categories_id":6},{"id":76,"name":"Sumo Deadlift","categories_id":6},
    {"id":77,"name":"Ab-Wheel Rollout","categories_id":7},{"id":78,"name":"Cable Crunch","categories_id":7},{"id":79,"name":"Crunch","categories_id":7},{"id":80,"name":"Crunch Machine","categories_id":7},{"id":81,"name":"Decline Crunch","categories_id":7},{"id":82,"name":"Dragon Flag","categories_id":7},{"id":83,"name":"Hanging Knee Raise","categories_id":7},{"id":84,"name":"Hanging Leg Raise","categories_id":7},{"id":85,"name":"Plank","categories_id":7},{"id":86,"name":"Side Plank","categories_id":7},
    {"id":87,"name":"Cycling","categories_id":8},{"id":88,"name":"Elliptical Trainer","categories_id":8},{"id":89,"name":"Rowing Machine","categories_id":8},{"id":90,"name":"Running (Outdoor)","categories_id":8},{"id":91,"name":"Running (Treadmill)","categories_id":8},{"id":92,"name":"Stationary Bike","categories_id":8},{"id":93,"name":"Swimming","categories_id":8},{"id":94,"name":"Walking","categories_id":8}
];

const sampleData = {
    sampleLogs,
    sampleWorkouts,
    exerciseList,
    exerciseCategory,
    exerciseList_with_ids
};

export default sampleData;