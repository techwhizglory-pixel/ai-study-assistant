import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  FileText,
  Trash2,
  MessageSquare,
  Brain,
  
} from "lucide-react";
import { getNotes, deleteNote } from "../services/api";
import MobileBottomNav from "../layouts/MobileBottomNav";
import Sidebar from "../layouts/Sidebar";

const MyNotesPage = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getNotes();
      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);

      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 md:ml-64 p-8">
          Loading notes...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar/>

      <div className="md:hidden">
        <MobileBottomNav />
      </div>
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            My Notes
          </h1>
          <p className="text-gray-500">
            Manage all your uploaded study materials
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow text-center">
            <FileText className="mx-auto mb-3 text-gray-400" size={40} />
            <h2 className="text-xl font-semibold">
              No Notes Uploaded Yet
            </h2>
            <p className="text-gray-500 mt-2">
              Upload your first note to start learning smarter
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Upload Notes
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white rounded-xl shadow p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-blue-600" />
                  <h2 className="font-semibold text-lg">
                    {note.title}
                  </h2>
                </div>

                <p className="text-gray-500 text-sm mb-3">
                  {note.description || "No description available"}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() =>
                      navigate(`/summary/${note._id}`)
                    }
                    className="bg-purple-600 text-white py-2 rounded-lg"
                  >
                    Summary
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/chat/${note._id}`)
                    }
                    className="bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <MessageSquare size={16} />
                    Chat
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/quiz/${note._id}`)
                    }
                    className="bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Brain size={16} />
                    Quiz
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyNotesPage;