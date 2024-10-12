// src/components/MapComponent.js

import React, { useEffect, useRef } from 'react';
import '../styles/Map.css';

const MapComponent = ({ routeData }) => {
  const mapContainer = useRef(null);

  useEffect(() => {
    // Load Google Maps Script with the environment variable key
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=beta&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Define the initMap function for initializing Google Maps
      window.initMap = () => {
        const mapOptions = {
          center: { lat: 1.290270, lng: 103.851959 }, // Singapore coordinates
          zoom: 10,
          heading: 90,  // Direction of view (e.g., East)
          tilt: 45,     // Tilt for 3D effect
          mapTypeId: 'hybrid', // Optional: 'terrain', 'satellite', or 'hybrid' for better 3D effect
        };

        const map = new window.google.maps.Map(mapContainer.current, mapOptions);

        // Optionally adjust the heading and tilt after initialization
        map.setTilt(60);
        map.setHeading(90);

        // Define permanent colors for each mode of transport
        const transportColors = {
          truck: '#00FF00',   // Green
          plane: '#FF0000',   // Red
          ship: '#0000FF',    // Blue
          train: '#FFFF00'    // Yellow
        };

        // Loop through routeData to draw polylines and add markers
        if (routeData && routeData.length > 0) {
          routeData.forEach((segment, index) => {
            const color = transportColors[segment.mode] || '#FF0000'; // Default to red if mode is unknown

            // Create the polyline for each segment
            const polyline = new window.google.maps.Polyline({
              path: segment.coordinates,
              geodesic: true,
              strokeColor: color,
              strokeOpacity: 1.0,
              strokeWeight: 4,
              icons: [
                {
                  icon: {
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  },
                  offset: '100%',
                  repeat: '50px',
                },
              ],
            });
            polyline.setMap(map);

            // Add markers for start and end of each polyline segment
            const startMarker = new window.google.maps.Marker({
              position: segment.coordinates[0],
              map: map,
              title: `Start of ${segment.mode} route`,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: color,
                fillOpacity: 1,
                strokeWeight: 1,
                scale: 6,
              }
            });

            const endMarker = new window.google.maps.Marker({
              position: segment.coordinates[segment.coordinates.length - 1],
              map: map,
              title: `End of ${segment.mode} route`,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                fillColor: color,
                fillOpacity: 1,
                strokeWeight: 1,
                scale: 6,
              }
            });

            // Optionally, add additional markers if there are multiple waypoints
            if (segment.coordinates.length > 2) {
              for (let i = 1; i < segment.coordinates.length - 1; i++) {
                new window.google.maps.Marker({
                  position: segment.coordinates[i],
                  map: map,
                  title: `Waypoint on ${segment.mode} route`,
                  icon: {
                    path: window.google.maps.SymbolPath.CIRCLE,
                    fillColor: color,
                    fillOpacity: 0.8,
                    strokeWeight: 1,
                    scale: 4,
                  }
                });
              }
            }
          });
        }
      };
    };

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [routeData]);

  return <div ref={mapContainer} id="map" className="map-container"></div>;
};

export default MapComponent;
