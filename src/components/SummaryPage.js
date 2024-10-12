import React, { useState, useEffect } from 'react';
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

  const API_KEY = '1dea9f37a3186ff0ea73530b24410323';  // OpenWeather API key

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
  // Function to fetch weather data for each set of coordinates
  const fetchWeatherForCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  };

  // Fetch weather data for all coordinates in route data
  useEffect(() => {
    const fetchWeatherData = async () => {
      const weatherPromises = [];

      // Fetch weather for start and end coordinates of each leg
      routeData?.legs?.forEach((leg) => {
        weatherPromises.push(fetchWeatherForCoordinates(leg.start_coordinates.latitude, leg.start_coordinates.longitude));
        weatherPromises.push(fetchWeatherForCoordinates(leg.end_coordinates.latitude, leg.end_coordinates.longitude));
      });

      // Fetch weather for waypoints
      routeData?.waypoints?.forEach((waypoint) => {
        weatherPromises.push(fetchWeatherForCoordinates(waypoint.coordinates.latitude, waypoint.coordinates.longitude));
      });

      // Wait for all weather data to be fetched
      const weatherResults = await Promise.all(weatherPromises);
      setWeatherData(weatherResults.filter(result => result !== null));  // Filter out failed API calls
    };

    fetchWeatherData();
  }, [routeData, setWeatherData]);

  const handleBackToHome = () => {
    navigate('/home');
  };

  const handleViewFullMap = async () => {
    try {
      const response = await axios.post('http://localhost:5000/process-route-data', routeData);
      const processedRouteData = response.data;
      navigate('/map', { state: { routeData: processedRouteData } });
    } catch (err) {
      setError("Failed to process route data for the map.");
      console.error("Error processing route data:", err);
    }
  };

  const handleViewMoreStatistics = () => {
    navigate('/detailed-report');
  };

  let backgroundImage = shipImage;

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
            <p><strong>Total Distance:</strong> {routeData?.route_summary?.total_distance_km || 0} km</p>
            <p><strong>Estimated Duration:</strong> {routeData?.route_summary?.estimated_duration_hours || 0} hours</p>
            <p><strong>Total Cost:</strong> ${routeData?.route_summary?.total_cost_usd || 0}</p>
          </div>

          <h2>Weather Information</h2>
          {weatherData.length > 0 ? (
            weatherData.map((weather, index) => (
              <div key={index} className="weather-info">
                <p><strong>Location {index + 1}:</strong> {weather.name}</p>
                <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
              </div>
            ))
          ) : (
            <p>Loading weather data...</p>
          )}

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
            style={{ backgroundColor: "#ffd700", color: "#000" }}
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

