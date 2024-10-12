from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process-route-data', methods=['POST'])
def process_route_data():
    route_information = request.get_json()  # Get the incoming route data JSON
    if not route_information:
        return jsonify({"error": "No route information provided"}), 400

    try:
        route_data = convert_route_data(route_information)
        return jsonify(route_data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def convert_route_data(route_information):
    route_data = []

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
