const express = require('express');
const app = express();
const port = 3000;

// Add code to use and mount your controllers/routes here

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
