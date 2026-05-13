import React from "react";
import { BiUser } from "react-icons/bi";
import { GiStabbedNote } from "react-icons/gi";
import { MdUploadFile } from "react-icons/md";
import { IoChatboxOutline } from "react-icons/io5";
import { MdQuiz } from "react-icons/md";

const highlights = [
  {
    icon: MdUploadFile,
    title: "Upload Notes",
    description: "Upload PDF or TXT files and extract content instantly.",
  },

  {
    icon: GiStabbedNote,
    title: "AI Summaries",
    description: "Get accurte summaries of your study materials.",
  },

  {
    icon: MdQuiz,
    title: "Quiz Generation",
    description: "Working closely with teams  to bring ideas to life.",
  },

  {
    icon: IoChatboxOutline,
    title: "AI Chat",
    description: "Ask questions and get AI-generated answer based on your notes.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* section header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mt-4 mb-3 ">
            Power Features for Better Learning
          </h2>
          <p className=" text-center text-gray-700 ">
            Everything you need to study smarter,all in one place
          </p>
        </div>

        {/* section body */}
        <div>
          <div className="grid md:grid-cols-2 lg:flex gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-2xl border border-black/10 "
              >
                <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="text-lg font-semibold mb-2 ">{item.title}</h3>
                <p className="text-sm text-muted-foreground ">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
