import React from 'react';
import { process } from '../assets';

const HowWorks = () => {
  return (
    <section className="py-20 px-6 md:px-16 font-epilogue bg-white">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          How Crowdfunding Works
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Crowdfunding enables individuals and organizations to raise funds by pooling small contributions from many people. Here's how it works:
        </p>
      </div>

      {/* Image Display */}
      <div className="flex justify-center">
        <img
          src={process}
          alt="Crowdfunding Process"
          className="w-full max-w-4xl rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
};

export default HowWorks;
