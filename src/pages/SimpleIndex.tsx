
import React from "react";
import { useNavigate } from "react-router-dom";

const SimpleIndex = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">Nexus FinLabs</h1>
      <p className="mb-8 text-xl">Welcome to the application</p>
      
      <div className="flex gap-4">
        <button 
          onClick={() => navigate("/login")}
          className="px-6 py-2 bg-white text-slate-900 rounded-md"
        >
          Login
        </button>
        <button 
          onClick={() => navigate("/register")}
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SimpleIndex;
