import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUser } from "../services/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-3xl font-bold mb-6 text-center">
          Create Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-blue-700 block mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-blue-700 block mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="youremail@gmail.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <label className="text-blue-700 block mb-2">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-11"
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-6">
          <label className="text-blue-700 block mb-2">
            Confirm Password
          </label>
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-4 top-11"
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
        >
          {loading
            ? "Creating account..."
            : "Register"}
        </button>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-700 font-medium"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;