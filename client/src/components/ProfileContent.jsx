import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [stats, setStats] = useState([
    { label: "Notes Uploaded", value: 0 },
    { label: "Summaries Generated", value: 0 },
    { label: "Quizzes Completed", value: 0 },
    { label: "Average Score", value: "0%" },
  ]);

  // Load user from localStorage safely
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log("Invalid user data in localStorage");
      }
    }
  }, []);

  // Fetch real stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        const notes = data.notes || [];

        setStats([
          {
            label: "Notes Uploaded",
            value: notes.length,
          },
          {
            label: "Summaries Generated",
            value: "—",
          },
          {
            label: "Quizzes Completed",
            value: "—",
          },
          {
            label: "Average Score",
            value: "—",
          },
        ]);
      } catch (err) {
        console.log("Stats error:", err.message);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="mt-30 md:mt-10 flex min-h-screen bg-gray-100 overflow-x-hidden">
      <div className="flex-1 md:ml-64 w-full p-4 md:p-8">

        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">

          {/* User Info */}
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 truncate">
                {user.name || "Unknown User"}
              </h1>
              <p className="text-gray-500 truncate">
                {user.email || "No email"}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <button className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 w-full md:w-auto">
            Edit Profile
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((item) => (
            <div
              key={item.label}
              className="bg-white p-5 rounded-2xl shadow-sm"
            >
              <h2 className="text-2xl font-bold">{item.value}</h2>
              <p className="text-gray-500 text-sm">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Account Info */}
        <div className="bg-white rounded-2xl p-6 shadow-sm w-full">
          <h2 className="text-2xl font-bold mb-6">
            Account Information
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email Address</p>
              <p className="font-semibold break-all">{user.email}</p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Role</p>
              <p className="font-semibold">Student</p>
            </div>
          </div>

          {/* Logout */}
          <div className="mt-9">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-500 hover:text-red-600"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;