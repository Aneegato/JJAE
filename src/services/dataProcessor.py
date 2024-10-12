from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)
logging.basicConfig(level=logging.DEBUG)

@app.route('/process-route-data', methods=['POST'])
def process_route_data():
    try:
        # Log received data
        route_information = request.get_json()
        app.logger.info(f"Received route data: {route_information}")

        # Process the data
        route_data = convert_route_data(route_information)

        # Return processed route data
        return jsonify(route_data)

    except Exception as e:
        app.logger.error(f"Error processing route data: {str(e)}")
        return jsonify({"error": str(e)}), 500

def convert_route_data(route_information):
    route_data = []

    # Sample processing logic (ensure route_information is valid)
    if not route_information or "legs" not in route_information:
        raise ValueError("Invalid route data provided")

    for leg in route_information["legs"]:
        route_data.append({
            "mode": leg["transport_mode"],
            "coordinates": [
                {
                    "lat": leg["start_coordinates"]["latitude"],
                    "lng": leg["start_coordinates"]["longitude"]
                },
                {
                    "lat": leg["end_coordinates"]["latitude"],
                    "lng": leg["end_coordinates"]["longitude"]
                }
            ]
        })

    return route_data

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
