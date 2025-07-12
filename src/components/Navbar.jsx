import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { logo3, menu } from '../assets';
import { navlinks } from '../constants';
import { utils } from 'ethers';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { connect, address } = useStateContext();

  const handleConnect = async () => {
    try {
      const connected = await connect();
      if (connected && utils.isAddress(connected)) {
        navigate('/create-campaign');
      } else {
        console.warn('Invalid wallet address received.');
      }
    } catch (err) {
      console.error('Wallet connection error:', err.message);
      alert('MetaMask connection failed. Please ensure MetaMask is installed and try again.');
    }
  };

  const handleNavigate = (link) => {
    setIsActive(link.name);
    setToggleDrawer(false);
    navigate(link.link);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-70 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between px-6 py-4 md:px-10">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo3} alt="CrowdChain Logo" className="h-10 w-auto object-contain" />
        </div>

        {/* Desktop Button */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => (address ? navigate('/home/create-campaign') : handleConnect())}
            className="bg-[#ffde59] text-black font-semibold px-5 py-2 rounded-lg hover:scale-105 transition"
          >
            {address ? 'Create a campaign' : 'Connect'}
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <img
            src={menu}
            alt="Menu"
            className="w-8 h-8 cursor-pointer"
            onClick={() => setToggleDrawer((prev) => !prev)}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      {toggleDrawer && (
        <div className="sm:hidden px-6 pt-4 pb-6 bg-white shadow-lg transition-all">
          <ul className="space-y-3 mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer ${
                  isActive === link.name ? 'bg-[#f0f0f0]' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleNavigate(link)}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-5 h-5 ${isActive === link.name ? '' : 'grayscale'}`}
                />
                <span className="font-medium text-sm text-black">{link.name}</span>
              </li>
            ))}
          </ul>
          <button
            className="w-full text-center py-2 bg-[#ffde59] text-black font-semibold rounded-lg hover:scale-105 transition"
            onClick={() => (address ? navigate('/home/create-campaign') : handleConnect())}
          >
            {address ? 'Create a campaign' : 'Connect'}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
