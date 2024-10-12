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
    Provide the result in a JSON-like structured format, following this template strictly:

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
        },
        {
          "leg_number": 2,
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

    ### Additional Guidelines:
    1. **Origin and Destination Coordinates**: Always provide the start and end coordinates in the "start_coordinates" and "end_coordinates" fields respectively.
    2. **Intermediate Legs**: Break the journey into multiple legs if necessary, with each leg representing a change in transport mode or a stop at a waypoint.
    3. **Transport Modes**: Use only the following transport modes: "ship", "truck", "rail", "airplane", "drone".
    4. **Distance, Duration, and Cost**: Provide accurate estimates for distance, duration, and cost for each leg, and summarize them in the "route_summary".
    5. **Waypoints**: Include any important waypoints where cargo changes mode of transport, with accurate coordinates and the type of waypoint (e.g., port, airport, warehouse).

    ### Example Output:
    {
      "route_summary": {
        "total_distance_km": 1500,
        "estimated_duration_hours": 24,
        "total_cost_usd": 3500
      },
      "legs": [
        {
          "leg_number": 1,
          "start_coordinates": {
            "latitude": 37.7749,
            "longitude": -122.4194
          },
          "end_coordinates": {
            "latitude": 34.0522,
            "longitude": -118.2437
          },
          "transport_mode": "truck",
          "distance_km": 600,
          "duration_hours": 10,
          "cost_usd": 1200
        },
        {
          "leg_number": 2,
          "start_coordinates": {
            "latitude": 34.0522,
            "longitude": -118.2437
          },
          "end_coordinates": {
            "latitude": 36.1699,
            "longitude": -115.1398
          },
          "transport_mode": "ship",
          "distance_km": 900,
          "duration_hours": 14,
          "cost_usd": 2300
        }
      ],
      "waypoints": [
        {
          "name": "Los Angeles Port",
          "coordinates": {
            "latitude": 34.0522,
            "longitude": -118.2437
          },
          "type": "port"
        }
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