// Import the necessary libraries and components required
import { useEffect, useState } from 'react';
import axios from 'axios';
import './SurveyResults.css';

// Define the SurveyResults component
function SurveyResults() {

  // State hook for storing the survey results
  const [results, setResults] = useState(null);

  // useEffect hook to fetch survey results when the component mounts
  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Send a GET request to fetch survey results from the server
        const response = await axios.get('http://localhost:8888/api/surveys');
        // Update the results state with the fetched data
        setResults(response.data);
      } catch (error) {
        console.error('There was an error fetching the survey results!', error);
      }
    };
    fetchResults();
  }, []);

  // Display a loading message while the results are being fetched
  if (!results) return <div>Loading...</div>;

  return (
    <div className="containerResults">
      <h1>Survey Results</h1>
      {/* Display various statistics from the survey results */}
      <div className="resultItem">Total Surveys Completed: {results.totalSurveys}</div>
      <div className="resultItem">Average Age: {results.averageAge.toFixed(1)}</div>
      <div className="resultItem">Oldest Person who participated: {results.oldest}</div>
      <div className="resultItem">Youngest Person who participated: {results.youngest}</div>
      <br></br>
      <div className="resultItem">Percentage of people who Like Pizza: {results.pizzaLoversPercentage}% Pizza</div>
      <div className="resultItem">Percentage of people Who Like Pasta: {results.pastaLoversPercentage}% Pasta</div>
      <div className="resultItem">Percentage of people Who Like Pap and Wors: {results.papLoversPercentage}% Pap and Wors</div>
      <br></br>
      <div className="resultItem">People who like movies: {results.averageMovies} average of rating</div>
      <div className="resultItem">People who listen to the radio: {results.averageRadio} average of rating</div>
      <div className="resultItem">People who like to eat out: {results.averageEatOut} average of rating</div>
      <div className="resultItem">People who like to watch TV: {results.averageTV} average of rating</div>
    </div>
  );
}

// Export the SurveyResults component as the default export
export default SurveyResults;
