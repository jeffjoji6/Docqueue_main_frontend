import React, { useState, useEffect } from "react";
import AmbulanceMap from "../components/AmbulanceMap";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const Emergency = () => {
  const [isAmbulanceCalled, setIsAmbulanceCalled] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const [ambulanceStatus, setAmbulanceStatus] = useState("Idle");
  const [eta, setEta] = useState(null);
  const [loading, setLoading] = useState(false);
  const [urgentAppointmentBooked, setUrgentAppointmentBooked] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { priority, score, disease } = location.state || {};

  // Get user's location when ambulance is called
  useEffect(() => {
    if (isAmbulanceCalled) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(location);
          fetchNearbyHospitals(location);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Please enable location services.");
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [isAmbulanceCalled]);

  const fetchNearbyHospitals = async (location) => {
    try {
      // Mock data for testing
      const mockHospitals = [
        {
          _id: "1",
          name: "City General Hospital",
          address: "123 Main St, City",
          contact: "+91 1234567890",
          latitude: location.lat + 0.01,
          longitude: location.lng + 0.01,
        },
        {
          _id: "2",
          name: "Metro Medical Center",
          address: "456 Park Ave, City",
          contact: "+91 9876543210",
          latitude: location.lat - 0.01,
          longitude: location.lng - 0.01,
        },
        {
          _id: "3",
          name: "Community Health Hospital",
          address: "789 Oak St, City",
          contact: "+91 5555555555",
          latitude: location.lat + 0.02,
          longitude: location.lng - 0.02,
        },
      ];

      // Calculate distance for each hospital and sort by distance
      const hospitalsWithDistance = mockHospitals
        .map((hospital) => ({
          ...hospital,
          distance: calculateDistance(
            location.lat,
            location.lng,
            hospital.latitude,
            hospital.longitude
          ),
        }))
        .sort((a, b) => a.distance - b.distance);

      setNearbyHospitals(hospitalsWithDistance);
      if (hospitalsWithDistance.length > 0) {
        setSelectedHospital(hospitalsWithDistance[0]);
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      // Show error message to user
      alert(
        "Unable to fetch hospital data. Using mock data for demonstration."
      );
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Simulate real-time ambulance updates after route details are available
  useEffect(() => {
    if (routeDetails) {
      let remainingTime = Math.ceil(routeDetails.totalTime / 60);
      setEta(remainingTime);
      setAmbulanceStatus("Ambulance Dispatched");

      const interval = setInterval(() => {
        remainingTime -= 1;
        if (remainingTime > 0) {
          setEta(remainingTime);
          setAmbulanceStatus("Ambulance En Route");
        } else {
          setEta(0);
          setAmbulanceStatus("Ambulance Arrived");
          clearInterval(interval);
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [routeDetails]);

  const handleCallAmbulance = async () => {
    setIsAmbulanceCalled(true);

    // Book urgent appointment
    try {
      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      // Find the next available time slot
      let selectedTimeSlot;
      if (currentHour < 9) selectedTimeSlot = "09-10";
      else if (currentHour < 10) selectedTimeSlot = "10-11";
      else if (currentHour < 11) selectedTimeSlot = "11-12";
      else if (currentHour < 12) selectedTimeSlot = "12-13";
      else if (currentHour < 13) selectedTimeSlot = "13-14";
      else if (currentHour < 14) selectedTimeSlot = "14-15";
      else if (currentHour < 15) selectedTimeSlot = "15-16";
      else selectedTimeSlot = "16-17";

      const appointmentData = {
        patientId: 1, // Replace with actual patient ID
        hospitalId: 1, // Replace with actual hospital ID
        doctorId: 1, // Replace with actual doctor ID
        selectedTimeSlot,
        priorityRating: score || 10, // Highest priority for emergency
        date: currentTime.toISOString(),
        disease: disease || "Emergency",
        status: "scheduled",
      };

      const response = await fetch(
        "https://docqueue-backend.onrender.com/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );

      if (response.ok) {
        setUrgentAppointmentBooked(true);
        console.log("Urgent appointment booked successfully");
      } else {
        console.error("Failed to book urgent appointment");
      }
    } catch (error) {
      console.error("Error booking urgent appointment:", error);
    }
  };

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
  };

  const emergencyContacts = [
    { name: "Ambulance", number: "108", icon: "🚑" },
    { name: "Police", number: "100", icon: "👮" },
    { name: "Fire", number: "101", icon: "🔥" },
    { name: "Doctor Helpline", number: "+91 9124125655", icon: "👨‍⚕️" },
  ];

  const emergencyTips = [
    {
      title: "CPR Steps",
      content: "30 chest compressions followed by 2 rescue breaths",
      icon: "❤️",
    },
    {
      title: "Choking",
      content: "Apply the Heimlich maneuver with abdominal thrusts",
      icon: "🫁",
    },
    {
      title: "Bleeding",
      content: "Apply direct pressure with clean cloth or bandage",
      icon: "🩸",
    },
    {
      title: "Burns",
      content: "Cool with running water for 10-15 minutes",
      icon: "🔥",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gradient-to-b from-red-50 via-white to-red-50 pt-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section with Animated Border */}
          <header className="text-center mb-8 md:mb-12 relative">
            <div className="absolute inset-0 -z-10 bg-red-100 rounded-2xl opacity-50"></div>
            <div className="absolute inset-0 -z-10 rounded-2xl animate-pulse border-2 border-red-500"></div>
            <div className="py-6 px-4">
              <h1 className="text-4xl md:text-6xl font-extrabold text-red-700 mb-3 drop-shadow-md">
                Emergency Services
              </h1>
              <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
                Immediate Ambulance Dispatch & 24/7 Medical Support
              </p>
            </div>
          </header>

          {!isAmbulanceCalled ? (
            <div className="space-y-12">
              {/* SOS Button Section */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-red-600 rounded-full opacity-75 blur-sm group-hover:opacity-100 transition duration-300"></div>
                  <button
                    onClick={handleCallAmbulance}
                    className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-12 py-8 rounded-full text-2xl md:text-3xl font-bold shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl animate-pulse">🚑</span>
                      <span>CALL AMBULANCE</span>
                    </div>
                  </button>
                </div>
                {loading && (
                  <p className="text-lg text-gray-600 animate-pulse flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Fetching your location...
                  </p>
                )}
              </div>

              {/* Emergency Contacts Section */}
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-red-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  Emergency Contacts
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {emergencyContacts.map((contact, index) => (
                    <a
                      key={index}
                      href={`tel:${contact.number}`}
                      className="flex flex-col items-center justify-center p-4 bg-red-50 hover:bg-red-100 transition-colors rounded-xl border border-red-200"
                    >
                      <span className="text-3xl mb-2">{contact.icon}</span>
                      <h3 className="font-semibold text-gray-800">
                        {contact.name}
                      </h3>
                      <p className="font-bold text-red-600">{contact.number}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* Emergency Tips Section */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-red-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  First Aid Tips
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {emergencyTips.map((tip, index) => (
                    <div
                      key={index}
                      className="p-4 bg-blue-50 rounded-xl border border-blue-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{tip.icon}</span>
                        <h3 className="font-semibold text-gray-800">
                          {tip.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-600">{tip.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {userLocation && (
                <>
                  {/* Map Section with Better Styling */}
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-red-200">
                    <div className="bg-red-600 text-white p-4">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        Nearby Hospitals
                      </h2>
                    </div>
                    <div className="w-full h-[350px] md:h-[450px]">
                      <AmbulanceMap
                        userLocation={userLocation}
                        nearbyHospitals={nearbyHospitals}
                        selectedHospital={selectedHospital}
                        onRouteDetails={setRouteDetails}
                      />
                    </div>
                  </div>

                  {/* Nearby Hospitals List */}
                  {nearbyHospitals.length > 0 && (
                    <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-red-200">
                      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          ></path>
                        </svg>
                        Select Hospital
                      </h2>
                      <div className="space-y-4">
                        {nearbyHospitals.map((hospital) => (
                          <button
                            key={hospital._id}
                            onClick={() => handleHospitalSelect(hospital)}
                            className={`w-full p-4 rounded-lg border-2 transition-all ${
                              selectedHospital?._id === hospital._id
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 hover:border-red-300"
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-semibold text-gray-800">
                                  {hospital.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {hospital.address}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-red-600">
                                  {hospital.distance.toFixed(1)} km
                                </p>
                                <p className="text-sm text-gray-500">
                                  {hospital.contact}
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Route Details Section */}
                  {routeDetails && (
                    <div className="bg-white rounded-xl shadow-xl p-6 border-2 border-red-200">
                      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        Route Information
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                              ></path>
                            </svg>
                            <span className="font-semibold">Distance:</span>
                          </div>
                          <span className="text-xl font-bold text-blue-700">
                            {(routeDetails.totalDistance / 1000).toFixed(2)} km
                          </span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <svg
                              className="w-5 h-5 text-red-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                            <span className="font-semibold">Time:</span>
                          </div>
                          <span className="text-xl font-bold text-red-700">
                            {Math.ceil(routeDetails.totalTime / 60)} minutes
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Emergency Alert */}
                  {ambulanceStatus !== "Idle" && (
                    <div className="rounded-xl shadow-2xl overflow-hidden">
                      <div className="bg-red-600 text-white p-6 md:p-8 text-center relative">
                        {/* Animated Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                          <div className="absolute inset-0 border-4 border-white opacity-20 rounded-full animate-ping"></div>
                          <div className="absolute inset-[15%] border-4 border-white opacity-40 rounded-full animate-ping animation-delay-300"></div>
                          <div className="absolute inset-[30%] border-4 border-white opacity-60 rounded-full animate-ping animation-delay-600"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="flex justify-center mb-4">
                            <span className="text-5xl animate-pulse">🚑</span>
                          </div>
                          <p className="text-2xl md:text-3xl font-extrabold mb-4 uppercase">
                            {ambulanceStatus === "Ambulance Dispatched" &&
                              "🚨 Ambulance Dispatched 🚨"}
                            {ambulanceStatus === "Ambulance En Route" &&
                              "🚨 Ambulance En Route 🚨"}
                            {ambulanceStatus === "Ambulance Arrived" &&
                              "🚨 Ambulance Arrived 🚨"}
                          </p>
                          {eta !== null && (
                            <p className="text-lg md:text-xl font-semibold mb-6 bg-red-700/50 inline-block px-4 py-2 rounded-full">
                              Estimated Arrival:{" "}
                              <span className="font-bold">{eta}</span> minute
                              {eta !== 1 && "s"}
                            </p>
                          )}
                          {urgentAppointmentBooked && (
                            <p className="text-lg md:text-xl font-semibold mb-6 bg-green-700/50 inline-block px-4 py-2 rounded-full">
                              ✅ Urgent Appointment Booked
                            </p>
                          )}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            <a
                              href="tel:+919124125655"
                              className="flex items-center justify-center gap-2 bg-white text-red-600 font-bold py-3 rounded-lg hover:bg-red-50 transition-colors"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                ></path>
                              </svg>
                              Call Emergency
                            </a>
                            <a
                              href="#"
                              className="flex items-center justify-center gap-2 bg-white/20 text-white font-bold py-3 rounded-lg hover:bg-white/30 transition-colors"
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                ></path>
                              </svg>
                              Send Medical Info
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Emergency;
