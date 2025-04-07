import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { emergencyService } from '../services/emergencyService';

const EmergencyAmbulance = () => {
  const [location, setLocation] = useState(null);
  const [ambulances, setAmbulances] = useState([]);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  // Sample ambulance data
  const sampleAmbulances = [
    {
      id: 1,
      name: "Emergency Ambulance 1",
      type: "Basic Life Support",
      eta: "5 mins",
      distance: "2.5 km",
      rating: 4.8,
      status: "Available"
    },
    {
      id: 2,
      name: "Emergency Ambulance 2",
      type: "Advanced Life Support",
      eta: "8 mins",
      distance: "4.1 km",
      rating: 4.9,
      status: "Available"
    },
    {
      id: 3,
      name: "Emergency Ambulance 3",
      type: "Basic Life Support",
      eta: "12 mins",
      distance: "6.3 km",
      rating: 4.7,
      status: "Available"
    }
  ];

  useEffect(() => {
    // Initialize emergency sound
    emergencyService.initEmergencySound();

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocation(userLocation);
          // Fetch nearby ambulances
          fetchNearbyAmbulances(userLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }

    return () => {
      // Cleanup emergency sound
      emergencyService.stopEmergencySound();
    };
  }, []);

  const fetchNearbyAmbulances = async (userLocation) => {
    try {
      const nearbyAmbulances = await emergencyService.getNearbyAmbulances(userLocation);
      setAmbulances(nearbyAmbulances);
    } catch (error) {
      console.error("Failed to fetch nearby ambulances:", error);
    }
  };

  const handleEmergencyCall = async () => {
    if (!location) {
      alert("Please enable location services to call emergency");
      return;
    }

    try {
      setIsEmergencyActive(true);
      const response = await emergencyService.handleEmergencyCall(location);
      // Handle emergency response
      console.log("Emergency call initiated:", response);
    } catch (error) {
      console.error("Emergency call failed:", error);
      alert("Failed to initiate emergency call. Please try again.");
    }
  };

  const handleBookAmbulance = async (ambulance) => {
    setSelectedAmbulance(ambulance);
    setBookingStatus('processing');
    
    try {
      // Start tracking
      const trackingInterval = setInterval(async () => {
        const trackingInfo = await emergencyService.trackAmbulance(ambulance.id);
        setTrackingData(trackingInfo);
        
        if (trackingInfo.status === 'arrived') {
          clearInterval(trackingInterval);
          setBookingStatus('completed');
        }
      }, 5000);

      setBookingStatus('confirmed');
    } catch (error) {
      console.error("Failed to book ambulance:", error);
      setBookingStatus('failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          {/* Emergency Header */}
          <div className="bg-red-600 text-white rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Emergency Ambulance Service</h1>
                <p className="text-red-100">24/7 Emergency Medical Transport</p>
              </div>
              <button 
                onClick={handleEmergencyCall}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  isEmergencyActive 
                    ? 'bg-red-700 text-white animate-pulse' 
                    : 'bg-white text-red-600 hover:bg-red-50'
                }`}
              >
                {isEmergencyActive ? 'Emergency Active' : 'Emergency Call'}
              </button>
            </div>
          </div>

          {/* Location Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Location</h2>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                Use Current Location
              </button>
            </div>
          </div>

          {/* Available Ambulances */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Ambulances</h2>
              <div className="space-y-4">
                {ambulances.map((ambulance) => (
                  <div
                    key={ambulance.id}
                    className="border rounded-lg p-4 hover:shadow-md transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{ambulance.name}</h3>
                      <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                        {ambulance.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{ambulance.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">ETA</p>
                        <p className="font-medium">{ambulance.eta}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Distance</p>
                        <p className="font-medium">{ambulance.distance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-medium">{ambulance.rating} ⭐</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleBookAmbulance(ambulance)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Book Now
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tracking Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Track Ambulance</h2>
              {selectedAmbulance && trackingData ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-800 mb-2">Booking Status</h3>
                    <p className="text-blue-600">
                      {trackingData.status === 'arrived' ? 'Ambulance Arrived' : 'Ambulance on the way'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Distance Remaining</p>
                      <p className="font-medium">{trackingData.distance} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated Time</p>
                      <p className="font-medium">{trackingData.eta}</p>
                    </div>
                  </div>
                  {/* Map placeholder */}
                  <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map View</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>No active booking</p>
                </div>
              )}
            </div>
          </div>

          {/* Emergency Instructions */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Instructions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">Before Ambulance Arrives:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Stay calm and assess the situation</li>
                  <li>Ensure the patient is in a safe position</li>
                  <li>Keep emergency exits clear</li>
                  <li>Have someone wait at the entrance</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-800">Important Numbers:</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>Emergency: 108</li>
                  <li>Police: 100</li>
                  <li>Fire: 101</li>
                  <li>Hospital: +91-XXX-XXX-XXXX</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmergencyAmbulance; 