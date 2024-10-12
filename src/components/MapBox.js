import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '../styles/MapBox.css';

// Set your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoiZXRoYW5tYW56eiIsImEiOiJjbTI1czVvOXgwOWprMmtzOW9qYnFwcmZsIn0.mldTmyEHKWqiqsuDf7ennA';

const MapBox = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
  
    useEffect(() => {
      if (map.current) return; // Initialize map only once
  
      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [103.851959, 1.290270], // Initial center (Singapore)
        zoom: 5,
      });
  
      // Add Directions Control to the map
      const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving', // Default profile (can change to cycling, walking)
      });
  
      // Add the directions control INSIDE the map
      map.current.addControl(directions, 'top-left'); // Use 'top-left' or other positions that are visible
  
      // Add Markers for Important Locations
      //new mapboxgl.Marker({ color: 'red' })
      //  .setLngLat([103.851959, 1.290270]) // Start point: Singapore port
      //  .setPopup(new mapboxgl.Popup().setText("Singapore Port")) // Optional: Popup
     //   .addTo(map.current);
  
      //new mapboxgl.Marker({ color: 'blue' })
     //   .setLngLat([106.005, 3.45]) // End point: Destination port
     //   .setPopup(new mapboxgl.Popup().setText("Destination Port"))
     //   .addTo(map.current);
  
      // Add Truck Route using a Line
      map.current.on('load', () => {
        map.current.addLayer({
          id: 'truck-route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [103.851959, 1.290270], // Singapore port
                  [104.006, 1.35],         // Mid-point (e.g., a warehouse)
                  [105.003, 2.35]          // Intermediate point
                ]
              }
            }
          },
          paint: {
            'line-color': '#ff0000', // Color to indicate truck route (red)
            'line-width': 4,
            'line-dasharray': [1, 2], // Dotted line style for road routes
          }
        });
  
        // Add Airplane Route using a Line
        map.current.addLayer({
          id: 'airplane-route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [105.003, 2.35], // Starting airport
                  [106.005, 3.45], // Ending airport
                ]
              }
            }
          },
          paint: {
            'line-color': '#0000ff', // Color to indicate airplane route (blue)
            'line-width': 3,
            'line-dasharray': [3, 3], // Dashed line style for airplane route
          }
        });
  
        // Add Boat Route using a Line
        map.current.addLayer({
          id: 'boat-route',
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: [
                  [106.005, 3.45], // Port start
                  [107.006, 4.25], // Final destination
                ]
              }
            }
          },
          paint: {
            'line-color': '#00ffff', // Color to indicate boat route (cyan)
            'line-width': 3,
            'line-dasharray': [5, 5], // Different dashed line style for boat route
          }
        });
      });
    }, []);
  
    return <div ref={mapContainer} className="map-container" />;
  };
  
  export default MapBox;