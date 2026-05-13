import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1500);
  };

  return (
    <AuthLayout
      title="Join AI Study Assistant"
      subtitle="Start studying smarter today"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-6">Create Account</h2>

        <div>
          <label className="text-blue-700 ">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4"
          />
        </div>
        <div>
          <label className="text-blue-700 "> Email</label>
          <input
            type="email"
            name="email"
            placeholder="youremail@gmail.com"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg mb-4"
          />
        </div>

        <div className="relative mb-6">
          <label className="text-blue-700 ">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-10"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="relative mb-6">
          <label className="text-blue-700 ">confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder=" confirm Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-10"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        <button className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition">
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-medium">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
