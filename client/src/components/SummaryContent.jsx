import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { generateSummary } from "../services/api";
import { ArrowLeft } from "lucide-react";

const SummaryPage = () => {
  let { noteId } = useParams();
  let [summary, setSummary] = useState(null);
  let [noteTitle, setNoteTitle] = useState("");
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");
  let [activeTab, setActiveTab] = useState("overview");

  useEffect(function () {
    fetchSummary();
  }, []);

  async function fetchSummary() {
    try {
      let res = await generateSummary(noteId);
      let data = res.data.summary;

      // Handle both object and string responses from AI
      if (typeof data === "object") {
        setSummary(data);
      } else {
        // Parse plain text into overview + keyPoints
        let lines = data.split("\n").filter(function (l) { return l.trim(); });
        let points = lines.filter(function (l) {
          return l.trim().startsWith("-") || l.trim().startsWith("•");
        });
        let prose = lines.filter(function (l) {
          return !l.trim().startsWith("-") && !l.trim().startsWith("•");
        });
        setSummary({
          overview: prose.join(" "),
          keyPoints: points.map(function (p) { return p.replace(/^[-•]\s*/, ""); }),
        });
      }

      setNoteTitle(res.data.noteTitle);
    } catch (error) {
      setError("Failed to generate summary.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <Link to="/notes" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft size={16} />
        Back to Notes
      </Link>

      <h1 className="text-2xl font-bold mb-1">{noteTitle}</h1>
      <p className="text-gray-500 mb-6 text-sm">AI Generated Summary</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="bg-white p-6 rounded-2xl shadow-sm text-gray-500">
          Generating summary...
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div className="flex gap-6 border-b border-gray-200 mb-4">
            <button
              onClick={function () { setActiveTab("overview"); }}
              className={`pb-3 text-sm font-medium transition-all ${
                activeTab === "overview"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Overview
            </button>
            <button
              onClick={function () { setActiveTab("keypoints"); }}
              className={`pb-3 text-sm font-medium transition-all ${
                activeTab === "keypoints"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Key Points
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            {activeTab === "overview" ? (
              <p className="leading-8 text-gray-700">
                {summary?.overview || "No overview available."}
              </p>
            ) : (
              <ul className="space-y-3">
                {summary?.keyPoints?.length > 0 ? (
                  summary.keyPoints.map(function (point, i) {
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                        {point}
                      </li>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-sm">No key points available.</p>
                )}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryPage;