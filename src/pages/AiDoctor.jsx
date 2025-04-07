import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AiDoctor = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { disease, score } = location.state || {};

  // Initial greeting based on symptoms
  useEffect(() => {
    const initialGreeting = {
      type: "ai",
      content: `Hello! I'm your AI medical assistant. I understand you're experiencing ${
        disease || "some symptoms"
      }. How can I help you today?`,
    };
    setMessages([initialGreeting]);
  }, [disease]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: "user",
      content: inputMessage,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Using our backend endpoint
      const response = await fetch(
        "https://docqueue-backend.onrender.com/api/ai-doctor/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: inputMessage,
            disease: disease || "",
            score: score || 0,
          }),
        }
      );

      const data = await response.json();

      // Add AI response
      const aiMessage = {
        type: "ai",
        content:
          data.response ||
          "I apologize, but I'm having trouble processing your request. Please try rephrasing your question.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        type: "ai",
        content:
          "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              AI Doctor Consultation
            </h1>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Back to Home
            </button>
          </div>

          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                Your Symptoms
              </h2>
              <p className="text-gray-700">
                Primary Symptom: {disease || "Not specified"}
                <br />
                Severity Level:{" "}
                {score ? (score < 3 ? "Low" : "Moderate") : "Not specified"}
              </p>
            </div>
          </div>

          <div className="h-[300px] overflow-y-auto mb-6 p-4 bg-gray-50 rounded-lg">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-left">
                <div className="inline-block p-3 rounded-lg bg-white text-gray-800">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-2 animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full mr-2 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-4">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiDoctor;
