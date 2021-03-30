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
        category_name: "Shoulders"
    },
    {
        id: 2,
        category_name: "Triceps"
    },
    {
        id: 3,
        category_name: "Biceps"
    },
    {
        id: 4,
        category_name: "Chest"
    },
    {
        id: 5,
        category_name: "Back"
    },
    {
        id: 6,
        category_name: "Legs"
    },
    {
        id: 7,
        category_name: "Abs"
    },
    {
        id: 8,
        category_name: "Cardio"
    },
]

// const exerciseList_with_ids = [[{"id":1,"exercise_name":"Arnold Dumbbell Press","categories_id":1},{"id":2,"exercise_name":"Behind The Neck Barbell Press","categories_id":1},{"id":3,"exercise_name":"Cable Face Pull","categories_id":1},{"id":4,"exercise_name":"Front Dumbbell Raise","categories_id":1},{"id":5,"exercise_name":"Hammer Strength Shoulder Press","categories_id":1},{"id":6,"exercise_name":"Lateral Dumbbell Raise","categories_id":1},{"id":7,"exercise_name":"Lateral Machine Raise","categories_id":1},{"id":8,"exercise_name":"Log Press","categories_id":1},{"id":9,"exercise_name":"One-Arm Standing Dumbbell Press","categories_id":1},{"id":10,"exercise_name":"Overhead Press","categories_id":1},{"id":11,"exercise_name":"Push Press","categories_id":1},{"id":12,"exercise_name":"Rear Delt Dumbbell Raise","categories_id":1},{"id":13,"exercise_name":"Seated Dumbbell Press","categories_id":1},{"id":14,"exercise_name":"Smith Machine Overhead Press","categories_id":1},{"id":15,"exercise_name":"Cable Overhead Triceps Extension","categories_id":2},{"id":16,"exercise_name":"Close Grip Barbell Bench Press","categories_id":2},{"id":17,"exercise_name":"Dumbbell Overhead Triceps Extension","categories_id":2},{"id":18,"exercise_name":"EZ-Bar Skullcrusher","categories_id":2},{"id":19,"exercise_name":"Lying Triceps Extension","categories_id":2},{"id":20,"exercise_name":"Parallel Bar Triceps Dip","categories_id":2},{"id":21,"exercise_name":"Ring Dip","categories_id":2},{"id":22,"exercise_name":"Rope Push Down","categories_id":2},{"id":23,"exercise_name":"Smith Machine Close Grip Bench Press","categories_id":2},{"id":24,"exercise_name":"V-Bar Push Down","categories_id":2},{"id":25,"exercise_name":"Barbell Curl","categories_id":3},{"id":26,"exercise_name":"Cable Curl","categories_id":3},{"id":27,"exercise_name":"Dumbbell Concentration Curl","categories_id":3},{"id":28,"exercise_name":"Dumbbell Curl","categories_id":3},{"id":29,"exercise_name":"Dumbbell Hammer Curl","categories_id":3},{"id":30,"exercise_name":"Dumbbell Preacher Curl","categories_id":3},{"id":31,"exercise_name":"EZ-Bar Curl","categories_id":3},{"id":32,"exercise_name":"EZ-Bar Preacher Curl","categories_id":3},{"id":33,"exercise_name":"Seated Incline Dumbbell Curl","categories_id":3},{"id":34,"exercise_name":"Seated Machine Curl","categories_id":3},{"id":35,"exercise_name":"Cable Crossover","categories_id":4},{"id":36,"exercise_name":"Decline Barbell Bench Press","categories_id":4},{"id":37,"exercise_name":"Decline Hammer Strength Chest Press","categories_id":4},{"id":38,"exercise_name":"Flat Barbell Bench Press","categories_id":4},{"id":39,"exercise_name":"Flat Dumbbell Bench Press","categories_id":4},{"id":40,"exercise_name":"Flat Dumbbell Fly","categories_id":4},{"id":41,"exercise_name":"Incline Barbell Bench Press","categories_id":4},{"id":42,"exercise_name":"Incline Dumbbell Bench Press","categories_id":4},{"id":43,"exercise_name":"Incline Dumbbell Fly","categories_id":4},{"id":44,"exercise_name":"Incline Hammer Strength Chest Press","categories_id":4},{"id":45,"exercise_name":"Seated Machine Fly","categories_id":4},{"id":46,"exercise_name":"Barbell Row","categories_id":5},{"id":47,"exercise_name":"Barbell Shrug","categories_id":5},{"id":48,"exercise_name":"Chin Up","categories_id":5},{"id":49,"exercise_name":"Deadlift","categories_id":5},{"id":50,"exercise_name":"Dumbbell Row","categories_id":5},{"id":51,"exercise_name":"Good Morning","categories_id":5},{"id":52,"exercise_name":"Hammer Strength Row","categories_id":5},{"id":53,"exercise_name":"Lat Pulldown","categories_id":5},{"id":54,"exercise_name":"Machine Shrug","categories_id":5},{"id":55,"exercise_name":"Neutral Chin Up","categories_id":5},{"id":56,"exercise_name":"Pendlay Row","categories_id":5},{"id":57,"exercise_name":"Pull Up","categories_id":5},{"id":58,"exercise_name":"Rack Pull","categories_id":5},{"id":59,"exercise_name":"Seated Cable Row","categories_id":5},{"id":60,"exercise_name":"Straight-Arm Cable Pushdown","categories_id":5},{"id":61,"exercise_name":"T-Bar Row","categories_id":5},{"id":62,"exercise_name":"Barbell Calf Raise","categories_id":6},{"id":63,"exercise_name":"Barbell Front Squat","categories_id":6},{"id":64,"exercise_name":"Barbell Glute Bridge","categories_id":6},{"id":65,"exercise_name":"Barbell Squat","categories_id":6},{"id":66,"exercise_name":"Donkey Calf Raise","categories_id":6},{"id":67,"exercise_name":"Glute-Ham Raise","categories_id":6},{"id":68,"exercise_name":"Leg Extension Machine","categories_id":6},{"id":69,"exercise_name":"Leg Press","categories_id":6},{"id":70,"exercise_name":"Lying Leg Curl Machine","categories_id":6},{"id":71,"exercise_name":"Romanian Deadlift","categories_id":6},{"id":72,"exercise_name":"Seated Calf Raise Machine","categories_id":6},{"id":73,"exercise_name":"Seated Leg Curl Machine","categories_id":6},{"id":74,"exercise_name":"Standing Calf Raise Machine","categories_id":6},{"id":75,"exercise_name":"Stiff-Legged Deadlift","categories_id":6},{"id":76,"exercise_name":"Sumo Deadlift","categories_id":6},{"id":77,"exercise_name":"Ab-Wheel Rollout","categories_id":7},{"id":78,"exercise_name":"Cable Crunch","categories_id":7},{"id":79,"exercise_name":"Crunch","categories_id":7},{"id":80,"exercise_name":"Crunch Machine","categories_id":7},{"id":81,"exercise_name":"Decline Crunch","categories_id":7},{"id":82,"exercise_name":"Dragon Flag","categories_id":7},{"id":83,"exercise_name":"Hanging Knee Raise","categories_id":7},{"id":84,"exercise_name":"Hanging Leg Raise","categories_id":7},{"id":85,"exercise_name":"Plank","categories_id":7},{"id":86,"exercise_name":"Side Plank","categories_id":7},{"id":87,"exercise_name":"Cycling","categories_id":8},{"id":88,"exercise_name":"Elliptical Trainer","categories_id":8},{"id":89,"exercise_name":"Rowing Machine","categories_id":8},{"id":90,"exercise_name":"Running (Outdoor)","categories_id":8},{"id":91,"exercise_name":"Running (Treadmill)","categories_id":8},{"id":92,"exercise_name":"Stationary Bike","categories_id":8},{"id":93,"exercise_name":"Swimming","categories_id":8},{"id":94,"exercise_name":"Walking","categories_id":8}]]

const sampleData = {
    sampleLogs,
    sampleWorkouts,
    exerciseList,
    exerciseCategory
};

export default sampleData;