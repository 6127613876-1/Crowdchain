import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaHandsHelping,
  FaGlobe,
  FaShieldAlt,
  FaFileContract,
  FaLock,
} from 'react-icons/fa';

const Define = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const specialPoints = [
    {
      title: 'Direct Contributions',
      description:
        'No banks or middlemen are involved. The money goes straight from the supporter to the project owner.',
      icon: <FaHandsHelping size={60} className="text-yellow-600" />,
    },
    {
      title: 'Global Access',
      description:
        'Anyone, anywhere in the world, can contribute using their smartphone or computer.',
      icon: <FaGlobe size={60} className="text-yellow-600" />,
    },
    {
      title: 'Transparency',
      description:
        'All transactions are recorded publicly on the blockchain, ensuring trust and accountability.',
      icon: <FaShieldAlt size={60} className="text-yellow-600" />,
    },
    {
      title: 'Security',
      description:
        'The technology is very secure, protecting both the supporters and the project owners from fraud.',
      icon: <FaLock size={60} className="text-yellow-600" />,
    },
    {
      title: 'Fairness',
      description:
        'Agreements are handled by smart contracts, which automatically enforce the terms of the deal without human interference.',
      icon: <FaFileContract size={60} className="text-yellow-600" />,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 3) % specialPoints.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 3 + specialPoints.length) % specialPoints.length);
  };

  return (
    <section className="py-16 px-4 md:px-10 text-black font-epilogue">
      {/* Title */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Understanding Blockchain-Based Crowdfunding
        </h2>
        <p className="text-lg text-gray-700">
          Blockchain-based crowdfunding is a new way of raising money using modern technology.
          It allows people from all over the world to contribute directly to a project without
          needing banks or other middlemen.
        </p>
      </div>

      {/* Cards */}
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          key={currentIndex}
          className="flex flex-wrap justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.5 }}
        >
          {specialPoints.slice(currentIndex, currentIndex + 3).map((point, index) => (
            <div
              key={index}
              className="w-full sm:w-[260px] md:w-[280px] lg:w-[300px] h-[350px] bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300"
            >
              {point.icon}
              <h3 className="text-xl font-semibold mt-4 text-gray-900">{point.title}</h3>
              <p className="mt-3 text-sm text-gray-700">{point.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0">
          <button
            aria-label="Previous"
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3 shadow-lg transition"
            onClick={handlePrev}
          >
            &#8249;
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0">
          <button
            aria-label="Next"
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full p-3 shadow-lg transition"
            onClick={handleNext}
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Define;
