import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/SummaryPage.css';  // Import CSS file for styles
import { generateRoute } from '../services/routeOptimization.js'
// Import the transportation images
import airImage from '../assets/plane_transportation.jpeg';
import shipImage from '../assets/boat.jpeg';
import truckImage from '../assets/truck.jpeg';
import trainImage from '../assets/train_transportation.jpeg';  

const SummaryPage = ({ transportType }) => {
  const navigate = useNavigate();  // Initialize the navigate function
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState("");
  const [routeData, setRouteData] = useState(null);

  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleViewFullMap = () => {
    navigate('/map');
  };

  const handleViewMoreStatistics = () => {
    navigate('/detailed-report');  // Navigate to the Detailed Report page
  };

  const handleRouteOptimization = async () => {
    setLoading(true);
    setError("");

    try {
      const start = "37.7749,-122.4194"; 
      const end = "34.0522,-118.2437";   
      const route = await generateRoute(start, end);

      setRouteData(route);
      console.log(route);
    } catch (err) {
      setError("Failed to generate the route.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  let backgroundImage;
  switch (transportType) {
    case 'air':
      backgroundImage = airImage;
      break;
    case 'ship':
      backgroundImage = shipImage;
      break;
    case 'truck':
      backgroundImage = truckImage;
      break;
    case 'train':
      backgroundImage = trainImage;
      break;
    default:
      backgroundImage = shipImage; // If no transportType is provided
  }

  return (
    <div className="summary-page">
      <h1>Calculation Summary</h1>

      <div className="summary-container">
        {/* Left Section - Dynamic background image */}
        <div 
          className="left-section"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',  // Full viewport height
          }}
        >
        
        </div>

        {/* Right Section - Summary Data */}
        <div className="right-section">
          <h2>Results</h2>
          <div className="activity-timeline">
            <p><strong>ETA:</strong> 2 hours</p>
            <p><strong>Distance:</strong> 150 km</p>
            <p><strong>Cost:</strong> $500</p>
          </div>

          {/* DaisyUI Button for Optimize Route */}
          <button 
            className="btn"
            onClick={handleRouteOptimization}
            style={{ backgroundColor: "#13b63a", color: "#fff" }}
          >
            {loading ? 'Loading...' : 'Optimize Route'}
          </button>

          {/* Error message */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* DaisyUI Button for View Full Map */}
          <button 
            className="btn"
            onClick={handleViewFullMap}
            style={{ backgroundColor: "#1C8849", color: "#fff" }}
          >
            View Full Map
          </button>

          {/* DaisyUI Button for View More Statistics */}
          <button 
            className="btn"
            onClick={handleViewMoreStatistics}
            style={{ backgroundColor: "#ffd700", color: "#000" }}  // Custom color for this button
          >
            View More Statistics
          </button>

          {/* DaisyUI Button for Back to Home */}
          <button 
            className="btn"
            onClick={handleBackToHome}
            style={{ backgroundColor: "#faeede", color: "#000" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
