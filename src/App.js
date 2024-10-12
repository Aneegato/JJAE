import './App.css';
import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Lazy load components
const HomePage = lazy(() => import('./components/HomePage'));
const SummaryPage = lazy(() => import('./components/SummaryPage'));
const MapComponent = lazy(() => import('./components/MapComponent'));
const DetailedReportPage = lazy(() => import('./components/DetailedReportPage'));  // Import DetailedReportPage

function App() {
  // State to store routeData
  const [routeData, setRouteData] = useState(null);

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
            <Route path="/home" element={<HomePage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/map" element={<MapComponent routeData={routeData} />} />
            <Route path="/detailed-report" element={<DetailedReportPage />} /> {/* New route */}
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
