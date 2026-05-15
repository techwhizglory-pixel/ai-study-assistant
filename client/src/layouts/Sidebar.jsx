import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Sparkles,
  MessageSquare,
  User,
  LogOut,
} from "lucide-react";
import { MdQuiz } from "react-icons/md";

const navLinks = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    name: "Upload",
    path: "/upload",
    icon: <Upload size={18} />,
  },

   {
     name: "Quiz",
     path: "/quizzes/1",
     icon: <MdQuiz size={18} />,
   },
  {
    name: "Notes",
    path: "/notes",
    icon: <FileText size={18} />,
  },
  {
    name: "Summary",
    path: "/summary/1",
    icon: <Sparkles size={18} />,
  },
  {
    name: "AI Chat",
    path: "/chat/1",
    icon: <MessageSquare size={18} />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <User size={18} />,
  },
];

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col justify-between w-64 h-screen bg-[#0B0B2D] text-white fixed left-0 top-0 p-6">
        
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold mb-10">
            AI Study
          </h1>

          {/* Navigation Links */}
          <div className="space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-purple-600"
                      : "hover:bg-white/10"
                  }`
                }
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-red-400 hover:text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;