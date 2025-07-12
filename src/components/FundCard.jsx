import React from 'react';
import { tagType } from '../assets';
import { daysLeft } from '../utils';

const FundCard = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="w-full sm:w-[280px] rounded-xl bg-yellow-200 hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden"
      onClick={handleClick}
    >
      {/* Card Image */}
      <img
        src={image}
        alt="campaign"
        className="w-full h-40 object-cover rounded-t-xl"
      />

      {/* Card Content */}
      <div className="flex flex-col p-4 gap-4">
        {/* Tag */}
        <div className="flex items-center gap-2">
          <img src={tagType} alt="category" className="w-4 h-4 object-contain" />
          <p className="text-sm font-medium text-gray-800">Education</p>
        </div>

        {/* Title + Description */}
        <div>
          <h3 className="font-semibold text-lg text-black truncate">{title}</h3>
          <p className="text-sm text-gray-700 mt-1 truncate">{description}</p>
        </div>

        {/* Target Info */}
        <div className="flex justify-between flex-wrap gap-y-2">
          <div>
            <h4 className="text-sm font-bold text-black">{amountCollected}</h4>
            <p className="text-xs text-gray-600">Raised of {target}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-black">{remainingDays}</h4>
            <p className="text-xs text-gray-600">Days Left</p>
          </div>
        </div>

        {/* Owner */}
        <div className="text-xs text-gray-800 truncate">
          Created by <span className="text-gray-600">{owner}</span>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
