import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="bg-gradient-to-b from-indigo-100 via-white to-indigo-100 min-h-screen flex flex-col justify-center items-center">
      {/* Logo Section */}
      <div className="mb-12">
        {/* Larger Logo */}
        <Logo className="w-40 h-40 mx-auto" />
      </div>

      {/* Bank Description */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-800 mb-4">Welcome to Move Digital Bank</h1>
        <p className="text-xl text-gray-700 max-w-lg mx-auto leading-relaxed">
          Step into the future of banking with us. From tracking your accounts to seamless transactions, 
          our secure and intuitive platform puts you in control. It's banking, simplified.
        </p>
      </div>

      {/* Buttons for Login and Signup */}
      <div className="flex space-x-6">
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-8 py-3 text-lg rounded-full shadow hover:bg-blue-700 transition transform hover:scale-105"
        >
          Login
        </button>
        <button
          onClick={handleSignUp}
          className="bg-indigo-600 text-white px-8 py-3 text-lg rounded-full shadow hover:bg-indigo-700 transition transform hover:scale-105"
        >
          Sign Up
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
      <p className="text-sm text-gray-700 text-center">
          Open-source{" "}
          <a href="https://github.com/psilocyamp/HTML-MindHub" target="_blank" rel="noreferrer" className="text-[#8b52ff] hover:underline">
            code
          </a>{" "}
          by{" "}
          <a href="https://www.linkedin.com/in/amparo-p%C3%A9rez/" target="_blank" rel="noreferrer" className="text-[#8b52ff] hover:underline">
            Amparo Perez
          </a>
        </p>
      </footer>
    </div>
  );
};

export default WelcomePage;
