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
import { useState } from "react";
import { MdOutlineSummarize, MdQuiz, MdSummarize } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";

const Sidebar = () => {
  const [active, setActive] = useState("");
  return (
    <div className="w-64 h-screen bg-[#0f172a] text-white p-5 fixed">
      <h2 className="text-xl font-bold mb-10">AI Study</h2>

      <div className=" grid">
        <div className="">
          <Link
            to="/dashboard"
            className="flex items-center gap-4 border-r-3 rounded-md mb-8 "
          >
            <LayoutDashboard />
            Dashboard
          </Link>

          <Link
            to="/notes"
            className="flex items-center gap-4 border-r-3 rounded-md mb-8 "
          >
            <FileText />
            My Notes
          </Link>
          <Link
            to="/upload"
            className="flex items-center gap-4 border-r-3 rounded-md mb-8 "
          >
            <Upload />
            Upload Notes
          </Link>

          <Link
            to="/summaries"
            className="flex items-center gap-4 border-r-3 rounded-md mb-8 "
          >
            <Notebook />
            Summaries
          </Link>

          <Link
            to="/quizzes"
            className="flex items-center gap-4 border-r-3 rounded-md mb-8 "
          >
            <FaQuestion />
            Quizzes
          </Link>
          <Link
            to="/chat"
            className="flex items-center gap-4 border-r-3 rounded-md mb-8 "
          >
            <MessageSquare />
            AI Chat
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-4 border-r-3 rounded-md mb-8"
          >
            <User />
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
