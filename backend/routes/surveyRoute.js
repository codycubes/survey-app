// Import the express library
const express = require('express');

// Import the surveyController module from the controllers directory
const surveyController = require('../controllers/surveyController');

// Create a new router object
const router = express.Router();

// Define a POST route to create a new survey
// When a POST request is made to the root path '/', the createSurvey function from surveyController is called
router.post('/', surveyController.createSurvey);

// Define a GET route to fetch survey results
// When a GET request is made to the root path '/', the getSurveyResults function from surveyController is called
router.get('/', surveyController.getSurveyResults);

// Export the router object for use in other parts of the application
module.exports = router;
