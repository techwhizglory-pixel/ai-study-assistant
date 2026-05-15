import { MoreVertical, User } from "lucide-react";
import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const MobileDashNav = () => {
  return (
    <>
      <header className="fixed w-full bg-white ">
        <div className="flex md:hidden  items-center justify-between px-5 pt-6 pb-4 w-full">
          <h1 className="text-2xl font-bold ">AI Study Assistant</h1>
          <div className="flex items-center gap-4 bg-blue-700 p-2 rounded-full">
            <Link
              to="/profile
          "
            >
              <User size={24} className="" />
            </Link>


          </div>
        </div>

        <div className="px-4">
          <div className="bg-zinc-400 rounded-full px-4 py-3 flex items-center gap-3">
            <IoSearch className="text-blue-700 animate-pulse" size={20} />
            <input
              type="text"
              placeholder="Search for anything"
              className="bg-transparent outline-none text-gray-300 w-full"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default MobileDashNav;
