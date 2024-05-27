// Import the Survey model from the surveyModel file
const Survey = require('../models/surveyModel');

/**
 * Create a new survey
 * @param {object} req - The request object containing the survey data in the body
 * @param {object} res - The response object to send the result or error
 */
exports.createSurvey = async (req, res) => {
  try {
    // Create a new survey instance with the data from the request body
    const survey = new Survey(req.body);
    
    // Save the survey to the database
    await survey.save();
    
    // Send a response with status 201 (Created) and the saved survey data
    res.status(201).send(survey);
  } catch (error) {
    // Send a response with status 400 (Bad Request) and the error message
    res.status(400).send(error);
  }
};


exports.getSurveyResults = async (req, res) => {
  try {
    // Retrieve all surveys from the database
    const surveys = await Survey.find();
    
    // Calculate the total number of surveys
    const totalSurveys = surveys.length;
    
    // Calculate the average age of the respondents
    const averageAge = surveys.reduce((sum, survey) => sum + survey.age, 0) / totalSurveys;
    
    // Find the oldest and youngest ages among the respondents
    const oldest = Math.max(...surveys.map(survey => survey.age));
    const youngest = Math.min(...surveys.map(survey => survey.age));
    
    // Calculate the percentage of respondents who love Pizza
    const pizzaLovers = surveys.filter(survey => survey.favoriteFoods.includes('Pizza')).length;
    const pizzaLoversPercentage = (pizzaLovers / totalSurveys) * 100;
    
    // Calculate the percentage of respondents who love Pasta
    const pastaLovers = surveys.filter(survey => survey.favoriteFoods.includes('Pasta')).length;
    const pastaLoversPercentage = (pastaLovers / totalSurveys) * 100;
    
    // Calculate the percentage of respondents who love Pap and Wors
    const papLovers = surveys.filter(survey => survey.favoriteFoods.includes('Pap And Wors')).length;
    const papLoversPercentage = (papLovers / totalSurveys) * 100;
    
    // Helper function to calculate the average rating for a given field
    const averageRating = (field) => surveys.reduce((sum, survey) => sum + survey.ratings[field], 0) / totalSurveys;
    
    // Send a response with various calculated statistics
    res.send({
      totalSurveys,
      averageAge,
      oldest,
      youngest,
      pizzaLoversPercentage: pizzaLoversPercentage.toFixed(1),
      pastaLoversPercentage: pastaLoversPercentage.toFixed(1),
      papLoversPercentage: papLoversPercentage.toFixed(1),
      averageMovies: averageRating('movies').toFixed(1),
      averageRadio: averageRating('radio').toFixed(1),
      averageEatOut: averageRating('eatOut').toFixed(1),
      averageTV: averageRating('tv').toFixed(1)
    });
  } catch (error) {
    // Send a response with status 500 (Internal Server Error) and the error message
    res.status(500).send(error);
  }
};
