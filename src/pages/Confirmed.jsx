import React from "react";
import { Link } from "react-router-dom";

const Confirmed = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Appointment Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked. You will receive a
              confirmation email shortly.
            </p>
          </div>

          <div className="space-y-4">
            <Link to="/">
              <button className="w-full px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200">
                Return to Home
              </button>
            </Link>
            <Link to="/hospitallist">
              <button className="w-full px-8 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200">
                Book Another Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmed;
