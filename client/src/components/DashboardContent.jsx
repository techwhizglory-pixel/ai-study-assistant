import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FileText, Eye, MoreVertical, Upload, MessageSquare } from "lucide-react";
import { MdOutlineSummarize } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";

const DashboardContent = () => {
  let [notes, setNotes] = useState([]);
  let [quizzes, setQuizzes] = useState([]);
  let [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  useEffect(function () {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      let [notesRes, quizzesRes] = await Promise.all([
        API.get("/notes"),
        API.get("/quiz"),
      ]);
      setNotes(notesRes.data.notes || []);
      setQuizzes(quizzesRes.data.quizzes || []);
    } catch (err) {
      console.log("Dashboard error:", err.message);
    } finally {
      setLoading(false);
    }
  }

  let avgScore = quizzes.filter(q => q.score !== undefined).length > 0
    ? Math.round(
        quizzes
          .filter(q => q.score !== undefined)
          .reduce((acc, q) => acc + (q.score / q.questions.length) * 100, 0) /
        quizzes.filter(q => q.score !== undefined).length
      ) + "%"
    : "—";

  let stats = [
    { label: "Total Notes", value: notes.length || "—", icon: FileText, color: "bg-blue-100 text-blue-600" },
    { label: "Summaries", value: notes.length || "—", icon: MdOutlineSummarize, color: "bg-purple-100 text-purple-600" },
    { label: "Quizzes Taken", value: quizzes.length || "—", icon: FaQuestion, color: "bg-green-100 text-green-600" },
    { label: "Average Score", value: avgScore, icon: Eye, color: "bg-orange-100 text-orange-600" },
  ];

  let quickActions = [
    { label: "Upload Notes", sub: "Upload study material", icon: Upload, color: "bg-blue-100 text-blue-600", path: "/upload" },
    { label: "My Notes", sub: "View all notes", icon: FileText, color: "bg-purple-100 text-purple-600", path: "/notes" },
    { label: "AI Chat", sub: "Chat with AI", icon: MessageSquare, color: "bg-orange-100 text-orange-600", path: "/chat" },
  ];

  if (loading) {
    return <div className="p-6 text-gray-600">Loading dashboard...</div>;
  }

  return (
    <div className="p-4 mt-30 md:mt-14 md:p-6 space-y-6 w-full">

      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">Welcome back 👋</h1>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with your studies today.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {stats.map(function ({ label, value, icon: Icon, color }) {
          return (
            <div key={label} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center ${color}`}>
                <Icon size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold text-gray-800">{value}</p>
                <p className="text-xs text-gray-500 truncate">{label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4 w-full">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Recent Notes</h2>
            <button onClick={function () { navigate("/notes"); }} className="text-blue-600 text-sm hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {notes.length === 0 ? (
              <p className="text-sm text-gray-400">No notes uploaded yet.</p>
            ) : (
              notes.slice(0, 4).map(function (note) {
                return (
                  <div key={note._id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                        <FileText size={14} className="text-red-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate">{note.title}</p>
                        <p className="text-xs text-gray-400">{new Date(note.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <MoreVertical size={16} className="text-gray-400 flex-shrink-0" />
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Recent Quizzes</h2>
          </div>
          <div className="space-y-3">
            {quizzes.length === 0 ? (
              <p className="text-sm text-gray-400">No quizzes taken yet.</p>
            ) : (
              quizzes.slice(0, 4).map(function (quiz) {
                let pct = quiz.score !== undefined
                  ? Math.round((quiz.score / quiz.questions.length) * 100) + "%"
                  : "Incomplete";
                return (
                  <div key={quiz._id} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{quiz.difficulty} Quiz</p>
                      <p className="text-xs text-gray-400">{new Date(quiz.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-sm font-semibold flex-shrink-0 ${quiz.score !== undefined ? "text-green-600" : "text-gray-400"}`}>
                      {pct}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          {quickActions.map(function ({ label, sub, icon: Icon, color, path }) {
            return (
              <button
                key={label}
                onClick={function () { navigate(path); }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <p className="text-sm font-medium text-gray-700">{label}</p>
                <p className="text-xs text-gray-400 text-center">{sub}</p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default DashboardContent;