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
  // const { routeData } = state || {}; // Assuming routeData comes from props or navigation state
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [hasFetchedWeather, setHasFetchedWeather] = useState(false); // New state to track if weather data has been fetched

  const API_KEY = '1dea9f37a3186ff0ea73530b24410323';  // OpenWeather API key

  const sampleRouteData = {
    route_summary: {
      total_distance_km: 25000,
      estimated_duration_hours: 45,
      total_cost_usd: 2000,
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

  const routeData = sampleRouteData;

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
      if (hasFetchedWeather) return; // Prevent re-fetching if already done

      const weatherPromises = [];
      const seenCoordinates = new Set();  // To track unique coordinates

      const getCoordKey = (lat, lon) => `${lat},${lon}`;  // Helper function to create a unique key for lat/lon

      // Add start point to the beginning
      if (routeData?.legs?.length > 0) {
        const startLeg = routeData.legs[0];
        weatherPromises.push(fetchWeatherForCoordinates(startLeg.start_coordinates.latitude, startLeg.start_coordinates.longitude));
        seenCoordinates.add(getCoordKey(startLeg.start_coordinates.latitude, startLeg.start_coordinates.longitude));
      }

      // Process legs of the trip
      routeData?.legs?.forEach((leg) => {
        const legStartKey = getCoordKey(leg.start_coordinates.latitude, leg.start_coordinates.longitude);
        const legEndKey = getCoordKey(leg.end_coordinates.latitude, leg.end_coordinates.longitude);
        
        // Avoid duplicates and add leg start and end points
        if (!seenCoordinates.has(legStartKey)) {
          seenCoordinates.add(legStartKey);
          weatherPromises.push(fetchWeatherForCoordinates(leg.start_coordinates.latitude, leg.start_coordinates.longitude));
        }

        if (!seenCoordinates.has(legEndKey)) {
          seenCoordinates.add(legEndKey);
          weatherPromises.push(fetchWeatherForCoordinates(leg.end_coordinates.latitude, leg.end_coordinates.longitude));
        }
      });

      // Process waypoints
      routeData?.waypoints?.forEach((waypoint) => {
        const waypointKey = getCoordKey(waypoint.coordinates.latitude, waypoint.coordinates.longitude);
        if (!seenCoordinates.has(waypointKey)) {
          seenCoordinates.add(waypointKey);
          weatherPromises.push(fetchWeatherForCoordinates(waypoint.coordinates.latitude, waypoint.coordinates.longitude));
        }
      });

      // Add the end point of the last leg as the final location
      if (routeData?.legs?.length > 0) {
        const lastLeg = routeData.legs[routeData.legs.length - 1];
        const endCoordKey = getCoordKey(lastLeg.end_coordinates.latitude, lastLeg.end_coordinates.longitude);
        if (!seenCoordinates.has(endCoordKey)) {
          weatherPromises.push(fetchWeatherForCoordinates(lastLeg.end_coordinates.latitude, lastLeg.end_coordinates.longitude));
        }
      }

      // Wait for all weather data to be fetched
      const weatherResults = await Promise.all(weatherPromises);
      setWeatherData(weatherResults.filter(result => result !== null));  // Filter out failed API calls
      setHasFetchedWeather(true); // Mark as fetched

      // Log weather information for debugging
      console.log("Fetched Weather Data:", weatherResults);
    };

    fetchWeatherData();
  }, [routeData, hasFetchedWeather, setWeatherData]);

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
    navigate('/detailed-report', { state: { routeData: routeData} }); // Pass routeData to the detailed report
  };

  const riskScoreValue = 70; // Risk score value for illustration

  const getRiskScoreColorClass = (value) => {
    if (value <= 30) {
      return "text-green-600";  // Green for values <= 30
    } else if (value <= 65) {
      return "text-yellow-600";  // Yellow for values between 31 and 65
    } else {
      return "text-red-600";  // Red for values above 65
    }
  };

  return (
    <div className="summary-container">
      {/* Risk Score Section */}
      <div className="risk-score-container">
        <h2 className="risk-score-title">Risk Score</h2>
        <div
          className={`radial-progress ${getRiskScoreColorClass(riskScoreValue)}`}
          style={{
            "--value": riskScoreValue,
            "--size": "25rem",
            "--thickness": "1.7rem",
          }}
          role="progressbar"
        >
          <span className="risk-score-value">{riskScoreValue}</span>
        </div>
      </div>

      {/* Weather Information Section */}
      <div className="weather-container">
        <h2 className="weather-title">Weather Information</h2>
        {weatherData.length > 0 ? (
            weatherData.map((weather, index) => (
              <div key={index} className="weather-location">
                <p><strong>Location {index + 1}:</strong> {weather.name}</p>
                <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
                <p><strong>Condition:</strong> {weather.weather[0].description}</p>
                <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
                <p>----------------</p>
              </div>
            ))
          ) : (
            <p>Loading weather data...</p>
          )}
      </div>

      {/* Updated Stats Section with DaisyUI Component */}
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Distance</div>
          <div className="stat-value">{routeData?.route_summary?.total_distance_km || 0} km</div>
        </div>

        <div className="stat">
          <div className="stat-title">Estimated Duration</div>
          <div className="stat-value">{routeData?.route_summary?.estimated_duration_hours || 0} hours</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Cost</div>
          <div className="stat-value">{routeData?.route_summary?.total_cost_usd || 0} USD</div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="buttons-container">
        <button className="btn btn-success" onClick={handleViewFullMap}>View Full Map</button>
        <button className="btn btn-warning" onClick={handleViewMoreStatistics}>View More Statistics</button>
        <button className="btn btn" onClick={handleBackToHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default SummaryPage;
