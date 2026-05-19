import React from "react";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import DashboardContent from "../components/DashboardContent";
import {  LayoutDashboardIcon, MoreVertical, Upload, User } from "lucide-react";
import MobileDashNav from "../layouts/MobileDashNav";
import DashboardNav from "../layouts/DashboardNav";
import UploadContent from "../components/UploadContent";
import SummaryContent from "../components/SummaryContent";
import AiChatcontent from "../components/AiChatcontent";

const AiChatPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      <header>
         <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <LayoutDashboardIcon size={16} />
        </div>
        <span className="text-lg font-bold">AI Study</span>
      </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 md:ml-64 pb-20 md:pb-0 w-full min-w-0">
          <AiChatcontent />
        </div>
      </div>

   

      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default AiChatPage;
