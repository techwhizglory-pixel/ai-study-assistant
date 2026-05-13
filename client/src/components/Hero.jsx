import React from "react";
import { FaArrowRight } from "react-icons/fa"

const Hero = () => {
  return (
    <section className="pt-32  bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-center">
        {/* left text */}
        <div>

            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
             Study Smarter 
             <br/>
             <span className="text-blue-700">Not Harder</span>
            </h1>
            <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          Upload your notes, generate AI summaries, generate quizzes, and chat with AI tomaster any topic faster.
            </p>


 <div className="mt-8 flex gap-4">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-800 transition">
              Get Started
              <FaArrowRight />
            </button>

            <button className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
             <div className="mt-8 text-sm text-gray-500">
            Trusted by students worldwide ⭐⭐⭐⭐⭐
          </div>
        </div>

        {/* right img */}
        <div>
            <img
            src="heroimg.png"
            alt="AI study Assistant"
            className="w-full"
            />
        </div>
      </div>
    </section>
  );
};

export default Hero;
