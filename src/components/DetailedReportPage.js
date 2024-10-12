import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { BarChart, Bar } from 'recharts';
import '../styles/DetailedReportPage.css';  
import { useNavigate } from 'react-router-dom';

// hardcode
const emissionsData = [
  { year: 2015, emissions: 20 },
  { year: 2016, emissions: 22 },
  { year: 2017, emissions: 18 },
  { year: 2018, emissions: 25 },
  { year: 2019, emissions: 28 },
  { year: 2020, emissions: 24 },
];

const costSavingsData = [
  { route: 'Route A', savings: 500 },
  { route: 'Route B', savings: 700 },
  { route: 'Route C', savings: 350 },
  { route: 'Route D', savings: 900 },
];

const DashboardPage = () => {
    const navigate = useNavigate();  

    const handleBackToSummary = () => {
        navigate('/summary');
    };
    return (
      <div className="dashboard-page">
        <h1>Transport Efficiency Dashboard</h1>
  
        {/* Container for CO2 Emissions */}
        <div className="dashboard-container">
  
          {/* Outer Container for CO2 Emissions with blue border */}
          <div className="dashboard-box-outer">
            <div className="dashboard-box">
              <h2>CO2 Emissions Over Time</h2>
              <LineChart width={500} height={300} data={emissionsData}>
                <Line type="monotone" dataKey="emissions" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
              </LineChart>
            </div>
          </div>
  
          {/* Outer Container for Cost Savings with blue border */}
          <div className="dashboard-box-outer">
            <div className="dashboard-box">
              <h2>Cost Savings per Route</h2>
              <BarChart width={500} height={300} data={costSavingsData}>
                <Bar dataKey="savings" fill="#82ca9d" />
                <XAxis dataKey="route" />
                <YAxis />
                <Tooltip />
              </BarChart>
            </div>
          </div>
          </div>

        {/* Back to Summary button */}
        <button onClick={handleBackToSummary} className="back-button">
          Back to Summary
        </button>
      </div>
    );
  };

  export default DashboardPage;