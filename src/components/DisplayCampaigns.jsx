import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import FundCard from './FundCard';
import { loader } from '../assets';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname.startsWith('/admin') ? '/admin' : '/home';

  const handleNavigate = (campaign) => {
    navigate(`${currentPath}/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <section className="w-full px-4 py-10 md:px-8 text-black font-epilogue">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-6">
        {title} <span className="text-gray-600">({campaigns.length})</span>
      </h2>

      {/* Content */}
      <div className="flex flex-wrap gap-6 justify-start">
        {isLoading ? (
          <div className="w-full flex justify-center items-center">
            <img
              src={loader}
              alt="Loading..."
              className="w-[80px] h-[80px] object-contain animate-spin"
            />
          </div>
        ) : campaigns.length === 0 ? (
          <p className="text-gray-700 text-sm font-medium">No campaigns found.</p>
        ) : (
          campaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default DisplayCampaigns;
