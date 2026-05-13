import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileText, Upload, MessageSquare, User, Notebook, LogOut } from "lucide-react";
import { FaQuestion } from "react-icons/fa";

let navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/notes", icon: FileText, label: "My Notes" },
  { to: "/upload", icon: Upload, label: "Upload Notes" },
  { to: "/summaries", icon: Notebook, label: "Summaries" },
  { to: "/quizzes", icon: FaQuestion, label: "Quizzes" },
  { to: "/chat", icon: MessageSquare, label: "AI Chat" },
  { to: "/profile", icon: User, label: "Profile" },
];

const Sidebar = () => {
  let location = useLocation();

  return (
    <div className="w-64 h-screen bg-[#0f172a] text-white flex flex-col fixed top-0 left-0">
      
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <LayoutDashboard size={16} />
        </div>
        <span className="text-lg font-bold">AI Study</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {navItems.map(function({ to, icon: Icon, label }) {
          let isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                ${isActive
                  ? "bg-indigo-800 text-white font-medium"
                  : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-white/10">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition-all">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;