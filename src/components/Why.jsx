import React from 'react';
import { head } from '../assets'; // Make sure this path is correct

const Why = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between py-20 px-6 font-epilogue space-y-10 md:space-y-0">
      {/* Left Image */}
      <div className="md:w-1/2 w-full">
        <img
          src={head}
          alt="Crowdfunding for Medical Treatment"
          className="w-full h-auto rounded-full shadow-xl"
        />
      </div>

      {/* Right Text */}
      <div className="md:w-1/2 w-full md:pl-12">
        <h2 className="text-4xl md:text-6xl font-bold text-black mb-6">
          You Can Choose Fundraising with CrowdChain if...
        </h2>
        <ul className="list-disc pl-6 text-lg text-black space-y-4">
          <li>You need funds urgently for medical treatment.</li>
          <li>You have limited savings to cover unexpected medical expenses.</li>
          <li>Traditional medical loans and insurance are not enough to cover your needs.</li>
        </ul>
        <p className="text-black pt-4">
          Get financial help for medical treatment by raising funds with the support of donors and well-wishers online.
        </p>
      </div>
    </section>
  );
};

export default Why;
