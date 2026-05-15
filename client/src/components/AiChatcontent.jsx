import React, { useState, useEffect } from "react";
import { askAI, getNotes } from "../services/api";
import { Send, Plus } from "lucide-react";
import { useParams } from "react-router-dom";

const AIChatPage = () => {
  let { noteId: paramNoteId } = useParams();

  let [question, setQuestion] = useState("");
  let [loading, setLoading] = useState(false);
  let [notes, setNotes] = useState([]);
  let [selectedNote, setSelectedNote] = useState(paramNoteId || "");
  let [messages, setMessages] = useState([
    {
      type: "ai",
      text: "Ask me anything about your notes and I'll help you understand.",
      time: "Now",
    },
  ]);

  useEffect(function () {
    async function fetchNotes() {
      try {
        let res = await getNotes();
        setNotes(res.data.notes);
        // if no noteId from params, default to first note
        if (!paramNoteId && res.data.notes.length > 0) {
          setSelectedNote(res.data.notes[0]._id);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchNotes();
  }, []);

  async function handleSendMessage() {
    if (!question.trim()) return;
    if (!selectedNote) return alert("Please select a note first.");

    let userMessage = { type: "user", text: question, time: "Now" };
    setMessages(function (prev) { return [...prev, userMessage]; });

    let currentQuestion = question;
    setQuestion("");

    try {
      setLoading(true);
      let res = await askAI(selectedNote, currentQuestion);
      setMessages(function (prev) {
        return [...prev, { type: "ai", text: res.data.answer, time: "Now" }];
      });
    } catch (error) {
      setMessages(function (prev) {
        return [...prev, { type: "ai", text: "Something went wrong. Try again.", time: "Now" }];
      });
    } finally {
      setLoading(false);
    }
  }

  function handleNewChat() {
    setMessages([{ type: "ai", text: "New chat started. Ask anything about your notes.", time: "Now" }]);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">AI Study Assistant</h1>
          <p className="text-gray-500 text-sm">Ask questions about your notes</p>
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
        <label className="text-sm text-gray-500 block mb-2">Select a note</label>
        <select
          value={selectedNote}
          onChange={function (e) { setSelectedNote(e.target.value); }}
          className="w-full border rounded-lg p-3 outline-none"
        >
          <option value="">-- Select a note --</option>
          {notes.map(function (note) {
            return (
              <option key={note._id} value={note._id}>
                {note.title}
              </option>
            );
          })}
        </select>
      </div>

      {/* Chat Box */}
      <div className="bg-white rounded-2xl shadow-sm h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map(function (msg, index) {
            return (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-2xl ${
                    msg.type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-70 block mt-2">{msg.time}</span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="bg-gray-100 w-fit p-3 rounded-xl text-sm text-gray-500">
              AI is typing...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t p-4 flex items-center gap-3">
          <input
            type="text"
            value={question}
            onChange={function (e) { setQuestion(e.target.value); }}
            onKeyDown={function (e) { if (e.key === "Enter") handleSendMessage(); }}
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