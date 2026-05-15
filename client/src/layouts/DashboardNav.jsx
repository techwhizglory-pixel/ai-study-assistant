import React from "react";
import { Search, Bell } from "lucide-react";

const DashboardNav = () => {
  return (
    <header className=" absolute right-0 w-xl  px-6 py-3 flex items-center justify-between">
      
      {/* Search Bar */}
      <div className="relative w-full sm:max-w-full md:max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full bg-gray-100 rounded-lg pl-9 pr-4 py-2.5 text-sm border border-gray-400 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 ml-4">
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <img
          src="heroimg.png"
          alt="profile"
          className="w-9 h-9 rounded-full object-cover cursor-pointer"
        />
      </div>
    </header>
  );
};

export default DashboardNav;