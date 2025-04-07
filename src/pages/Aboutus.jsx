import React from "react";
import { Link } from "react-router-dom";
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden pt-20 pb-32">
          <div className="absolute inset-0 bg-blue-500 opacity-5 pattern-grid-lg"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Transforming Healthcare
                  <span className="block text-blue-600 mt-2">One Queue at a Time</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">
                  DocQueue is revolutionizing healthcare scheduling with AI-powered efficiency,
                  making quality healthcare accessible to everyone.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                 
                  <a href="#learn-more">
                    <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border-2 border-blue-600">
                      Learn More
                    </button>
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2">
                <img 
                  src="https://img.freepik.com/free-vector/hospital-healthcare-workers-concept_23-2148904557.jpg"
                  alt="Healthcare Illustration"
                  className="w-full h-auto rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 bg-white" id="learn-more">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <img 
                  src="https://img.freepik.com/free-vector/medical-video-call-consultation-illustration_88138-415.jpg"
                  alt="Digital Healthcare"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At <span className="text-blue-600 font-semibold">DocQueue</span>, we're on a mission to 
                  eliminate long waiting times and streamline healthcare access. Through innovative technology 
                  and smart algorithms, we're making doctor visits more efficient and less stressful for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
              Why Choose DocQueue?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⏳</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Scheduling</h3>
                <p className="text-gray-600">
                  AI-powered system that optimizes appointment scheduling in real-time.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Access</h3>
                <p className="text-gray-600">
                  Instant access to medical professionals and emergency services.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h3>
                <p className="text-gray-600">
                  User-friendly interface designed for seamless appointment booking.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h3>
                <p className="text-gray-600">
                  Advanced security measures to protect your medical information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Healthcare Experience?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of satisfied users who have already discovered the convenience of DocQueue.
              </p>
              <Link to="/Hospitaldetails">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Book Your First Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .pattern-grid-lg {
          background-image: linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(to right, currentColor 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;
