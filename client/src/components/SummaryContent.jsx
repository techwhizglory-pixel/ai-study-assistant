import React, { useState, useEffect } from "react";
import { ArrowLeft, Download, Copy, Loader2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

let API = import.meta.env.VITE_API_URL;

const SummaryPage = () => {
  let [activeTab, setActiveTab] = useState("overview");
  let [summary, setSummary] = useState(null);
  let [noteTitle, setNoteTitle] = useState("");
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState("");
  let [copied, setCopied] = useState(false);

  let location = useLocation();
  let noteId = location.state?.noteId;

  useEffect(function () {
    async function fetchSummary() {
      if (!noteId) {
        setError("No note selected. Please go back and select a note.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        let token = localStorage.getItem("token");
        let res = await axios.post(
          `${API}/ai/summarize`,
          { noteId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSummary(res.data.summary);
        setNoteTitle(res.data.noteTitle);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to generate summary.");
      } finally {
        setLoading(false);
      }
    }
    fetchSummary();
  }, [noteId]);

  let overview = "";
  let keyPoints = [];

  if (summary) {
    let lines = summary.split("\n").filter(function (l) { return l.trim(); });
    let points = lines.filter(function (l) { return l.trim().startsWith("-") || l.trim().startsWith("•"); });
    let prose = lines.filter(function (l) { return !l.trim().startsWith("-") && !l.trim().startsWith("•"); });

    overview = prose.join(" ");
    keyPoints = points.map(function (p) { return p.replace(/^[-•]\s*/, ""); });

    if (keyPoints.length === 0 && overview) {
      keyPoints = overview.match(/[^.!?]+[.!?]+/g) || [];
    }
  }

  function handleCopy() {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(function () { setCopied(false); }, 2000);
  }

  function handleDownload() {
    if (!summary) return;
    let blob = new Blob([summary], { type: "text/plain" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = `${noteTitle || "summary"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-4 md:p-6 space-y-6 w-full">

      {/* Back */}
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {/* Title */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {noteTitle || "Summary"}
        </h1>
        <p className="text-sm text-gray-400 mt-1">AI-generated summary</p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="bg-white rounded-xl p-10 shadow-sm flex flex-col items-center gap-3 text-gray-400">
          <Loader2 size={28} className="animate-spin text-blue-600" />
          <p className="text-sm">Generating summary...</p>
        </div>
      )}

      {/* Tabs + Content */}
      {!loading && summary && (
        <>
          <div className="flex gap-6 border-b border-gray-200">
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

          <div className="bg-white rounded-xl p-5 shadow-sm">
            {activeTab === "overview" ? (
              <div>
                <h2 className="font-semibold text-gray-800 mb-3">Overview</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {overview || summary}
                </p>
              </div>
            ) : (
              <div>
                <h2 className="font-semibold text-gray-800 mb-3">Key Points</h2>
                <ul className="space-y-3">
                  {keyPoints.map(function (point, i) {
                    return (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 mt-2 rounded-full bg-blue-600 flex-shrink-0" />
                        {point.trim()}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <Download size={16} />
              Download Summary
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <Copy size={16} />
              {copied ? "Copied!" : "Copy Summary"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SummaryPage;