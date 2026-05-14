import React, { useState, useEffect } from "react";
import { FileText, Trash2, Loader2, MoreVertical, Sparkles, } from "lucide-react";
import Sidebar from "../layouts/Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MobileBottomNav from "../layouts/MobileBottomNav";

let API = import.meta.env.VITE_API_URL;

const MyNotesPage = () => {
  let [notes, setNotes] = useState([]);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");
  let [openMenu, setOpenMenu] = useState(null);
  let navigate = useNavigate();

  useEffect(function () {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");
      let res = await axios.get(`${API}/notes`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data.notes);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load notes.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(noteId) {
    try {
      let token = localStorage.getItem("token");
      await axios.delete(`${API}/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter(function (n) { return n._id !== noteId; }));
      setOpenMenu(null);
    } catch (err) {
      alert("Failed to delete note.");
    }
  }

  function handleSummarize(noteId) {
    navigate("/summaries", { state: { noteId } });
  }

  function handleAskAI(noteId) {
    navigate("/chat", { state: { noteId } });
  }

  let colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-pink-500"];

  function getColor(index) {
    return colors[index % colors.length];
  }

  return (
    <div className="p-4 md:p-6 space-y-6w-4xl">
        <div className="hidden md:block">
          <Sidebar />
        </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">My Notes</h1>
          <p className="text-sm text-gray-400 mt-1">{notes.length} note{notes.length !== 1 ? "s" : ""} uploaded</p>
        </div>
        <button
          onClick={function () { navigate("/upload"); }}
          className="bg-blue-600 text-white text-sm px-4 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          + Upload Note
        </button>
      </div>

      

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl p-10 shadow-sm flex flex-col items-center gap-3 text-gray-400">
          <Loader2 size={28} className="animate-spin text-blue-600" />
          <p className="text-sm">Loading notes...</p>
        </div>
      )}

      {/* Empty */}
      {!loading && notes.length === 0 && !error && (
        <div className="bg-white rounded-xl p-10 shadow-sm flex flex-col items-center gap-3 text-gray-400">
          <FileText size={36} className="text-gray-300" />
          <p className="text-sm">No notes uploaded yet.</p>
          <button
            onClick={function () { navigate("/upload"); }}
            className="mt-2 bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload your first note
          </button>
        </div>
      )}

      {/* Notes List */}
      {!loading && notes.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
          {notes.map(function (note, index) {
            return (
              <div key={note._id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition relative">
                
                {/* Left */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`w-9 h-9 flex-shrink-0 rounded-lg ${getColor(index)} flex items-center justify-center`}>
                    <FileText size={16} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{note.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {note.description || "No description"} · {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                    {note.tags?.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {note.tags.map(function (tag) {
                          return (
                            <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right - Menu */}
                <div className="relative flex-shrink-0 ml-4">
                  <button
                    onClick={function () { setOpenMenu(openMenu === note._id ? null : note._id); }}
                    className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenu === note._id && (
                    <div className="absolute right-0 top-8 bg-white border border-gray-100 rounded-xl shadow-lg z-10 w-44 py-1">
                      <button
                        onClick={function () { handleSummarize(note._id); }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Sparkles size={15} className="text-purple-500" />
                        Summarize
                      </button>
                      <button
                        onClick={function () { handleAskAI(note._id); }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <FileText size={15} className="text-blue-500" />
                        Ask AI
                      </button>
                      <hr className="my-1 border-gray-100" />
                      <button
                        onClick={function () { handleDelete(note._id); }}
                        className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
 
       <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default MyNotesPage;