import React from "react";
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="flex gap-1 items-center ">
              <img
                src="/logo.png"
                alt="AI Study Logo"
                className="w-6 h-6 object-contain scale-350 "
              />
              <h2 className="text-xl font-bold">AI Study Assistant</h2>
            </div>

            <p className="text-gray-400 mt-4">
              Study smarter with AI-powered learning tools.
            </p>
            <div className="flex gap-4 text-xl mt-4 ">
              <div className="w-10 h-10 rounded-full bg-gray-200/20 flex items-center justify-center mb-4 hover:bg-primary/20">
                <FaTwitter className="text-blue-700" />
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-200/20 flex items-center justify-center mb-4 hover:bg-primary/20">
                <FaInstagram className="text-blue-700" />
              </div>

              <div className="w-10 h-10 rounded-full bg-gray-200/20 flex items-center justify-center mb-4 hover:bg-primary/20">
                {" "}
                <FaGithub className="text-blue-700" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Features</li>
              <li>Pricing</li>
              <li>Resources</li>
            </ul>
          </div>

           <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/blog">
                Blog
                </Link>
                </li>
              <li>
                 <Link to="/help-center">
                Help Center
                </Link></li>
              <li>
                 <Link to="/faq">FAQ</Link>
                </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about">
                About
                </Link>
                </li>
              <li>
                 <Link to="/contact">
                Contact
                </Link></li>
              <li>
                 <Link to="/careers">Careers</Link>
                </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-900 mt-10 pt-6 text-center text-gray-400">
          © 2026 AI Study Assistant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
