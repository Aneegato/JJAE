import axios from "axios";

const BASE_URL = 'http://localhost:3001/api';

export async function generateRoute(start, end) {
  console.log("reached generateRoute");
  try {
    const prompt = `
    You are an expert logistics and route optimization AI. Your task is to generate the most optimal transportation route between a start point and an endpoint based on the provided information. The route should minimize time and cost, and consider the efficiency of different modes of transport (e.g., ship, truck, rail).

    Please follow the instructions below carefully and format your response exactly as requested. Do not include any additional information or explanations outside of the given format.

    ### Input:
    - Start Point: ${start} (latitude, longitude)
    - End Point: ${end} (latitude, longitude)

    ### Output format:
    Strictly return a JSON object in the following format without any explanation or additional text:

    {
      "route_summary": {
        "total_distance_km": <total distance in kilometers>,
        "estimated_duration_hours": <total time in hours>,
        "total_cost_usd": <total estimated cost in USD>
      },
      "legs": [
        {
          "leg_number": 1,
          "start_coordinates": {
            "latitude": <latitude>,
            "longitude": <longitude>
          },
          "end_coordinates": {
            "latitude": <latitude>,
            "longitude": <longitude>
          },
          "transport_mode": "<mode of transport, e.g., truck, ship, etc.>",
          "distance_km": <distance for this leg in kilometers>,
          "duration_hours": <duration for this leg in hours>,
          "cost_usd": <cost for this leg in USD>
        }
        // Add more legs if necessary
      ],
      "waypoints": [
        {
          "name": "<name of waypoint, e.g., port, warehouse, airport>",
          "coordinates": {
            "latitude": <latitude>,
            "longitude": <longitude>
          },
          "type": "<waypoint type, e.g., port, airport, etc.>"
        }
        // Add more waypoints if necessary
      ]
    }
    `;

    const response = await axios.post(`${BASE_URL}/generate-route`, { prompt });
    const optimizedRoute = response.data.route;
    return optimizedRoute; 

  } catch (error) {
    console.error("Error generating routes:", error);
    throw new Error("Failed to generate routes.");
  }
}