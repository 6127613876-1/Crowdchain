import React from 'react';

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white text-black rounded-xl shadow-xl p-6 w-full max-w-md transition-all">
        <h2 className="text-xl font-semibold text-center mb-4">
          {message}
        </h2>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#ffde59] hover:bg-yellow-400 text-black font-medium px-6 py-2 rounded-lg transition-transform hover:scale-105"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
