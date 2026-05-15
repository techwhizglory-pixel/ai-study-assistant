import React from "react";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      
      {/* Left Section */}
      <div className="hidden md:flex bg-blue-200/40 text-white items-center justify-center p-10">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="logo"
            className="w-24 mx-auto mb-6 scale-450"
          />

          <h1 className="text-4xl font-bold text-black">{title}</h1>
          <p className="mt-4 text-gray-800">{subtitle}</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-center bg-gray-50 p-6">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;