import React, { createContext, useContext, useEffect } from 'react';
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useNetwork,
  useNetworkMismatch,
  useSwitchChain
} from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  addDoc
} from 'firebase/firestore';

import { db } from '../config/auth-firebase'; // Adjust the path

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract, isLoading: contractLoading } = useContract('0x9b1466A8a0994443574f6b35eE2804d5c51Ee641');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();
  const mismatch = useNetworkMismatch();
  const switchChain = useSwitchChain();
  const { chainId } = useNetwork();

  // Auto switch to Sepolia
  useEffect(() => {
    if (mismatch) {
      switchChain(11155111);
    }
  }, [mismatch, switchChain]);

  // Publish new campaign
  const publishCampaign = async (form) => {
    try {
      const targetAsString = String(form.target);
      const deadlineTimestamp = new Date(form.deadline).getTime();

      const data = await createCampaign({
        args: [address, form.title, form.description, targetAsString, deadlineTimestamp, form.image],
      });

      const campaignData = {
        owner: address,
        title: form.title,
        description: form.description,
        target: targetAsString,
        deadline: deadlineTimestamp,
        image: form.image,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "campaigns"), campaignData);
      console.log("Campaign created and stored:", data);
    } catch (error) {
      console.error("Failed to publish campaign:", error);
    }
  };

  // Fetch all campaigns
  const getCampaigns = async () => {
    if (!contract) return [];
    const campaigns = await contract.call('getCampaigns');

    return campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      isFunded: campaign.isFunded,
      pId: i,
      status: campaign.status
    }));
  };

  // Get campaigns owned by current wallet
  const getUserCampaigns = async () => {
    const all = await getCampaigns();
    return all.filter((c) => c.owner === address);
  };

  // Get only pending campaigns (for admin)
  const getPendingCampaigns = async () => {
    const all = await getCampaigns();
    return all.filter((c) => c.status === "pending");
  };

  // Donate to campaign
  const donate = async (pId, amount) => {
    try {
      const value = ethers.utils.parseEther(amount.toString());
      const tx = await contract.call('donateToCampaign', [pId], { value });
      console.log("Donation successful:", tx);
      return tx;
    } catch (error) {
      console.error("Donation failed:", error);
      throw error;
    }
  };

  // Get donors and their donations
  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    return donations[0].map((donator, i) => ({
      donator,
      donation: ethers.utils.formatEther(donations[1][i].toString())
    }));
  };

  // Admin: approve a campaign
  const approveCampaign = async (pId) => {
    try {
      await contract.call('approveCampaign', [pId]);

      const q = query(collection(db, "campaigns"), where("pId", "==", pId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const campaignDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "campaigns", campaignDoc.id), { status: "approved" });
      } else {
        console.warn("No Firestore campaign found for pId:", pId);
      }
    } catch (error) {
      console.error("Error approving campaign:", error);
      throw error;
    }
  };

  // Admin: reject a campaign
  const rejectCampaign = async (pId) => {
    try {
      await contract.call('rejectCampaign', [pId]);

      const q = query(collection(db, "campaigns"), where("pId", "==", pId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const campaignDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "campaigns", campaignDoc.id), { status: "rejected" });
      } else {
        console.warn("No Firestore campaign found for pId:", pId);
      }
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      throw error;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        contract,
        contractLoading,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        getPendingCampaigns,
        donate,
        getDonations,
        approveCampaign,
        rejectCampaign
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
