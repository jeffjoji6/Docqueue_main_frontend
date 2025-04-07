import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentPopup from "./AssessmentPopup";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // For Timeslot booking after the quiz
  const [doctor, setDoctor] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [date, setDate] = useState("");
  const [disease, setDisease] = useState(""); // New state for disease

  const navigate = useNavigate();
  const [patientName, setPatientName] = useState(""); // New state for patient name
  const [phoneNumber, setPhoneNumber] = useState(""); // New state for phone number

  // Sample IDs for patient, hospital, and doctor (replace as needed)
  const patientId = 1;
  const hospitalId = 1;
  const doctorId = doctor;

  // Questions and answers structured like the decision tree
  const questions = [
    {
      question: "What symptom(s) are you experiencing?",
      options: [
        { text: "Fever", score: 3, next: 1 },
        { text: "Chest pain", score: 4, next: 9 },
        { text: "Headache", score: 2, next: 12 },
        { text: "Diarrhea", score: 2, next: 17 },
      ],
    },
    {
      question: "How high is your fever?",
      options: [
        { text: "Below 102.2°F", score: 2, next: 2 },
        { text: "Above 102.2°F", score: 4, next: 2 },
      ],
    },
    {
      question: "How long have you had the fever?",
      options: [
        { text: "Less than 2 days", score: 1, next: 3 },
        { text: "2-5 days", score: 3, next: 3 },
        { text: "More than 5 days", score: 4, next: 5 },
      ],
    },
    {
      question: "Have you taken any medication?",
      options: [
        { text: "Yes", score: 1, next: 4 },
        { text: "No", score: 2, next: 7 },
      ],
    },
    {
      question: "Did the medication reduce the fever?",
      options: [
        { text: "Yes", score: 1, next: null },
        { text: "No", score: 3, next: 7 },
      ],
    },
    {
      question:
        "Have you had recent contact with someone with similar symptoms?",
      options: [
        { text: "Yes", score: 4, next: 7 },
        { text: "No", score: 0, next: 7 },
      ],
    },
    {
      question: "Do you have any other symptoms?",
      options: [
        { text: "Cough", score: 3, next: 8 },
        { text: "Sore throat", score: 2, next: 11 },
        { text: "Fatigue", score: 3, next: 14 },
      ],
    },
    {
      question: "What type of cough do you have?",
      options: [
        { text: "Dry", score: 2, next: 8 },
        { text: "Productive", score: 3, next: 8 },
      ],
    },
    {
      question: "What color is your mucus?",
      options: [
        { text: "Clear", score: 1, next: null },
        { text: "Yellow", score: 3, next: null },
        { text: "Green", score: 4, next: null },
        { text: "Bloody", score: 5, next: null },
      ],
    },
    // Chest Pain Path
    {
      question: "How long have you had chest pain?",
      options: [
        { text: "Less than 2 days", score: 2, next: 10 },
        { text: "2-5 days", score: 3, next: 10 },
        { text: "More than 5 days", score: 4, next: 10 },
      ],
    },
    {
      question: "Do you have any other symptoms with chest pain?",
      options: [
        { text: "Shortness of breath", score: 5, next: 11 },
        { text: "Cough", score: 3, next: 7 },
        { text: "Dizziness", score: 4, next: 12 },
      ],
    },
    {
      question: "How severe is your shortness of breath?",
      options: [
        { text: "Mild", score: 2, next: null },
        { text: "Moderate", score: 4, next: null },
        { text: "Severe", score: 5, next: null },
      ],
    },
    // Headache Path
    {
      question: "How severe is your headache?",
      options: [
        { text: "Mild", score: 1, next: 13 },
        { text: "Moderate", score: 3, next: 13 },
        { text: "Severe", score: 4, next: 13 },
      ],
    },
    {
      question: "How long have you had this headache?",
      options: [
        { text: "Less than 2 days", score: 1, next: 14 },
        { text: "2-5 days", score: 3, next: 14 },
        { text: "More than 5 days", score: 4, next: 14 },
      ],
    },
    {
      question: "Do you have any other symptoms?",
      options: [
        { text: "Nausea", score: 3, next: 15 },
        { text: "Blurred vision", score: 5, next: 15 },
        { text: "Dizziness", score: 4, next: 15 },
      ],
    },
    {
      question: "Have you taken any medication for the headache?",
      options: [
        { text: "Yes", score: 1, next: 16 },
        { text: "No", score: 2, next: 16 },
      ],
    },
    {
      question: "Did the medication reduce the headache?",
      options: [
        { text: "Yes", score: 1, next: null },
        { text: "No", score: 3, next: null },
      ],
    },
    // Diarrhea Path
    {
      question: "How long have you had diarrhea?",
      options: [
        { text: "Less than 2 days", score: 1, next: 18 },
        { text: "2-5 days", score: 3, next: 18 },
        { text: "More than 5 days", score: 4, next: 19 },
      ],
    },
    {
      question: "Do you have any other symptoms?",
      options: [
        { text: "Stomach pain", score: 3, next: null },
        { text: "Nausea", score: 3, next: null },
        { text: "Fatigue", score: 3, next: 23 },
      ],
    },
    {
      question: "Have you taken any medication for diarrhea?",
      options: [
        { text: "Yes", score: 1, next: 20 },
        { text: "No", score: 2, next: 20 },
      ],
    },
    {
      question: "Did the medication reduce the diarrhea?",
      options: [
        { text: "Yes", score: 1, next: null },
        { text: "No", score: 3, next: null },
      ],
    },
    {
      question:
        "Have you had recent contact with someone with similar symptoms?",
      options: [
        { text: "Yes", score: 4, next: null },
        { text: "No", score: 0, next: null },
      ],
    },
    // Fatigue Path
    {
      question: "How severe is your fatigue?",
      options: [
        { text: "Mild", score: 1, next: null },
        { text: "Moderate", score: 3, next: null },
        { text: "Severe", score: 4, next: null },
      ],
    },
  ];

  const handleAnswerClick = (option) => {
    setScore(score + option.score);

    // Update the disease state if the user is answering the first question
    if (currentQuestionIndex === 0) {
      setDisease(option.text);
    }

    if (option.next !== null) {
      setCurrentQuestionIndex(option.next);
    } else {
      // Calculate final score when quiz is complete
      const finalScore = Math.round((score / questions.length) * 10);
      setScore(finalScore);

      // Calculate severity based on score
      const severity =
        finalScore > 5 ? "High" : finalScore > 4 ? "Medium" : "Low";

      // Set assessment data and show popup
      setAssessmentData({
        score: finalScore,
        disease,
        severity,
      });
      setShowPopup(true);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    // Validate form input
    if (!doctor || !timeslot || !date) {
      alert("Please select a doctor, date, and time slot.");
      return;
    }

    // Determine the route based on priority score
    if (score > 5) {
      // High priority - Emergency case
      navigate("/emergency", {
        state: {
          priority: "high",
          score: score,
          disease: disease,
        },
      });
      return;
    } else if (score > 4) {
      // Moderate priority - Regular appointment
      const appointmentData = {
        patientId,
        hospitalId,
        doctorId,
        selectedTimeSlot: timeslot,
        priorityRating: score,
        date,
        disease,
        priority: "moderate",
      };

      try {
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
          const data = await response.json();
          console.log("Appointment created:", data);
          alert("Appointment successfully booked.");
          navigate("/Confirmed");
        } else {
          const error = await response.json();
          console.error("Failed to create appointment:", error);
          alert("Failed to book appointment. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while booking the appointment.");
      }
    } else {
      // Low priority - AI Doctor
      navigate("/ai-doctor", {
        state: {
          priority: "low",
          score: score,
          disease: disease,
        },
      });
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowScore(false);
    setQuizComplete(false);
  };

  const [showPopup, setShowPopup] = useState(false);
  const [assessmentData, setAssessmentData] = useState(null);

  const handleProceed = () => {
    if (score > 5) {
      navigate("/emergency");
    } else if (score > 4) {
      setQuizComplete(true);
    } else {
      navigate("/ai-doctor", {
        state: {
          priority: "low",
          score: score,
          disease: disease,
        },
      });
    }
  };

  if (quizComplete) {
    return (
      <div className="w-full h-fit flex justify-center items-center">
        <div className="bg-slate-50 w-5/12 h-11/12 shadow-2xl rounded-md text-center mt-24">
          <div className="mt-6 p-2">
            <h2 className="text-2xl font-bold">Book a Slot for Consultation</h2>
            <form className="mt-4" onSubmit={handleBooking}>
              <label className="block text-left">
                Patient Name:
                <input
                  type="text"
                  className="mt-2 p-2 border border-gray-400 rounded-md w-full"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </label>

              <label className="block text-left mt-4">
                Phone Number:
                <input
                  type="tel"
                  className="mt-2 p-2 border border-gray-400 rounded-md w-full"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </label>
              <label className="block text-left pt-2">
                Select Doctor:
                <select
                  className="mt-2 p-2 border border-gray-400 rounded-md w-full"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  <option value="" disabled>
                    Select your Doctor
                  </option>
                  <option value="1">Dr. Ashad Sivaraman</option>
                  <option value="2">Dr. Mahadevan.K</option>
                  <option value="3">Dr. Swapna Nair</option>
                  <option value="4">Dr. Anoop Sivaraman</option>
                  <option value="5">Dr. Harshali Yadav</option>
                  <option value="6">Dr. Anila George</option>
                  <option value="7">Dr. Pinki</option>
                  <option value="8">Dr. Aiswaria</option>
                </select>
              </label>
              <label className="block text-left mt-4">
                Select Date:
                <input
                  type="date"
                  className="mt-2 p-2 border border-gray-400 rounded-md w-full"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>
              <label className="block text-left mt-4">
                Select Time Slot:
                <select
                  className="mt-2 p-2 border border-gray-400 rounded-md w-full"
                  value={timeslot}
                  onChange={(e) => setTimeslot(e.target.value)}
                >
                  <option value="" disabled>
                    Select time slot
                  </option>
                  <option value="09-10">9 AM - 10 AM</option>
                  <option value="10-11">10 AM - 11 AM</option>
                  <option value="11-12">11 AM - 12 PM</option>
                  <option value="14-15">2 PM - 3 PM</option>
                  <option value="15-16">3 PM - 4 PM</option>
                </select>
              </label>
              <button
                className="mt-3 mb-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                type="submit"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {!showScore ? (
            <>
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        ((currentQuestionIndex + 1) / questions.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  {currentQuestion.question}
                </h3>
                <div className="space-y-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      className={`w-full p-4 text-left rounded-lg transition-all duration-200 ${
                        selectedOption === option
                          ? "bg-blue-500 text-white"
                          : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {option.text}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleRestart}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800"
                >
                  Restart
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Assessment Complete
              </h2>
              <div className="mb-8">
                <div className="text-xl text-gray-600 mb-6">
                  {score > 5
                    ? "Based on your symptoms, we recommend immediate emergency care. Your condition may require urgent medical attention."
                    : score > 4
                    ? "Based on your symptoms, we recommend scheduling a regular appointment with a doctor for proper evaluation."
                    : "Based on your symptoms, we recommend starting with an AI doctor consultation for initial guidance."}
                </div>
                <div className="text-sm text-gray-500 mb-8">
                  {score > 5
                    ? "This recommendation is based on the severity of your symptoms and their potential impact on your health."
                    : score > 4
                    ? "This recommendation is based on your current symptoms and their duration."
                    : "This recommendation is based on your mild symptoms and their current presentation."}
                </div>
              </div>
              <button
                onClick={() => {
                  if (score > 5) {
                    navigate("/emergency", {
                      state: {
                        priority: "high",
                        score: score,
                        disease: disease,
                      },
                    });
                  } else if (score > 4) {
                    setQuizComplete(true);
                  } else {
                    navigate("/ai-doctor", {
                      state: {
                        priority: "low",
                        score: score,
                        disease: disease,
                      },
                    });
                  }
                }}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
              >
                {score > 5
                  ? "Proceed to Emergency Care"
                  : score > 4
                  ? "Book Appointment"
                  : "Consult AI Doctor"}
              </button>
            </div>
          )}
        </div>
      </div>

      {assessmentData && (
        <AssessmentPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          score={assessmentData.score}
          disease={assessmentData.disease}
          severity={assessmentData.severity}
          onProceed={handleProceed}
        />
      )}
    </div>
  );
};

export default Quiz;
