import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Upload,
  MessageSquare,
  User,
  Notebook,
} from "lucide-react";

const MobileBottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-700 hadow-lg  flex justify-around items-center py-3 z-50">
      <Link to="/dashboard" className="flex flex-col items-center text-sm">
        <LayoutDashboard size={20} />
        <span>Home</span>
      </Link>

      <Link to="/notes" className="flex flex-col items-center text-sm ">
        <FileText size={20} />
        <span>Notes</span>
      </Link>

      <Link
        to="/upload"
        className="bg-blue-700 text-white p-4 rounded-full -mt-8 shadow-lg ring-9"
      >
        <Upload size={22} />
      </Link>

      <Link to="/chat" className="flex flex-col items-center text-sm">
        <MessageSquare size={20} />
        <span>Chat</span>
      </Link>

      <Link to="/profile" className="flex flex-col items-center text-sm">
        <Notebook size={20} className="hover:bg-red-600" />
        <span>Summaries</span>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
