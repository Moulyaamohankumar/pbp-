const express = require('express'); 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./user'); // Make sure this exports a valid router

const port = 3000; // Port number for the server

// Middleware
app.use(cors());
// app.use(bodyParser.json()); // Middleware to parse JSON bodies
// app.use(express.json());

// Use the user router for all routes starting with '/'
app.use('/', userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
