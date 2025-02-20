import React from 'react';
import { useLocation } from 'react-router-dom';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LabelList } from 'recharts';
import '../styles/DetailedReportPage.css';  
import { useNavigate } from 'react-router-dom';

// Sample data for the route
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
    },
    {
      leg_number: 2,
      transport_mode: "train",
      distance_km: 200,
      duration_hours: 3,
      cost_usd: 900,
    },
    
  ]
};

const CustomLabel = ({ x, y, width, height, value }) => (
  <g>
    <rect
      x={x + width + 10} // Position the rectangle just after the bar
      y={y} // Align the gray box with the top of the bar
      width={50} // Set a fixed width for the gray box
      height={height} // Set the height equal to the bar height
      fill="#999" // Gray color for the box
      rx={5} // Rounded corners
    />
    <text
      x={x + width + 35} // Center the text horizontally in the box
      y={y + height / 2} // Align the text vertically in the middle of the box
      fill="#ffffff" // White color for the text
      fontSize={12}
      textAnchor="middle"
      dominantBaseline="middle" // Vertically align the text within the box
    >
      {value}
    </text>
  </g>
);





const DashboardPage = () => {
  const navigate = useNavigate();  
  const { state } = useLocation();
  const { routeData } = state || {}; //comment/uncomment this to use sample or real data
  const legs = routeData?.legs || [];

  // Comment/uncomment based on whether you want to use sample data or real data
  //const routeData = sampleRouteData; // using sample data for now


  const costData = legs.map((leg) => ({
    transport: leg.transport_mode,
    total_cost: leg.cost_usd
  }));

  const distanceData = legs.map((leg) => ({
    transport: leg.transport_mode,
    distance: leg.distance_km
  }));

  const timeData = legs.map((leg) => ({
    transport: leg.transport_mode,
    total_duration: leg.duration_hours
  }));

  const costPerKmData = legs.map((leg) => ({
    transport: leg.transport_mode,
    cost_per_km: (leg.cost_usd / leg.distance_km).toFixed(2), // Calculate cost per kilometer
  }));

  const maxCostPerKm = Math.max(...costPerKmData.map((d) => parseFloat(d.cost_per_km)));


  const handleBackToSummary = () => {
    navigate('/summary');
  };

  return (
    <div className="dashboard-page">
      <h1>Transport Efficiency Dashboard</h1>

      {/* Container for the graphs */}
      <div className="dashboard-container">

        {/* Cost Breakdown */}
        <div className="dashboard-box-outer">
          <div className="dashboard-box">
            <h2>Cost Breakdown by Transport</h2>
            <BarChart width={500} height={300} data={costData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis type="number" stroke="#ffffff" />
              <YAxis dataKey="transport" type="category" stroke="#ffffff"  tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} />
          
              <Bar dataKey="total_cost" fill="#002855" >
              {costData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index === 0 ? "#001f3f" : "#66b2ff"} />
        ))}
        <LabelList dataKey="total_cost" content = {<CustomLabel />} />
      </Bar>
    </BarChart>
  </div>
</div>

        {/* Distance Breakdown (Pie Chart) */}
        <div className="dashboard-box-outer">
          <div className="dashboard-box pie-chart-container">
            <h2>Distance Breakdown by Transport</h2>
            <PieChart width={600} height={300}>
              <Pie
                data={distanceData}
                dataKey="distance"
                nameKey="transport"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#002855"
                labelLine = {false}
                label={({ name, percent, x, y }) => (
                  <text x={x} y={y} fill="#ffffff" textAnchor="middle" dominantBaseline="central">
                    {`${name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}: ${(percent * 100).toFixed(0)}%`}
                  </text>
                )} 
              >
                {distanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={["#002855", "#005f99", "#00aaff"][index % 3]} />
                ))}
              </Pie>
              <Legend 
              layout="horizontal" 
              align="center" 
              verticalAlign="bottom"
              iconType="plainline" 
              formatter={(value) => (
              <span style={{ color: "#ffffff" }}> {/* Ensuring the label color is white */}
              {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()} {/* Capitalizing first letter */}
              </span>
             )}
             />
            </PieChart>
          </div>
        </div>

        {/* Time Breakdown */}
        <div className="dashboard-box-outer">
          <div className="dashboard-box">
            <h2>Time Breakdown by Transport</h2>
            <BarChart width={500} height={300} data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis dataKey="transport" stroke="#ffffff"  tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}  />
            
              <YAxis 
              stroke="#ffffff" 
              tickFormatter={(value) => Math.round(value)} 
                />

              <Bar dataKey="total_duration" fill="#ffc658" />
            </BarChart>
          </div>
        </div>

     
      {/* Cost per Kilometer Breakdown (new graph) */}
<div className="dashboard-box-outer dashboard-box-bottom-right">
  <div className="dashboard-box">
    <h2>Cost per Kilometer by Transport</h2>
    <BarChart width={600} height={300} data={costPerKmData} layout="vertical" margin={{ top: 10, right: 50, left: 10, bottom: 10 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
      <XAxis 
  dataKey="cost_per_km" 
  type="number" 
  stroke="#ffffff" 
  domain={[0, maxCostPerKm * 1.5]} // Extending the range by 1.5 times
  tickFormatter={(value) => Math.round(value)}
  ticks={Array.from({ length: Math.ceil((maxCostPerKm * 1.5) / 1) + 1 }, (_, i) => i)} 
/>  
      <YAxis dataKey="transport" type="category" stroke="#ffffff" tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)} />
      <Bar dataKey="cost_per_km" fill="#8884d8">
        {costPerKmData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index === 0 ? "#001f3f" : "#66b2ff"} />
        ))}
        <LabelList dataKey="cost_per_km" content={<CustomLabel />} />
      </Bar>
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



