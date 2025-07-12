import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import ScrollVideo from '../components/ScrollVideo'; // Optional: remove if unused

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState(null);

  const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Failed to load campaigns. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <main className="mt-20 text-black px-4 sm:px-8 lg:px-16">
      {/* Optional: Scroll video banner */}
      {/* <ScrollVideo /> */}

      {error && (
        <div className="text-red-600 text-center mb-4 font-semibold">
          {error}
        </div>
      )}

      <DisplayCampaigns 
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </main>
  );
};

export default Home;
