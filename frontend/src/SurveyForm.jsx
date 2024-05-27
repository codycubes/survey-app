// Import the necessary libraries and components required
import { useState } from 'react';
import axios from 'axios';
import './SurveyForm.css';

// Define the SurveyForm component
function SurveyForm() {

  // State hooks for managing form inputs and errors
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [favoriteFoods, setFavoriteFoods] = useState([]);
  const [error, setError] = useState('');
  const [ratings, setRatings] = useState({
    movies: 0,
    radio: 0,
    eatOut: 0,
    tv: 0,
  });

  // Handler for date change to calculate and set age
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    let calculatedAge = today.getFullYear() - selectedDate.getFullYear();
    const monthDifference = today.getMonth() - selectedDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < selectedDate.getDate())) {
      calculatedAge--;
    }

    setDob(e.target.value);
    setAge(calculatedAge);

    if (calculatedAge < 5 || calculatedAge > 120) {
      setError('Age must be between 5 and 120 years.');
    } else {
      setError('');
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prepare survey data to be submitted
    const surveyData = { name, email, age: parseInt(age), contact, favoriteFoods, ratings };
    try {
      // Send survey data to the server
      await axios.post('http://localhost:8888/api/surveys', surveyData);
      alert('Survey submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the survey!', error);
    }
  };

  // Handler for checkbox change to manage favorite foods
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFavoriteFoods((prev) => 
      checked ? [...prev, value] : prev.filter((food) => food !== value)
    );
  };

  // Handler for rating change to update ratings state
  const handleRatingChange = (e) => {
    const { name, value } = e.target;
    setRatings((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className='formSection'>
          <div className='text'>
            <label>Personal Details</label>
          </div>

          <div className='group'>
            <div className="formGroup">
              <label>Name:</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="formGroup">
              <label>Email:</label>
              <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className="formGroup">
              <label>Date of Birth:</label>
              <input type="date" value={dob} onChange={handleDateChange} required />
              {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>

            <div className="formGroup">
              <label>Contact Number:</label>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
            </div>
          </div>
        </div>

        <div className='formSection'>
          <div className='text'>
            <label>What is Your Favorite Foods:</label>
          </div>

          <div className="formGroup">
            <div className="checkboxGroup">
              <label>
                <input type="checkbox" value="Pizza" onChange={handleCheckboxChange} /> Pizza
              </label>
              <label>
                <input type="checkbox" value="Pasta" onChange={handleCheckboxChange} /> Pasta
              </label>
              <label>
                <input type="checkbox" value="Pap And Wors" onChange={handleCheckboxChange} /> Pap And Wors
              </label>
              <label>
                <input type="checkbox" value="Others" onChange={handleCheckboxChange} /> Others
              </label>
            </div>
          </div>
        </div>

        <label>Please rate your level of agreement on a scale of 1 to 5, 
          with 1 being "strongly agree" and 5 being "strongly disagree"</label>

        <div className="ratingsTable">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Strongly Agree</th>
                <th>Agree</th>
                <th>Neutral</th>
                <th>Disagree</th>
                <th>Strongly Disagree</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'movies', label: 'I like to watch movies:' },
                { name: 'radio', label: 'I like to listen to radio:' },
                { name: 'eatOut', label: 'I like to eat out:' },
                { name: 'tv', label: 'I like to watch TV:' }
              ].map((item) => (
                <tr key={item.name}>
                  <td>{item.label}</td>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <td key={value}>
                      <input 
                        type="radio" 
                        name={item.name} 
                        value={value} 
                        onChange={handleRatingChange} 
                        required 
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="submitContainer">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

// Export the SurveyForm component as the default export
export default SurveyForm;
