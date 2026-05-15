import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Dashboard pages
import DashboardLayout from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import MyNotesPage from "./pages/MyNotesPage";
import SummaryPage from "./pages/SummaryPage";

import ProfilePage from "./pages/ProfilePage";
import AiChatPage from "./pages/AiChartPage";
import QuizPage from "./pages/QuizPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Pages */}
        <Route path="/dashboard" element={<DashboardLayout />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/notes" element={<MyNotesPage />} />
        <Route path="/summary/:noteId" element={<SummaryPage />} />
        <Route path="/quizzes/:noteId" element={<QuizPage />} />
        <Route path="/chat/:noteId" element={<AiChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;