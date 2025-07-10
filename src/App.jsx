import React from "react";
import ChatBot from "./components/ChatBot";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
      <div className="backdrop-blur-lg bg-white/10 rounded-xl p-6 w-full max-w-md shadow-lg">
        <ChatBot />
      </div>
    </div>
  );
}
