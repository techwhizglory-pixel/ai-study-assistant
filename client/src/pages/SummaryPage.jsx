import React from "react";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import DashboardContent from "../components/DashboardContent";
import { MoreVertical, Upload, User } from "lucide-react";
import MobileDashNav from "../layouts/MobileDashNav";
import DashboardNav from "../layouts/DashboardNav";
import UploadContent from "../components/UploadContent";
import SummaryContent from "../components/SummaryContent";
import { Link } from "react-router-dom";

const SummaryPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      <header>
        <div className="flex md:hidden  items-center justify-between px-5 pt-6 pb-4 w-full">
          <h1 className="text-2xl font-bold ">AI Study Assistant</h1>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 md:ml-64 pb-20 md:pb-0 w-full min-w-0">
          <SummaryContent />
        </div>
      </div>

     <button className="fixed bottom-24 right-5 bg-blue-700 p-4 rounded-2xl shadow-lg md:hidden z-50">
        <Link
        to="/upload">
        <Upload className="text-white" size={28} />
        </Link>
      </button>

      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default SummaryPage;
