import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Frontend validation (important UX)
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match ❌");
    }

    try {
      await api.post("/auth/register", form);
      alert("Registered successfully 🎉");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-2">Create Account</h2>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          {/* 🔥 NEW FIELD */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
