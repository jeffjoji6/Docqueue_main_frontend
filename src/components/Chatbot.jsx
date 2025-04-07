import React, { useState, useRef, useEffect } from "react";

const Chatbot = () => {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const getResponse = async (message) => {
    try {
      const response = await fetch(
        "https://docqueue-backend.onrender.com/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.reply) {
        throw new Error("No response received from server");
      }
      return data.reply;
    } catch (error) {
      console.error("Chatbot error:", error);
      return `Error: ${error.message}. Please try again.`;
    }
  };

  const handleSend = async () => {
    if (message.trim() === "") return;

    const userMessage = message;
    setIsLoading(true);
    setChat((prev) => [...prev, { sender: "You", text: userMessage }]);
    setMessage("");

    try {
      const botResponse = await getResponse(userMessage);
      setChat((prev) => [...prev, { sender: "Bot", text: botResponse }]);
    } catch (error) {
      console.error("Failed to get response:", error);
      setChat((prev) => [
        ...prev,
        {
          sender: "Bot",
          text: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 md:right-6 w-12 md:w-16 h-12 md:h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        title="Chat with AI Assistant"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-24 right-2 md:right-6 w-[95vw] md:w-96 bg-white border rounded-lg shadow-xl p-4 transition-all duration-300 transform max-h-[80vh] md:max-h-[600px] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              DocQueue Chatbot
            </h3>
            <span className="text-xs text-gray-500">
              Powered by huggingface
            </span>
          </div>

          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50"
          >
            {chat.length === 0 ? (
              <div className="text-center text-gray-500 mt-4">
                <p>👋 Hi! I'm your AI assistant.</p>
                <p className="text-sm mt-2">How can I help you today?</p>
              </div>
            ) : (
              chat.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.sender === "You" ? "ml-auto" : "mr-auto"
                  } max-w-[85%]`}
                >
                  <div
                    className={`rounded-lg p-3 ${
                      msg.sender === "You"
                        ? "bg-blue-500 text-white ml-auto"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="text-sm break-words">{msg.text}</div>
                  </div>
                  <div
                    className={`text-xs text-gray-500 mt-1 ${
                      msg.sender === "You" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.sender}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-500">
                <div className="animate-bounce">●</div>
                <div className="animate-bounce delay-100">●</div>
                <div className="animate-bounce delay-200">●</div>
              </div>
            )}
          </div>

          <div className="relative mt-auto">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full border rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || message.trim() === ""}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 rounded-md transition-all duration-200 ${
                isLoading || message.trim() === ""
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center space-x-1">
                  <span className="animate-spin">⟳</span>
                </span>
              ) : (
                "Send"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
