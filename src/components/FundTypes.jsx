import React, { useState } from 'react';
import {
  FaHeartbeat,
  FaSchool,
  FaHome,
  FaDesktop,
  FaLightbulb,
  FaTools,
  FaBuilding,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const FundTypes = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fundTypes = [
    {
      title: 'Medical Fundraising',
      description:
        'Get emergency financial help to pay hospital bills and medication bills with online fundraising.',
      icon: <FaHeartbeat size={60} className="text-yellow-500" />,
    },
    {
      title: 'Education Fundraising',
      description:
        'Raise funds for tuition, books, and other education-related expenses with the support of donors.',
      icon: <FaSchool size={60} className="text-yellow-500" />,
    },
    {
      title: 'Personal Fundraising',
      description:
        'Whether it’s for an emergency, family support, or special occasion, raise funds for personal needs.',
      icon: <FaHome size={60} className="text-yellow-500" />,
    },
    {
      title: 'PC Building Fundraising',
      description: 'Get financial support for building Personal Computers.',
      icon: <FaDesktop size={60} className="text-yellow-500" />,
    },
    {
      title: 'Startup Idea Fundraising',
      description: 'Raise funds to start a new company.',
      icon: <FaBuilding size={60} className="text-yellow-500" />,
    },
    {
      title: 'Project Fundraising',
      description:
        'Project fundraising to complete the project needs such as hardware components.',
      icon: <FaTools size={60} className="text-yellow-500" />,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 3) % fundTypes.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 3 + fundTypes.length) % fundTypes.length
    );
  };

  return (
    <section className="py-20 px-6 font-epilogue bg-white">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          Raise Funds for Health, Education & More
        </h2>
        <p className="text-lg text-gray-700">
          Get emergency financial help and raise support from people who care.
        </p>
      </div>

      {/* Fund Cards */}
      <div className="relative">
        <motion.div
          key={currentIndex}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          {fundTypes.slice(currentIndex, currentIndex + 3).map((fund, index) => (
            <div
              key={index}
              className="w-full sm:w-[260px] md:w-[280px] lg:w-[300px] h-[380px] p-6 rounded-2xl shadow-md bg-yellow-50 hover:shadow-xl transition"
            >
              <div className="flex flex-col items-center justify-center text-center h-full">
                {fund.icon}
                <h3 className="text-xl font-bold text-black mt-6">{fund.title}</h3>
                <p className="text-sm text-gray-700 mt-4">{fund.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Navigation */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-0 z-10">
          <button
            className="p-3 bg-black text-white rounded-full shadow-lg hover:bg-yellow-500 transition"
            onClick={handlePrev}
          >
            &#8249;
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-0 z-10">
          <button
            className="p-3 bg-black text-white rounded-full shadow-lg hover:bg-yellow-500 transition"
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default FundTypes;
