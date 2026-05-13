import React from "react";
import { FileText, Upload, MessageSquare, Eye, MoreVertical } from "lucide-react";
import { MdOutlineSummarize } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";



const UploadContent = () => {
  return (
    <div className="p-4 mt-30 md:mt-10  md:p-6 space-y-6 w-full">

      {/* Welcome */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          Upload Notes
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Upload your study materials and let AI analyse them
        </p>
      </div>

    

    </div>
  );
};

export default UploadContent;