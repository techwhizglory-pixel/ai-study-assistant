import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Upload,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "My Notes", path: "/notes", icon: <FileText size={18} /> },
  { name: "Upload", path: "/upload", icon: <Upload size={18} /> },
  { name: "AI Chat", path: "/chat", icon: <MessageSquare size={18} /> },
  { name: "Profile", path: "/profile", icon: <User size={18} /> },
];

const Sidebar = () => {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
    <div className="hidden md:flex flex-col justify-between w-64 h-screen bg-[#0B0B2D] text-white fixed left-0 top-0 p-6">

      {/* Logo */}
      <div>
        <h1 className="text-2xl font-bold mb-10">AI Study</h1>

        {/* Navigation Links */}
        <div className="space-y-2">
          {navLinks.map(function (link) {
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={function ({ isActive }) {
                  return `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive ? "bg-purple-600" : "hover:bg-white/10"
                  }`;
                }}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-400 hover:text-red-500 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;