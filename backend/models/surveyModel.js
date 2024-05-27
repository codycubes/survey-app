// Import the mongoose library
const mongoose = require('mongoose');

// Define the schema for the survey collection
const surveySchema = new mongoose.Schema({
  // Define the fields as their data types and make them required fields
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  contact: { type: Number, required: true },
  favoriteFoods: { type: [String], required: true },
  
  // Define the 'ratings' field as an embedded document
  ratings: {
    movies: { type: Number, required: true },
    radio: { type: Number, required: true },
    eatOut: { type: Number, required: true },
    tv: { type: Number, required: true }
  }
});

// Create a model named 'Survey' using the surveySchema
const Survey = mongoose.model('Survey', surveySchema);

// Export the Survey model for use in other parts of the application
module.exports = Survey;
