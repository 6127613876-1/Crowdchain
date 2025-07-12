import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-yellow-300 text-black font-epilogue pt-16 pb-10 px-6 md:px-10 rounded-t-[150px]">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Community Message */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Join The CrowdChain Community</h3>
          <p className="text-gray-800 text-sm md:text-base">
            CrowdChain is an online technology platform connecting donors and donees. We do not provide
            any financial return in any form whatsoever, including but not limited to financial securities
            (debt or equity), interest, dividend, profit share, or rewards in cash, to individuals who
            make payments on the platform.
          </p>
        </div>

        {/* Newsletter & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
          
          {/* Subscribe */}
          <div className="text-center md:text-left w-full md:w-1/2">
            <p className="text-lg font-semibold mb-4">Subscribe to our newsletter for updates:</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <button className="bg-black text-yellow-300 px-6 py-2 rounded-md hover:scale-105 transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center md:text-left w-full md:w-1/2">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex justify-center md:justify-start gap-6 text-2xl">
              <a href="#" className="hover:scale-125 transition"><FaFacebook /></a>
              <a href="#" className="hover:scale-125 transition"><FaTwitter /></a>
              <a href="#" className="hover:scale-125 transition"><FaInstagram /></a>
              <a href="#" className="hover:scale-125 transition"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="text-center text-sm text-gray-600">
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-black transition">Terms of Use</a>
            <a href="#" className="hover:text-black transition">Privacy Policy</a>
            <a href="#" className="hover:text-black transition">Raise a Concern</a>
            <a href="#" className="hover:text-black transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
