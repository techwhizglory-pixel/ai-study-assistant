import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { generateSummary } from "../services/api";

const SummaryPage = () => {
  const { noteId } = useParams();

  const [summary, setSummary] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await generateSummary(
        noteId,
        token
      );

      setSummary(res.data.summary);
      setNoteTitle(res.data.noteTitle);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
     

      <div className="p-4 md:p-8">
        <h1 className="text-2xl font-bold mb-2">
          {noteTitle}
        </h1>

        <p className="text-gray-500 mb-6">
          AI Generated Summary
        </p>

        <div className="bg-white p-6 rounded-2xl shadow-sm">
          {loading ? (
            <p>Generating summary...</p>
          ) : (
            <p className="leading-8 text-gray-700">
              {summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;