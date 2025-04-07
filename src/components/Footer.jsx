import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              DocQueue
            </h3>
            <p className="text-gray-600 text-sm">
              Making healthcare accessible and efficient for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/hospitallist"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Find Hospitals
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Emergency
                </Link>
              </li>
              <li>
                <Link
                  to="/aboutus"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/hospitallist"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Book Appointments
                </Link>
              </li>
              <li>
                <Link
                  to="/emergency"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  Emergency Care
                </Link>
              </li>
              <li>
                <Link
                  to="/timeslot"
                  className="text-gray-600 hover:text-blue-600 text-sm"
                >
                  View Appointments
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-600 text-sm">
                <span className="font-medium">Email:</span> support@docqueue.com
              </li>
              <li className="text-gray-600 text-sm">
                <span className="font-medium">Phone:</span> +91 1234567890
              </li>
              <li className="text-gray-600 text-sm">
                <span className="font-medium">Address:</span> Chennai, Tamil
                Nadu
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 DocQueue. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
