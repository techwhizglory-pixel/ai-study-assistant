import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardLayout from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import SummaryPage from "./pages/SummaryPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardLayout />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/summaries" element={<SummaryPage />} />
  <Route path="/profile" element={<ProfilePage />} />
          
        </Routes>


      </BrowserRouter>
    </>
  );
};

export default App;
