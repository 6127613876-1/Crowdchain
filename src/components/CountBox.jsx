import React from 'react';

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-[180px] shadow-md rounded-xl overflow-hidden bg-gradient-to-b from-yellow-400 to-yellow-300">
      <h4 className="font-semibold text-3xl text-white bg-yellow-500 w-full text-center py-3 truncate">
        {value}
      </h4>
      <p className="font-medium text-base text-gray-800 bg-yellow-200 w-full text-center py-2 px-3">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
