import React, { useState } from "react";
import hospic from "../assets/images/samplehos.png";
import { Link, useNavigate } from "react-router-dom";
import DocQueueChat from "../components/DocQueueChat";
import Footer from "../components/Footer";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/hospitallist?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const hospitals = [
    {
      id: 1,
      name: "Sreenethra Eye Care",
      type: "Multi-speciality Hospital",
      image: hospic,

      reviews: 128,
      location: "Chennai",
      specialties: ["Ophthalmology", "General Medicine"],
    },
    // Add more hospitals here
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="relative min-h-[600px] flex items-center overflow-hidden">
          {/* Background Image Layer */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-900/90 mix-blend-multiply z-10"></div>
            <img
              src="https://img.freepik.com/free-photo/medical-banner-with-doctor-working-hospital_23-2149611193.jpg"
              alt="Healthcare Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Layer */}
          <div className="container mx-auto px-4 pt-20 md:pt-24 pb-16 relative z-20">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Your Health, <br />
                <span className="text-blue-200">Our Priority</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-lg mx-auto">
                Experience seamless healthcare scheduling with DocQueue. Book
                appointments, manage your visits, and prioritize your well-being
                with just a few clicks.
              </p>
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8 relative">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-14 px-6 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-md
                               focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all
                               text-white placeholder-white/70"
                      placeholder="Search hospitals, doctors..."
                    />
                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/hospitallist">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Hospitals */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Hospitals
            </h2>
            <Link
              to="/hospitallist"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={hospital.image}
                    className="w-full h-48 object-cover"
                    alt={hospital.name}
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600">
                    ★ {hospital.rating}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {hospital.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3">{hospital.type}</p>
                  <div className="flex items-center gap-2 mb-4">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-gray-600 text-sm">
                      {hospital.location}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hospital.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  <Link to="/hospitaldetails/1">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Book Appointment
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chatbot */}
        <DocQueueChat />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
