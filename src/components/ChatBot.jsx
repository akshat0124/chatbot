import React, { useState, useRef } from "react";
import axios from "axios";
import "./ChatBot.css";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message first
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://akshat2005.app.n8n.cloud/webhook/mychatbot",
        {
          message: input,
          history: newMessages.map(m => ({ sender: m.sender, text: m.text }))
        }
      );

      const reply = response.data.reply;

      setMessages(prev => [...prev, { text: reply, sender: "bot" }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { text: "⚠️ Sorry, no reply from server.", sender: "bot" }
      ]);
      console.error("Error contacting server:", error);
    } finally {
      setIsLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">🤖 Chatbot</div>
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.text}
          </div>
        ))}
        {isLoading && (
          <div className="message bot typing">...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
