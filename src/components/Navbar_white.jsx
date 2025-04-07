import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar_white = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="p-5 w-[140px] md:w-[200px]" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/timeslot" className="text-gray-700 hover:text-blue-600 transition">
              My Appointments
            </Link>
            <Link to="/aboutus" className="text-gray-700 hover:text-blue-600 transition">
              About us
            </Link>
            <Link to="/emergency" className="relative group">
              <button className="px-6 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full 
                               hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 
                               shadow-lg hover:shadow-red-500/50 flex items-center gap-2 animate-pulse">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M15.58,12a3.58,3.58,0,1,1-3.58-3.58A3.58,3.58,0,0,1,15.58,12Z M12,2V4.36 M12,19.64V22 M4.36,12H2 M22,12H19.64 M6.24,6.24L8,8 M18,18l-1.76-1.76 M6.24,17.76L8,16 M18,6l-1.76,1.76">
                  </path>
                </svg>
                Emergency
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                to="/timeslot"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Appointments
              </Link>
              <Link
                to="/aboutus"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                to="/emergency"
                className="block px-3 py-2 rounded-md hover:bg-red-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2 text-red-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M15.58,12a3.58,3.58,0,1,1-3.58-3.58A3.58,3.58,0,0,1,15.58,12Z M12,2V4.36 M12,19.64V22 M4.36,12H2 M22,12H19.64 M6.24,6.24L8,8 M18,18l-1.76-1.76 M6.24,17.76L8,16 M18,6l-1.76,1.76">
                    </path>
                  </svg>
                  <span className="font-medium">Emergency</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar_white;