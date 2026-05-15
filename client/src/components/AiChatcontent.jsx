import React, { useState } from "react";
import { askAI } from "../services/api";
import { Send, Plus } from "lucide-react";

const AIChatPage = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedNote, setSelectedNote] = useState(
    "Data Structures and Algorithms.pdf"
  );

  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Ask me anything about your notes and I'll help you understand.",
      time: "Now",
    },
  ]);

  const token = localStorage.getItem("token");

  // ⚠️ TEMP: replace this later with real selected note ID from backend
  const noteId = selectedNote;

  const handleSendMessage = async () => {
    if (!question.trim()) return;

    const userMessage = {
      type: "user",
      text: question,
      time: "Now",
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;
    setQuestion("");

    try {
      setLoading(true);

      // ✅ FIXED CALL (use correct function name)
      const res = await askAI(noteId, currentQuestion, token);

      const aiMessage = {
        type: "ai",
        text: res.data.answer,
        time: "Now",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.log(error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "Something went wrong. Try again.",
          time: "Now",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = () => {
    setMessages([
      {
        type: "ai",
        text: "New chat started. Ask anything about your notes.",
        time: "Now",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Study Assistant</h1>
          <p className="text-gray-500 text-sm">
            Ask questions about your notes
          </p>
        </div>

        <button
          onClick={handleNewChat}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          New Chat
        </button>
      </div>

      {/* Note Selector */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <label className="text-sm text-gray-500 block mb-2">
          Select a note
        </label>

        <select
          value={selectedNote}
          onChange={(e) => setSelectedNote(e.target.value)}
          className="w-full border rounded-lg p-3 outline-none"
        >
          <option value="1">Data Structures and Algorithms</option>
          <option value="2">Physics Notes</option>
          <option value="3">Machine Learning</option>
        </select>
      </div>

      {/* Chat Box */}
      <div className="bg-white rounded-2xl shadow-sm h-[500px] flex flex-col">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 block mt-2">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="bg-gray-100 w-fit p-3 rounded-xl">
              AI is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4 flex items-center gap-3">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 border rounded-lg p-3 outline-none"
          />

          <button
            onClick={handleSendMessage}
            className="bg-purple-600 text-white p-3 rounded-lg"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;