import React from 'react';
import { loader } from '../assets';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-40 backdrop-blur-sm transition-opacity duration-300">
      <img
        src={loader}
        alt="Loading..."
        className="w-24 h-24 animate-spin"
      />
      <p className="mt-6 font-epilogue font-semibold text-lg text-black text-center">
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default Loader;
