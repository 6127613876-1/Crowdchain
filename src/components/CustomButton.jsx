import React from 'react';

const CustomButton = ({ btnType = 'button', title, handleClick, styles = '' }) => {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      className={`px-6 py-3 min-h-[52px] rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-base leading-6 shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300 ${styles}`}
    >
      {title}
    </button>
  );
};

export default CustomButton;
