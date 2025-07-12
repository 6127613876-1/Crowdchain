import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo3.png";

const NavbarAdmin = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-70 backdrop-blur-md shadow-md font-epilogue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={logo} alt="CrowdChain Logo" className="h-10 w-auto object-contain" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 font-semibold text-[#ffde59] hover:scale-105 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/home")}
            className="px-5 py-2 font-semibold text-[#ffde59] hover:scale-105 transition"
          >
            Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
