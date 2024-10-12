import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom'; 
import '../styles/HomePage.css';  
import background from '../assets/background.jpg';  
import logo from '../assets/clear_sail_logo.png'; 

const HomePage = () => {
  const [startDestination, setStartDestination] = useState('');
  const [endDestination, setEndDestination] = useState('');
  const [budget, setBudget] = useState('');
  
  const navigate = useNavigate();  // Initialize navigate function
  
  // Handle form submission (for example, on clicking the CALCULATE button)
  const handleSubmit = () => {
    // Here you could validate inputs or perform actions before navigation
    console.log('Start:', startDestination, 'End:', endDestination, 'Budget:', budget);
    navigate('/summary');  // Navigate to the SummaryPage route
  };

  
  return (
    <div className="homepage-container">
      <img src={background} alt="Background" className="background-image" />
      <div className="overlay"></div>
      <div className="content-container">
        <img src={logo} alt="Clear Sail Logo" className="logo" />

        {/* Input field for the start destination */}
        <div className="input-field">
          <input
            type="text"
            placeholder="Enter your start destination"
            value={startDestination}  // Bind input to state
            onChange={(e) => setStartDestination(e.target.value)}  // Update state on change
          />
        </div>

        {/* Input field for the end destination */}
        <div className="input-field">
          <input
            type="text"
            placeholder="Enter your end destination"
            value={endDestination}  // Bind input to state
            onChange={(e) => setEndDestination(e.target.value)} 
          />
        </div>

        {/* Input field for the monetary budget */}
        <div className="input-field">
          <input
            type="text"
            placeholder="Monetary Budget"
            value={budget}  
            onChange={(e) => setBudget(e.target.value)} 
          />
        </div>

        {/* Button to handle form submission and navigate */}
        <button className="calculate-button" onClick={handleSubmit}>
          CALCULATE
        </button>
      </div>
    </div>
  );
};

export default HomePage;

