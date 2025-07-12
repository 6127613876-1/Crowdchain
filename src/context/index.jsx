import React, { createContext, useContext, useEffect } from 'react';
import {
  useAddress,
  useContract,
  useContractWrite,
  useNetworkMismatch,
  useSwitchChain,
  useConnect
} from '@thirdweb-dev/react';
import { metamaskWallet } from '@thirdweb-dev/react';
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
import { db } from '../config/auth-firebase';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const address = useAddress();
  const connectWithMetamask = useConnect();
  const mismatch = useNetworkMismatch();
  const switchChain = useSwitchChain();

  const { contract, isLoading: contractLoading } = useContract(
    '0x9b1466A8a0994443574f6b35eE2804d5c51Ee641'
  );
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  // ✅ Connect to MetaMask + ensure Sepolia
  const connect = async () => {
    try {
      const wallet = await connectWithMetamask(metamaskWallet());
      if (mismatch && switchChain) {
        await switchChain(11155111); // Sepolia Chain ID
      }
      return wallet?.getAddress();
    } catch (err) {
      console.error('Failed to connect to MetaMask', err);
      return null;
    }
  };

  // 🔁 Auto switch to Sepolia if mismatch
  useEffect(() => {
    const autoSwitch = async () => {
      if (address && mismatch && switchChain) {
        await switchChain(11155111);
      }
    };
    autoSwitch();
  }, [address, mismatch, switchChain]);

  // 🦊 Listen for account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        console.warn("MetaMask is locked or no account connected");
      } else {
        console.log("MetaMask account changed:", accounts[0]);
      }
    };

    const { ethereum } = window;
    if (ethereum?.on) {
      ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (ethereum?.removeListener) {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  // 🚀 Publish campaign to contract + Firestore
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

      await addDoc(collection(db, 'campaigns'), campaignData);
      console.log("Campaign created and stored:", data);
    } catch (error) {
      console.error("Failed to publish campaign:", error);
    }
  };

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
      status: campaign.status,
    }));
  };

  const getUserCampaigns = async () => {
    const all = await getCampaigns();
    return all.filter((c) => c.owner === address);
  };

  const getPendingCampaigns = async () => {
    const all = await getCampaigns();
    return all.filter((c) => c.status === "pending");
  };

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

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    return donations[0].map((donator, i) => ({
      donator,
      donation: ethers.utils.formatEther(donations[1][i].toString())
    }));
  };

  const approveCampaign = async (pId) => {
    try {
      await contract.call('approveCampaign', [pId]);

      const q = query(collection(db, 'campaigns'), where('pId', '==', pId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const campaignDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'campaigns', campaignDoc.id), { status: 'approved' });
      } else {
        console.warn("No Firestore campaign found for pId:", pId);
      }
    } catch (error) {
      console.error("Error approving campaign:", error);
      throw error;
    }
  };

  const rejectCampaign = async (pId) => {
    try {
      await contract.call('rejectCampaign', [pId]);

      const q = query(collection(db, 'campaigns'), where('pId', '==', pId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const campaignDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, 'campaigns', campaignDoc.id), { status: 'rejected' });
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
