import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import MobileBottomNav from "../layouts/MobileBottomNav";
import DashboardContent from "../components/DashboardContent";


const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-20 md:pb-0">
        < DashboardContent/>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <MobileBottomNav />
      </div>
    </div>
  );
};

export default DashboardLayout;