import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { logo3, sun } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ name, imgUrl, isActive, disabled, handleClick }) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center
      ${!disabled ? 'cursor-pointer' : 'opacity-50'} 
      ${isActive === name ? 'bg-[#ffde59]' : ''}
      hover:bg-[#fef3c7] transition-all`}
    onClick={handleClick}
    title={name}
    aria-label={name}
  >
    <img
      src={imgUrl}
      alt={`${name}_icon`}
      className="w-1/2 h-1/2 object-contain"
    />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const [isActive, setIsActive] = useState('dashboard');

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  return (
    <div className="flex justify-between items-center flex-col sticky top-9 h-[93vh]">
      <div className="flex-1 flex flex-col justify-between items-center bg-white rounded-[20px] w-[76px] py-4 mt-12 shadow-lg">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (link.name === 'logout') {
                  handleLogout();
                } else if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        {/* Sun Icon (theme toggle or just a placeholder?) */}
        <Icon name="theme" imgUrl={sun} handleClick={() => {}} />
      </div>
    </div>
  );
};

export default Sidebar;
