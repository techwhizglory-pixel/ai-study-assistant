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
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "My Notes", path: "/notes", icon: <FileText size={18} /> },
  { name: "Upload", path: "/upload", icon: <Upload size={18} /> },
  { name: "AI Chat", path: "/chat", icon: <MessageSquare size={18} /> },
  { name: "Profile", path: "/profile", icon: <User size={18} /> },
];

const MobileBottomNav = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
   

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 w-full bg-white hadow-lg  flex justify-around items-center py-3 z-50">
        {navLinks.slice(0, 5).map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs ${
                isActive
                  ? "text-purple-400"
                  : "text-black"
              }`
            }
          >
            {link.icon}
            <span className="text-[10px] mt-1">
              {link.name}
            </span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default MobileBottomNav;