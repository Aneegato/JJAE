import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import '../styles/SummaryPage.css';  
import airImage from '../assets/plane_transportation.jpeg';
import shipImage from '../assets/boat.jpeg';
import truckImage from '../assets/truck.jpeg';
import trainImage from '../assets/train_transportation.jpeg';  
import axios from 'axios';

const SummaryPage = () => {
  const navigate = useNavigate();  
  const { state } = useLocation();
  const { routeData } = state || {};
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState([]);

  const API_KEY = '1dea9f37a3186ff0ea73530b24410323';

  const sampleRouteData = {
    route_summary: {
      total_distance_km: 150,
      estimated_duration_hours: 2,
      total_cost_usd: 500,
    },
    legs: [
      {
        leg_number: 1,
        start_coordinates: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
        end_coordinates: {
          latitude: 34.0522,
          longitude: -118.2437,
        },
        transport_mode: "truck",
        distance_km: 150,
        duration_hours: 2,
        cost_usd: 500,
      }
    ]
  };

  // Use real route data if available, otherwise use the sample data
  //const routeData = sampleRouteData;
  


  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleViewFullMap = async () => {
    try {
      // Send routeData to Python backend for processing
      const response = await axios.post('http://localhost:5000/process-route-data', routeData);
      const processedRouteData = response.data;
  
      // Navigate to the Map page and pass in processedRouteData 
      navigate('/map', { state: { routeData: processedRouteData } });
    } catch (err) {
      setError("Failed to process route data for the map.");
      console.error("Error processing route data:", err);
    }
  };
  

  const handleViewMoreStatistics = () => {
    navigate('/detailed-report');  // Navigate to the Detailed Report page
  };

  
  let backgroundImage = shipImage
  // switch (transportType) {
  //   case 'air':
  //     backgroundImage = airImage;
  //     break;
  //   case 'ship':
  //     backgroundImage = shipImage;
  //     break;
  //   case 'truck':
  //     backgroundImage = truckImage;
  //     break;
  //   case 'train':
  //     backgroundImage = trainImage;
  //     break;
  //   default:
  //     backgroundImage = shipImage; // If no transportType is provided
  // }

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
