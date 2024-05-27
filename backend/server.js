// Importing the neccessary libraries to create the application
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create an instance of an express application
const app = express();
// Define the port number the server will listen on
const port = 8888;

// Define the MongoDB connection URL, including authentication details and database name
const mongoDBURL = 'mongodb+srv://root:1234@survey.xpangjm.mongodb.net/surveyCollection?retryWrites=true&w=majority&appName=survey'

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use cors middleware to allow cross-origin requests
app.use(cors());

// Connect to MongoDB using mongoose
mongoose.connect(mongoDBURL)
.then(() => {
  console.log('App connected to database');
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
})
.catch((error) => {
  console.log(error);
});

// Import the surveyRoute module from the routes directory
const surveyRoute = require('./routes/surveyRoute');

// Use the surveyRoute for handling requests to the '/api/surveys' path
app.use('/api/surveys', surveyRoute);
