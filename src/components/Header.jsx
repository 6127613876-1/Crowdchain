import React from 'react';
import { crowdfunding } from '../assets'; // Make sure the path is correct

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between gap-12 py-20 px-6 md:px-16 font-epilogue bg-white">
      {/* Left Section */}
      <div className="md:w-1/2 w-full text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black leading-tight mb-6">
          Empower Your Fundraising with <span className="text-yellow-500">Blockchain</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Raise funds from compassionate donors worldwide. Our blockchain-backed platform ensures transparency and security for every donation.
        </p>
        <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:scale-105 transition">
          Start a Campaign
        </button>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 w-full">
        <img
          src={crowdfunding}
          alt="Crowdfunding Platform"
          className="w-full max-w-[600px] mx-auto rounded-3xl shadow-lg"
        />
      </div>
    </header>
  );
};

export default Header;
