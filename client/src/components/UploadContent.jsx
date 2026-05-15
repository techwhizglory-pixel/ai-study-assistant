import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { uploadNote } from "../services/api";

const UploadNotesPage = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!file || !title) {
      setMessage("File and title are required");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);

    try {
      setLoading(true);

      // ✅ using centralized API
      const res = await uploadNote(formData);

      setMessage("Note uploaded successfully ✅");
      console.log(res.data);

      // reset form
      setFile(null);
      setTitle("");
      setDescription("");
      setTags("");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-30 md:mt-10 min-h-screen bg-gray-100">
      <div className="p-4 md:p-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Upload Notes</h1>
          <p className="text-gray-500">
            Upload your study materials and let AI analyze them.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleUpload}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >

          {/* Drag & Drop */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-blue-700 rounded-2xl p-10 text-center mb-6"
          >
            <UploadCloud size={50} className="mx-auto text-blue-700 mb-4" />

            <p className="font-medium">Drag and drop your file here</p>

            <p className="text-gray-500 my-2">or</p>

            <label className="bg-blue-700 text-white px-5 py-2 rounded-lg cursor-pointer inline-block">
              Choose File
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.txt"
              />
            </label>

            <p className="text-sm text-gray-400 mt-4">
              Supported formats: PDF, TXT
            </p>

            {file && (
              <p className="mt-4 text-green-600 font-medium">
                Selected File: {file.name}
              </p>
            )}
          </div>

          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full border rounded-lg p-3 mb-4"
          />

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full border rounded-lg p-3 h-28 mb-4"
          />

          {/* Tags */}
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Physics, Math, Engineering"
            className="w-full border rounded-lg p-3 mb-4"
          />

          {/* Message */}
          {message && (
            <p className="text-center text-sm text-blue-600 mb-4">
              {message}
            </p>
          )}

          {/* Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              {loading ? "Uploading..." : "Upload Note"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UploadNotesPage;