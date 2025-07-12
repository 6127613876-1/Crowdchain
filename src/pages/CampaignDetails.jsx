import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { logo3 } from '../assets';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

const CampaignDetails = () => {
  const { state } = useLocation();
  const isAdmin = state?.isAdmin || false;

  const navigate = useNavigate();
  const { donate, getDonations, contract, address, approveCampaign, rejectCampaign } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);
    setDonators(data);
  };

  useEffect(() => {
    if (contract) fetchDonators();
  }, [contract, address]);

  const handleDonate = async () => {
    const collected = parseFloat(state.amountCollected);
    const target = parseFloat(state.target);
    const donation = parseFloat(amount);

    if (address === state.owner) {
      setAlertMessage("You cannot donate to your own campaign.");
      setAlertOpen(true);
      return;
    }

    if (collected >= target) {
      setAlertMessage("This campaign is already fully funded.");
      setAlertOpen(true);
      return;
    }

    if (donation + collected > target) {
      setAlertMessage("Donation exceeds the remaining target.");
      setAlertOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      await donate(state.pId, amount);
      setAlertMessage("Donation successful!");
      setAlertOpen(true);
      navigate("/home");
    } catch (error) {
      console.error("Donation failed", error);
      setAlertMessage("Donation failed. Please try again.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (pId) => {
    setIsLoading(true);
    try {
      await approveCampaign(pId);
      setAlertMessage(`Campaign ${pId} approved successfully.`);
      setAlertOpen(true);
      navigate("/admin");
    } catch (error) {
      console.error("Error approving campaign:", error);
      setAlertMessage("Failed to approve campaign.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (pId) => {
    setIsLoading(true);
    try {
      await rejectCampaign(pId);
      setAlertMessage(`Campaign ${pId} rejected successfully.`);
      setAlertOpen(true);
      navigate("/admin");
    } catch (error) {
      console.error("Error rejecting campaign:", error);
      setAlertMessage("Failed to reject campaign.");
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const isCampaignActive = state.status === 'approved' && remainingDays > 0;

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-20 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-[#ffffff] mt-2 shadow-secondary">
            <div
              className="absolute h-full bg-[#ffde59]"
              style={{
                width: `${calculateBarPercentage(state.target, state.amountCollected)}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={state.amountCollected} />
          <CountBox title="Total Backers" value={donators.length} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          {/* Creator Info */}
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Creator</h4>
            <div className="mt-[20px] flex items-center gap-[14px]">
              <img src={logo3} alt="creator" className="w-[52px] h-[52px] object-contain" />
              <p className="text-black text-sm break-all">{state.owner}</p>
            </div>
          </div>

          {/* Story */}
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Story</h4>
            <p className="mt-[20px] text-[#414141] leading-[26px] text-justify">{state.description}</p>
          </div>

          {/* Donators */}
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Donators</h4>
            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div key={index} className="flex justify-between text-[#414141] text-sm">
                    <p>{index + 1}. {item.donator}</p>
                    <p>{item.donation}</p>
                  </div>
                ))
              ) : (
                <p className="text-[#414141]">No donations yet. Be the first!</p>
              )}
            </div>
          </div>
        </div>

        {/* Fund Form */}
        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-black uppercase">Fund</h4>
          <div className="mt-[20px] p-4 bg-[#ffde59] rounded-[10px] shadow-secondary">
            <p className="text-white text-lg text-center">
              {isCampaignActive ? "Fund the campaign" : "Campaign is not active or approved"}
            </p>

            {isCampaignActive && (
              <>
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full mt-4 py-2 px-4 rounded bg-transparent border border-white text-black placeholder:text-white"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="my-4 p-3 bg-white rounded text-black text-sm">
                  <h4 className="font-semibold mb-2">Support the campaign</h4>
                  <p>Support the project for no reward, just because it speaks to you.</p>
                </div>

                <CustomButton
                  btnType="button"
                  title="Fund Campaign"
                  styles="w-full"
                  handleClick={handleDonate}
                />
              </>
            )}
          </div>
        </div>

        {/* Admin Controls */}
        {isAdmin && (
          <div className="flex flex-col gap-3 mt-4 ml-2">
            <CustomButton
              title="✅ Approve"
              styles="bg-green-500 text-white"
              handleClick={() => handleApprove(state.pId)}
            />
            <CustomButton
              title="❌ Reject"
              styles="bg-red-500 text-white"
              handleClick={() => handleReject(state.pId)}
            />
          </div>
        )}
      </div>

      {/* Alert Box */}
      <Box sx={{
        position: "fixed",
        top: "4rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "400px",
        zIndex: 1000,
      }}>
        <Collapse in={alertOpen}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setAlertOpen(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {alertMessage}
          </Alert>
        </Collapse>
      </Box>
    </div>
  );
};

export default CampaignDetails;
