import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Custom marker icons with larger size
const createCustomIcon = (color, icon) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative">
        <div class="absolute -top-2 -left-2 w-12 h-12 bg-${color}-500 rounded-full opacity-20 animate-ping"></div>
        <div class="w-10 h-10 bg-${color}-500 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
          <span class="text-xl">${icon}</span>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Ambulance marker with animation and larger size
const createAmbulanceIcon = (rotation) => {
  return L.divIcon({
    className: 'ambulance-marker',
    html: `
      <div class="relative">
        <div class="absolute -top-2 -left-2 w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg border-2 border-white transform" style="transform: rotate(${rotation}deg)">
          <span class="text-2xl">🚑</span>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

// Smart ambulance dispatch
const simulateAmbulanceDispatch = (hospital, userLocation) => {
  // Simulate AI-powered dispatch decision
  const responseTime = Math.random() * 60 + 30; // 30-90 seconds response time
  return {
    ambulanceId: Math.floor(Math.random() * 1000),
    responseTime,
    priority: Math.random() > 0.8 ? 'High' : 'Normal'
  };
};

const AmbulanceMap = ({ userLocation, nearbyHospitals, selectedHospital, onRouteDetails }) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const routingControlRef = useRef(null);
  const ambulanceMarkerRef = useRef(null);
  const [ambulancePosition, setAmbulancePosition] = useState(null);
  const [ambulanceRotation, setAmbulanceRotation] = useState(0);
  const [aiStatus, setAiStatus] = useState(null);

  // Function to interpolate points along the route
  const interpolatePoints = (start, end, steps) => {
    const points = [];
    for (let i = 0; i <= steps; i++) {
      const lat = start.lat + (end.lat - start.lat) * (i / steps);
      const lng = start.lng + (end.lng - start.lng) * (i / steps);
      points.push({ lat, lng });
    }
    return points;
  };

  // Function to calculate rotation angle between two points
  const calculateRotation = (point1, point2) => {
    const dx = point2.lng - point1.lng;
    const dy = point2.lat - point1.lat;
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  useEffect(() => {
    if (userLocation && selectedHospital) {
      // Initialize map with a fixed height
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        mapContainer.style.height = '500px'; // Set a fixed height
      }

      const map = L.map("map").setView([selectedHospital.latitude, selectedHospital.longitude], 13);
      mapRef.current = map;

      // Use a more attractive tile layer
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(map);

      // Add user location marker with custom icon
      const userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: createCustomIcon('blue', '📍')
      }).addTo(map);
      markersRef.current.push(userMarker);

      // Add hospital markers with custom icons
      const hospitalMarker = L.marker([selectedHospital.latitude, selectedHospital.longitude], {
        icon: createCustomIcon('red', '🏥')
      }).addTo(map);
      
      // Enhanced popup with better styling
      hospitalMarker.bindPopup(`
        <div class="p-4 bg-white rounded-lg shadow-lg max-w-xs">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span class="text-2xl">🏥</span>
              </div>
            </div>
            <div class="flex-1">
              <h3 class="font-bold text-xl text-gray-800">${selectedHospital.name}</h3>
              <p class="text-base text-gray-600 mb-2">${selectedHospital.address}</p>
              <div class="flex items-center space-x-2 text-base">
                <span class="px-3 py-1 bg-red-100 text-red-800 rounded-full">
                  ${selectedHospital.distance.toFixed(1)} km away
                </span>
                <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                  ${selectedHospital.rating} ⭐
                </span>
              </div>
            </div>
          </div>
        </div>
      `);
      
      markersRef.current.push(hospitalMarker);

      // AI-powered dispatch
      const dispatchInfo = simulateAmbulanceDispatch(selectedHospital, userLocation);
      
      setAiStatus({
        priority: dispatchInfo.priority,
        responseTime: dispatchInfo.responseTime
      });

      // If a hospital is selected, show the route with custom styling
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(selectedHospital.latitude, selectedHospital.longitude),
          L.latLng(userLocation.lat, userLocation.lng),
        ],
        routeWhileDragging: false,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        lineOptions: {
          styles: [
            {
              color: '#3B82F6',
              opacity: 0.8,
              weight: 8
            }
          ]
        },
        createMarker: function(i, wp) {
          return L.marker(wp.latLng, {
            icon: i === 0 ? createCustomIcon('red', '🏥') : createCustomIcon('blue', '📍')
          });
        }
      }).addTo(map);

      routingControlRef.current = routingControl;

      routingControl.on("routesfound", function (e) {
        const routes = e.routes;
        if (routes && routes.length > 0) {
          const summary = routes[0].summary;
          onRouteDetails(summary);

          // Get route coordinates
          const routeCoordinates = routes[0].coordinates;
          const totalTime = 300; // Fixed 5 minutes travel time
          const steps = 100;
          const points = interpolatePoints(
            { lat: selectedHospital.latitude, lng: selectedHospital.longitude },
            { lat: userLocation.lat, lng: userLocation.lng },
            steps
          );

          // Create ambulance marker at hospital
          const ambulanceMarker = L.marker(points[0], {
            icon: createAmbulanceIcon(0)
          }).addTo(map);
          ambulanceMarkerRef.current = ambulanceMarker;

          // Animate ambulance along the route
          let currentStep = 0;
          const interval = setInterval(() => {
            if (currentStep >= points.length) {
              clearInterval(interval);
              return;
            }

            const currentPoint = points[currentStep];
            const nextPoint = points[currentStep + 1];
            
            if (nextPoint) {
              const rotation = calculateRotation(currentPoint, nextPoint);
              setAmbulanceRotation(rotation);
              ambulanceMarker.setIcon(createAmbulanceIcon(rotation));
            }

            ambulanceMarker.setLatLng(currentPoint);
            currentStep++;
          }, (totalTime * 1000) / steps);
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      markersRef.current = [];
      routingControlRef.current = null;
      ambulanceMarkerRef.current = null;
    };
  }, [userLocation, selectedHospital, onRouteDetails]);

  return (
    <div className="relative">
      <div 
        id="map" 
        className="rounded-xl shadow-lg overflow-hidden"
        style={{ width: "100%" }} 
      />
      {aiStatus && (
        <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-red-600">⚡</span>
              <span className="font-semibold">Priority: {aiStatus.priority}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-600">⏱️</span>
              <span className="font-semibold">Response Time: {Math.ceil(aiStatus.responseTime)}s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmbulanceMap;
