import React from "react";
import { FileText, Upload, MessageSquare, Eye, MoreVertical } from "lucide-react";
import { MdOutlineSummarize } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";

let stats = [
  { label: "Total Notes", value: "24", icon: FileText, color: "bg-blue-100 text-blue-600" },
  { label: "Summaries", value: "18", icon: MdOutlineSummarize, color: "bg-purple-100 text-purple-600" },
  { label: "Quizzes Taken", value: "12", icon: FaQuestion, color: "bg-green-100 text-green-600" },
  { label: "Average Score", value: "78%", icon: Eye, color: "bg-orange-100 text-orange-600" },
];

let recentNotes = [
  { title: "Data Structures and Algorithms.pdf", time: "Uploaded 3 days ago",  },
  { title: "Physics - Mechanics.pdf", time: "Uploaded 4 days ago", },
  { title: "Database Systems.pdf", time: "Uploaded 5 days ago",},
  { title: "Operating Systems.pdf", time: "Uploaded 1 week ago", },
];

let recentActivity = [
  { title: "Quiz Completed", sub: "Data Structures Quiz", score: "86%", time: "2 days ago", scoreColor: "text-green-600" },
  { title: "Summary Generated", sub: "Physics - Mechanics", time: "3 days ago" },
  { title: "AI Chat Session", sub: "Graph Theory Discussion", time: "5 days ago" },
  { title: "Note Uploaded", sub: "Operating Systems.pdf", time: "1 week ago" },
];

let quickActions = [
  { label: "Upload Notes", sub: "Upload new study material", icon: Upload, color: "bg-blue-100/10 text-blue-600" },
  { label: "Generate Summary", sub: "Get AI summary", icon: MdOutlineSummarize, color: "bg-purple-100 text-purple-600" },
  { label: "Create Quiz", sub: "Generate quiz", icon: FaQuestion, color: "bg-green-100 text-green-600" },
  { label: "Ask AI", sub: "Chat with AI", icon: MessageSquare, color: "bg-orange-100 text-orange-600" },
];

const DashboardContent = () => {
  return (
    <div className="p-4 mt-30 md:mt-10  md:p-6 space-y-6 w-full">

      {/* Welcome */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Welcome back, John! 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening with your studies today.
        </p>
      </div>

      {/* Stats */}
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

      {/* Recent Notes + Recent Activity */}
      <div className="grid md:grid-cols-2 gap-4 w-full">

        {/* Recent Notes */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Recent Notes</h2>
            <button className="text-blue-600 text-sm hover:underline">View all</button>
          </div>
          <div className="space-y-3">
            {recentNotes.map(function ({ title, time, color }) {
              return (
                <div key={title} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 flex-shrink-0 rounded-lg bg-red-600/30  flex items-center justify-center`}>
                      <FileText size={14} className="text-red-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-700 truncate">{title}</p>
                      <p className="text-xs text-gray-400">{time}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 flex-shrink-0 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-blue-600 text-sm hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map(function ({ title, sub, score, time, scoreColor }) {
              return (
                <div key={title} className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700">{title}</p>
                    <p className="text-xs text-gray-400 truncate">{sub} · {time}</p>
                  </div>
                  {score && (
                    <span className={`text-sm font-semibold flex-shrink-0 ${scoreColor}`}>{score}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map(function ({ label, sub, icon: Icon, color }) {
            return (
              <button
                key={label}
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