README

Youtube Presentation Link: https://youtu.be/qEDYL4ML-w0

Project Setup Instructions

This document outlines the steps required to run the front end, back end, and data processing components of this project.

Prerequisites
Make sure you have the following installed on your system:

Node.js (to run the front end and back end)
Python 3.x (to run the data processor)
npm (comes with Node.js)

Startup Procedures
In the backend directory, create a .env file with the following content
OPENAI_API_KEY=<your-openai-api-key> 
In the root directory, create a .env file with the following content
REACT_APP_GOOGLE_MAPS_API_KEY=<your-google_maps-api-key>

 Start the Frontend
Open a terminal and navigate to the root directory of the project.
Install the necessary dependencies for the frontend by running:
npm install
Once the dependencies are installed, start the frontend by running:

npm start
This will launch the frontend application on your local machine, typically at http://localhost:3000.

3. Start the Backend Server
Open a new terminal window (or tab) and navigate to the project's root directory.
Change directory to the backend folder:

cd backend

Start the server by running:
node server.js

This will start the backend server, which typically runs on http://localhost:3001

4. Run the Data Processor Script
Open another new terminal window (or tab) and navigate to the project's root directory.
Change directory to src:
cd src

Then navigate to the services folder:
cd services



Run the Python data processing script by executing:
python dataProcessor.py

This will start the data processing service, which might be required for backend or data handling.

Notes:
Ensure that you have all the necessary dependencies before starting each service.

If you encounter any issues with dependencies or versions, check the package.json file for required Node.js dependencies and ensure your Python environment is set up with any necessary libraries specified in dataProcessor.py.

Steps to Try the Project:

HomePage:
	•	On the homepage, input the starting and ending destinations along with an optional budget.
	•	Click “Calculate” to submit the form.
SummaryPage:
	•	After clicking “Calculate”, you will be taken to the SummaryPage, where you’ll see the optimised route.
	•	The page will display the estimated time, distance, and cost of the trip.
	•	Weather information along the route will also be displayed.
	•	You will also be shown a dynamic risk score based on geopolitical, weather, and operational risks.
Interactive Map:
	•	You can view the calculated route on an interactive map by clicking “View Full Map”.
Additional details
	•	You can view additional details regarding the route by clicking “View more statistics”.



Stopping the Services

To stop any of the running services:
Frontend: In the terminal window running npm start, press Ctrl + C.
Backend: In the terminal window running node server.js, press Ctrl + C.
Data Processor: In the terminal window running python dataProcessor.py, press Ctrl + C.
Troubleshooting

Ensure that you are using the correct versions of Node.js and Python to avoid compatibility issues.

If any service fails to start, check for error messages in the terminal and resolve any missing dependencies by running npm install (for Node.js) or installing the necessary Python packages via pip install.



