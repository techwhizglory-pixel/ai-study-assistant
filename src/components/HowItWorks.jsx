import React from "react";

let steps = [
  {
    id: 1,
    title: "Upload",
    desc: "Upload your study materials in PDF or TXT format.",
  },
  {
    id: 2,
    title: "Analyze",
    desc: "Our AI analyzes the content and understands the key concepts.",
  },
  {
    id: 3,
    title: "Learn & Master",
    desc: "Get summaries, quizzes, and ask questions to master the topic.",
  },
];

function HowItWorks() {
  return (
    <section id="howitworks" className="bg-gradient-to-t from-blue-700 via-blue-600 to-blue-900 py-16 px-6">
      <div className=" mx-auto text-center">
        <h2 className="text-white text-2xl font-bold mb-1">How It Works</h2>
        <p className="text-indigo-200 text-sm mb-12">
          Get started in 3 simple steps.
        </p>

        {/* Steps row */}
        <div className="flex items-start justify-between relative">
          {/* connector line behind circles */}
          <div className="absolute top-5 left-[12%] right-[12%] h-[2px] bg-indigo-400/50 z-0" />

          {steps.map(function (step) {
            return (
              <div key={step.id} className="flex flex-col items-center z-10 flex-1">
                {/* Circle */}
                <div className="w-10 h-10 rounded-full bg-white text-indigo-700 font-bold text-base flex items-center justify-center shadow-md mb-4">
                  {step.id}
                </div>

                {/* Title */}
                <p className="text-white font-semibold text-sm mb-2">
                  {step.title}
                </p>

                {/* Description */}
                <p className="text-indigo-200 text-xs leading-relaxed max-w-[140px]">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;