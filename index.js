const express = require('express');
const app = express();

// Home page
app.get('/', async (req, res) => {
    await res.send('This will be the home page');
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})