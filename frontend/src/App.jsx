// Import the necessary libraries and components
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SurveyForm from './SurveyForm';
import SurveyResults from './SurveyResults';
import './App.css'

// Define the main App component
function App() {
  return (
    // Use Router to enable routing in the application
    <Router>
      <>
        {/* Define the navigation bar */}
        <nav className='navbar'>
          <div className="logo">surveyApp</div>
          <div className="menu">
            <Link to="/"> Fill Out Survey </Link>
            <Link to="/results"> View Survey Results </Link>
          </div>
        </nav>
        {/* Define the routes for the application */}
        <Routes>
          <Route path="/" element={<SurveyForm />} />
          <Route path="/results" element={<SurveyResults />} />
        </Routes>
      </>
    </Router>
  );
}

// Export the App component as the default export
export default App;
