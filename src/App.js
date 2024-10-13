import './App.css';
import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load components
const HomePage = lazy(() => import('./components/HomePage'));
const SummaryPage = lazy(() => import('./components/SummaryPage'));
const MapComponent = lazy(() => import('./components/MapComponent'));
const DetailedReportPage = lazy(() => import('./components/DetailedReportPage'));

function App() {
  // State to store routeData and weatherData
  const [routeData, setRouteData] = useState(null);
  const [weatherData, setWeatherData] = useState([]);

  // Callback function to update routeData
  const handleRouteDataUpdate = (data) => {
    setRouteData(data);
  };

  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Define your routes */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage setRouteData={handleRouteDataUpdate} />} />
            
            {/* Pass routeData and setWeatherData to SummaryPage */}
            <Route path="/summary" element={
              <SummaryPage routeData={routeData} setWeatherData={setWeatherData} />
            } />
            
            {/* Pass routeData and weatherData to MapComponent */}
            <Route path="/map" element={
              <MapComponent routeData={routeData} weatherData={weatherData} />
            } />
            
            {/* Pass routeData and weatherData to DetailedReportPage */}
            <Route path="/detailed-report" element={<DetailedReportPage />} /> 
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
