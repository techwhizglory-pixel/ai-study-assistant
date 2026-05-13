import React from "react";
import { Link,  } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Upload,
  MessageSquare,
  User,
  Notebook,
} from "lucide-react";
import { MdQuiz } from "react-icons/md";

const MobileBottomNav = () => {
  
     
  return (
    
    <div className="fixed bottom-0 left-0 w-full bg-white hadow-lg  flex justify-around items-center py-3 z-50">
         
      <Link
        to="/dashboard"
        className={`flex flex-col items-center text-sm hover:translate-y-1 hover:animate-bounce transition-all    `}
      >
        <LayoutDashboard size={20}/>
        <span>Home</span>
      </Link>

      <Link
        to="/notes"
        className="flex flex-col items-center text-sm hover:translate-y-1 hover:animate-bounce transition-all  "
      >
        <FileText size={20} className="" />
        <span>Notes</span>
      </Link>

      <Link
        to="/quizzes"
        className="bg-blue-700 text-white p-4 rounded-full -mt-8 shadow-lg ring-9 hover:-translate-y-2 transition-all "
      >
        <MdQuiz size={22} className="animate-pulse" />
      </Link>

      <Link
        to="/chat"
        className="flex flex-col items-center text-sm hover:translate-y-1 hover:animate-bounce transition-all  "
      >
        <MessageSquare size={20} />
        <span>Chat</span>
      </Link>

      <Link
        to="/profile"
        className="flex flex-col items-center text-sm  hover:translate-y-1 hover:animate-bounce transition-all  "
      >
        <Notebook size={20}  />
        <span>Summaries</span>
      </Link>
    </div>
  );
};

export default MobileBottomNav;
