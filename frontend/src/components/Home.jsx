import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await api.get("/user/home");
        setUser(res.data.data);
      } catch (err) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchHome();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* 🔥 Top Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <h1 className="text-xl font-bold text-indigo-600">Auth Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* 🔥 Main Content */}
      <div className="p-8">
        {/* 👋 Welcome Card */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg mb-8">
          <h2 className="text-2xl font-bold">
            Welcome back, {user?.name || "User"} 👋
          </h2>
          <p className="mt-2 text-sm opacity-90">
            You are successfully logged in. Your system is running smoothly 🚀
          </p>
        </div>

        {/* 📊 Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Account Status</h3>
            <p className="text-xl font-bold text-green-600 mt-2">Active ✅</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Email</h3>
            <p className="text-lg font-semibold mt-2 break-words">
              {user?.email}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Phone</h3>
            <p className="text-lg font-semibold mt-2">{user?.phone}</p>
          </div>
        </div>

        {/* 🚀 Cool Section */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-lg font-bold mb-4">System Overview</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-100 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Backend</p>
              <p className="font-bold text-indigo-700">
                Node.js + Express running ⚡
              </p>
            </div>

            <div className="bg-purple-100 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Database</p>
              <p className="font-bold text-purple-700">
                PostgreSQL connected 🗄️
              </p>
            </div>

            <div className="bg-green-100 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Authentication</p>
              <p className="font-bold text-green-700">JWT secured 🔐</p>
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl">
              <p className="text-sm text-gray-600">Deployment</p>
              <p className="font-bold text-yellow-700">Docker + CI ready 🚀</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
