// src/components/MapComponent.js
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Map.css';

const MapComponent = () => {
  const { state } = useLocation();
  const { routeData } = state || {};
  const mapContainer = useRef(null);

  useEffect(() => {
    if (!routeData) {
      return; // If no routeData is available, do nothing
    }

    window.initMap = () => {
      const mapOptions = {
        center: { lat: routeData[0].coordinates[0].lat, lng: routeData[0].coordinates[0].lng },
        zoom: 10,
        heading: 90,
        tilt: 45,
        mapTypeId: 'hybrid',
      };

      const map = new window.google.maps.Map(mapContainer.current, mapOptions);

      const transportColors = {
        truck: '#00FF00', //green
        plane: '#FF0000', //red
        ship: '#0000FF', //blue
        train: '#FFFF00', //yellow
      };

      routeData.forEach((segment) => {
        const color = transportColors[segment.mode] || '#FF0000';
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
              repeat: '100px',
            },
          ],
        });
        polyline.setMap(map);
      });

      //legend of the colours
      const legend = document.createElement('div');
      legend.id = 'legend';
      legend.innerHTML = `
        <h3 style="font-weight: bold; font-size: 20px;">Legend</h3>
        <p><span class="legend-color" style="color: #0000FF; font-weight: bold;">Blue</span> - Ship</p>
        <p><span class="legend-color" style="color: #FF0000; font-weight: bold;">Red</span> - Plane</p>
        <p><span class="legend-color" style="color: #00FF00; font-weight: bold;">Green</span> - Truck</p>
        <p><span class="legend-color" style="color: #FFFF00; font-weight: bold;">Yellow</span> - Train</p>
      `;
      legend.style.backgroundColor = 'white';
      legend.style.padding = '20px';
      legend.style.margin = '12px';
      legend.style.fontFamily = 'Arial, sans-serif';
      legend.style.fontSize = '14px';
      legend.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      legend.style.borderRadius = '5px';
      legend.style.width = '200px'; // Increase the width of the legend container

      // Add the legend to the map
      map.controls[window.google.maps.ControlPosition.RIGHT_TOP].push(legend);
    };

    // Ensure initMap is called when script is already loaded
    if (window.google && window.google.maps) {
      window.initMap();
    }
  }, [routeData]);

  return <div ref={mapContainer} id="map" className="map-container"></div>;
};

export default MapComponent;