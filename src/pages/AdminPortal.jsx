import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { NavbarAdmin, DisplayCampaigns } from '../components';

const AdminPortal = () => {
  const { getPendingCampaigns, contract } = useStateContext();
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchPendingCampaigns = async () => {
      if (!contract) return;

      try {
        setIsLoading(true);
        const data = await getPendingCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error('Error fetching pending campaigns:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingCampaigns();
  }, [contract, getPendingCampaigns]);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin />
      <main className="pt-32 px-4 md:px-10">
        <DisplayCampaigns
          title="Pending Campaigns"
          isLoading={isLoading}
          campaigns={campaigns}
        />
      </main>
    </div>
  );
};

export default AdminPortal;
