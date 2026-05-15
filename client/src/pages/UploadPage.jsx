import React from "react";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import DashboardContent from "../components/DashboardContent";
import { Upload } from "lucide-react";
import MobileDashNav from "../layouts/MobileDashNav";
import DashboardNav from "../layouts/DashboardNav";
import UploadContent from "../components/UploadContent";

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col overflow-x-hidden">
      {/* Header */}
      <header className="w-full">
        <div className="md:hidden">
          <MobileDashNav />
        </div>
        <div className="hidden md:flex md:ml-64">
          <DashboardNav />
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        <div className="hidden md:block">
          <Sidebar />
        </div>

        <div className="flex-1 md:ml-64 pb-20 md:pb-0 w-full min-w-0">
          <UploadContent />
        </div>
      </div>

      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default UploadPage;
