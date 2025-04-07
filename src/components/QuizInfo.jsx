import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ExclamationTriangleIcon, 
  UserIcon, 
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';

const QuizInfo = () => {
  const navigate = useNavigate();

  const scoreRanges = [
    {
      range: "Score > 5",
      title: "Emergency Care",
      description: "Immediate medical attention required. You will be directed to emergency services.",
      icon: ExclamationTriangleIcon,
      color: "text-red-600 bg-red-50",
    },
    {
      range: "Score 4-5",
      title: "Regular Doctor Appointment",
      description: "Schedule an appointment with a specialist for proper evaluation.",
      icon: UserIcon,
      color: "text-blue-600 bg-blue-50",
    },
    {
      range: "Score < 4",
      title: "AI Doctor Consultation",
      description: "Start with an AI consultation for initial guidance and recommendations.",
      icon: ChatBubbleLeftIcon,
      color: "text-green-600 bg-green-50",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Smart Quiz Information
          </h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How the Quiz Works</h2>
            <p className="text-gray-600 mb-4">
              Our Smart Quiz is designed to assess your symptoms and determine the most appropriate care path for you. 
              Based on your answers, you'll receive a score that helps us direct you to the right level of care.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Score Distribution</h2>
            <div className="space-y-4">
              {scoreRanges.map((range, index) => {
                const Icon = range.icon;
                return (
                  <div key={index} className={`p-4 rounded-lg ${range.color}`}>
                    <div className="flex items-center">
                      <Icon className="h-6 w-6 mr-3" />
                      <div>
                        <h3 className="font-semibold">{range.range} - {range.title}</h3>
                        <p className="text-sm mt-1">{range.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          

          <div className="flex justify-center">
            <button
              onClick={() => navigate('/quiz')}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-[1.02]"
            >
              Proceed to Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizInfo; 