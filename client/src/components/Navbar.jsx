import React, { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { TfiClose } from "react-icons/tfi";
import { Link } from "react-router-dom";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#howitworks", label: "How it works" },
  { href: "#testimonials", label: "Testimonials" },
];

const Navbar = () => {
  const [mobile, setMobile] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer">
            <img
              src="/logo.png"
              alt="AI Study Logo"
              className="w-16 h-16 object-contain scale-150"
            />

            <a href="/">
              <span className="text-lg sm:text-xl md:text-2xl font-bold">
                <span className="text-black">AI Study</span>
                <span className="text-blue-700"> Assistant</span>
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="px-4 py-2 text-sm font-medium hover:text-blue-700 transition"
              >
                {link.label}
              </a>
            ))}

            <button className="bg-blue-700 px-5 py-3 rounded-xl text-white font-medium">
              <Link to="/dashboard"> Get Started</Link>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <TfiClose /> : <IoMdMenu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobile && (
          <div className="md:hidden bg-white shadow-lg rounded-xl mt-2 p-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  onClick={() => setMobile(false)}
                  className="text-gray-700 hover:text-blue-700"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={() => setMobile(false)}
                className="bg-blue-700 text-white py-3 rounded-xl"
              >
                <Link to="/dashboard"> Get Started</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
