import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";

import { useStateContext } from "../context";
import { CustomButton, FormField, Loader, Modal } from "../components";
import { checkIfImage } from "../utils";
import { addDoc, collection } from "firebase/firestore";
import { db } from '../config/auth-firebase';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
    aadhaar: "",
    pancard: "",
    title: "",
    description: "",
    category: "",
    target: "",
    deadline: "",
    image: "",
    // documents: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    aadhaar: "",
    pancard: "",
    documentType: "",
    title: "",
    description: "",
    category: "",
    target: "",
    deadline: "",
    image: "",
    // documents: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    const value = e.target.value;
    setForm({ ...form, [fieldName]: value });
  
    // Validation logic for each field
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
  
      switch (fieldName) {
        case "name":
          newErrors.name = value.trim() === "" ? "Name is required." : "";
          break;
  
        case "email":
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          newErrors.email = emailRegex.test(value)
            ? ""
            : "Please enter a valid email address.";
          break;
  
        case "phone":
          const phoneRegex = /^[0-9]{10}$/; // Adjust regex for your phone format
          newErrors.phone = phoneRegex.test(value)
            ? ""
            : "Please enter a valid 10-digit phone number.";
          break;
  
        case "address":
          newErrors.address = value.trim() === "" ? "Address is required." : "";
          break;
  
        case "pincode":
          const pincodeRegex = /^[0-9]{5,6}$/; // Adjust regex for pincode format
          newErrors.pincode = pincodeRegex.test(value)
            ? ""
            : "Please enter a valid pincode.";
          break;
  
        case "country":
          newErrors.country = value.trim() === "" ? "Country is required." : "";
          break;
  
        case "state":
          newErrors.state = value.trim() === "" ? "State is required." : "";
          break;
  
        case "city":
          newErrors.city = value.trim() === "" ? "City is required." : "";
          break;
  
        case "aadhaar":
          const aadhaarRegex = /^[0-9]{12}$/; // Adjust for Aadhaar format
          newErrors.aadhaar =
            value.trim() === "" || !aadhaarRegex.test(value)
              ? "A valid Aadhaar number is required."
              : "";
          break;
  
        case "pancard":
          const pancardRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // Adjust for PAN card format
          newErrors.pancard =
            value.trim() === "" || !pancardRegex.test(value)
              ? "A valid PAN card number is required."
              : "";
          break;
  
        case "title":
          newErrors.title =
            value.trim() === "" ? "Campaign name is required." : "";
          break;
  
        case "description":
          newErrors.description =
            value.trim() === "" ? "Description is required." : "";
          break;
  
        case "category":
          newErrors.category = value.trim() === "" ? "Category is required." : "";
          break;
  
        case "target":
          newErrors.target =
            isNaN(value) || Number(value) <= 0
              ? "Please enter a valid goal amount."
              : "";
          break;
  
        case "deadline":
          newErrors.deadline = value.trim() === "" ? "Goal date is required." : "";
          break;
  
        case "image":
          newErrors.image = value.trim() === "" ? "Image URL is required." : "";
          break;
  
        // case "documents":
        //   newErrors.documents =
        //     value.trim() === "" ? "Proof documents are required." : "";
        //   break;
  
        default:
          break;
      }
  
      return newErrors;
    });
  };
  

  const handleFileChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.files[0] });
  };

  const handleNextStep = () => {
    const newErrors = { ...errors };
  
    // Step-specific validation
    switch (currentStep) {
      case 1:
        if (!form.name) newErrors.name = "Name is required.";
        if (!form.email) {
          newErrors.email = "Email is required.";
        } else {
          const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
          if (!emailRegex.test(form.email)) {
            newErrors.email = "Please enter a valid email address.";
          }
        }
        if (!form.phone) newErrors.phone = "Phone number is required.";
        if (!form.address) newErrors.address = "Address is required.";
        if (!form.pincode) newErrors.pincode = "Pincode is required.";
        if (!form.country) newErrors.country = "Country is required.";
        if (!form.state) newErrors.state = "State is required.";
        if (!form.city) newErrors.city = "City is required.";
        break;
  
      case 2:
        if (form.country === "IN") {
          if (form.documentType === "aadhaar" && !form.aadhaar)
            newErrors.aadhaar = "Aadhaar number is required.";
          if (form.documentType === "pancard" && !form.pancard)
            newErrors.pancard = "PAN card number is required.";
        }
        break;
  
      case 3:
        if (!form.title) newErrors.title = "Campaign name is required.";
        if (!form.description) newErrors.description = "Description is required.";
        if (!form.category) newErrors.category = "Category is required.";
        if (!form.target) newErrors.target = "Goal amount is required.";
        if (!form.deadline) newErrors.deadline = "Goal date is required.";
        break;
  
      case 4:
        if (!form.image) newErrors.image = "Image URL is required.";
        // if (!form.documents) newErrors.documents = "Proof documents are required.";
        break;
  
      default:
        break;
    }
  
    // Update errors and proceed only if there are no errors
    setErrors(newErrors);
  
    if (Object.values(newErrors).every((error) => error === "")) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };
  

  const handlePreviousStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{6}$/.test(form.pincode)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        pincode: "Please enter a valid 6-digit pincode.",
      }));
      return;
    }

    if (form.country === 'IN') {
      if (form.documentType === 'aadhaar' && !/^\d{12}$/.test(form.aadhaar)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          aadhaar: "Please enter a valid 12-digit Aadhaar number.",
        }));
        return;
      }
      if (form.documentType === 'pancard' && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pancard)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pancard: "Please enter a valid PAN card number.",
        }));
        return;
      }
    }

    try {
      const campaignData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        country: form.country,
        state: form.state,
        city: form.city,
        pincode: form.pincode,
        documentType: form.country === "IN" ? form.documentType : "",
        aadhaar: form.aadhaar,
        pancard: form.pancard,
        title: form.title,
        description: form.description,
        category: form.category,
        target: form.target,
        deadline: form.deadline,
        image: form.image,
        createdAt: new Date(),
        status: "pending", // Add status field
      };
  
      const docRef = await addDoc(collection(db, "campaigns"), campaignData);
      console.log("Document written with ID: ", docRef.id);
  
      checkIfImage(form.image, async (exists) => {
        if (exists) {
          setIsLoading(true);
          await createCampaign({ 
            ...form, 
            target: ethers.utils.parseUnits(form.target, 18) 
          });
          setIsLoading(false);
          navigate('/home');
        } else {
          alert('Provide a valid image URL');
          setForm({ ...form, image: '' });
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

// Fetch Country List from CountriesNow
useEffect(() => {
  const fetchCountries = async () => {
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/positions");
      const data = await response.json();
      if (data && data.data) {
        setCountries(data.data.map((country) => ({
          name: country.name,
        })));
      }
    } catch (err) {
      console.error("Error fetching countries:", err);
    }
  };
  fetchCountries();
}, []);

// Fetch States when country is selected
useEffect(() => {
  const fetchStates = async () => {
    if (!form.country) return;
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: form.country })
      });
      const data = await response.json();
      if (data && data.data && data.data.states) {
        setStates(data.data.states.map((s) => ({ name: s.name })));
      } else {
        setStates([]);
      }
    } catch (err) {
      console.error("Error fetching states:", err);
      setStates([]);
    }
  };
  fetchStates();
}, [form.country]);

// Fetch Cities when state is selected
useEffect(() => {
  const fetchCities = async () => {
    if (!form.country || !form.state) return;
    try {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: form.country,
          state: form.state,
        })
      });
      const data = await response.json();
      if (data && data.data) {
        setCities(data.data.map((cityName) => ({ name: cityName })));
      } else {
        setCities([]);
      }
    } catch (err) {
      console.error("Error fetching cities:", err);
      setCities([]);
    }
  };
  fetchCities();
}, [form.country, form.state]);


  return (
    <div className="bg-[#ffffff] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 mt-10">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-black">
          Start a Campaign
        </h1>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-300 h-2 rounded-full mt-4">
        <div
          className={`h-2 rounded-full bg-[#ffde59]`}
          style={{ width: `${(currentStep / 5) * 100}%` }}
        ></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[30px] flex flex-col gap-[30px]"
      >
        {currentStep === 1 && (
          <>
            <h2 className="font-epilogue font-bold text-[20px] text-black">User Data</h2>
            <div className="flex flex-wrap gap-[40px]">
              <div className="form-group">
              <FormField
                labelName="Name *"
                placeholder="Enter your name"
                inputType="text"
                value={form.name}
                handleChange={(e) => handleFormFieldChange("name", e)}
              />
              {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
              </div>
              <div className="form-group">
              <FormField
                labelName="Email *"
                placeholder="Enter your email"
                inputType="email"
                value={form.email}
                handleChange={(e) => handleFormFieldChange("email", e)}
              />
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>
              <div className="form-group">
              <FormField
                labelName="Phone Number *"
                placeholder="Enter your phone number"
                inputType="text"
                value={form.phone}
                handleChange={(e) => handleFormFieldChange("phone", e)}
              />
              {errors.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
              </div>
              <div className="form-group">
              <FormField
                labelName="Address *"
                placeholder="Enter your address"
                inputType="text"
                value={form.address}
                handleChange={(e) => handleFormFieldChange("address", e)}
              />
              {errors.address && <div className="text-red-500 text-sm mt-1">{errors.address}</div>}
              </div>
              <div>
              <FormField
                labelName="Country *"
                inputType="select"
                value={form.country}
                handleChange={(e) => handleFormFieldChange("country", e)}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </FormField>

                {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country}</div>}
              </div>

              <div>
              <FormField
                labelName="State *"
                inputType="select"
                value={form.state}
                handleChange={(e) => handleFormFieldChange("state", e)}
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </FormField>
              {errors.state && <div className="text-red-500 text-sm mt-1">{errors.state}</div>}
            </div>

            <div>
                <FormField
                  labelName="City *"
                  inputType="select"
                  value={form.city}
                  handleChange={(e) => handleFormFieldChange("city", e)}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </FormField>
                {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city}</div>}
              </div>

              <div>
              <FormField
                labelName="Pincode *"
                placeholder="Enter your pincode"
                inputType="text"
                value={form.pincode}
                handleChange={(e) => handleFormFieldChange("pincode", e)}
              />
              {errors.pincode && <div className="text-red-500 text-sm mt-1">{errors.pincode}</div>}
              </div>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="font-epilogue font-bold text-[20px] text-black">
              User Additional Info
            </h2>

            {/* Show Aadhaar/PAN card details only if the country is India */}
            {form.country === 'IN' && (
              <>
                <div>
                  <label className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                    Do you have an Aadhaar Card or PAN Card?
                  </label>
                  <div className="flex gap-4 text-black">
                    <label>
                      <input 
                        type="radio" 
                        name="documentType"
                        value="aadhaar"
                        checked={form.documentType === 'aadhaar'}
                        onChange={(e) => handleFormFieldChange('documentType', e)} 
                      />
                      Aadhaar Card
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="documentType"
                        value="pancard"
                        checked={form.documentType === 'pancard'}
                        onChange={(e) => handleFormFieldChange('documentType', e)} 
                      />
                      PAN Card
                    </label>
                  </div>
                </div>

                {form.documentType === 'aadhaar' && (
                  <div>
                  <FormField
                    labelName="Aadhaar Card Number *"
                    placeholder="Enter your Aadhaar card number"
                    inputType="text"
                    value={form.aadhaar}
                    handleChange={(e) => handleFormFieldChange("aadhaar", e)}
                  />
                  {errors.aadhaar && <div className="text-red-500 text-sm mt-1">{errors.aadhaar}</div>}
                  </div>
                )}

                {form.documentType === 'pancard' && (
                  <div>
                  <FormField
                    labelName="PAN Card Number *"
                    placeholder="Enter your PAN card number"
                    inputType="text"
                    value={form.pancard}
                    handleChange={(e) => handleFormFieldChange("pancard", e)}
                  />
                  {errors.pancard && <div className="text-red-500 text-sm mt-1">{errors.pancard}</div>}
                  </div>
                
                )}

              </>
            )}
          </>
        )}
        {currentStep === 3 && (
          <>
            <h2 className="font-epilogue font-bold text-[20px] text-black">
              Campaign Details
            </h2>
            <div>
            <FormField
              labelName="Campaign Name *"
              placeholder="Enter campaign name"
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange("title", e)}
            />
            {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
            </div>
            <div>
            <FormField
              labelName="Campaign Description *"
              placeholder="Enter campaign description"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange("description", e)}
            />
            {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
            </div>
            <div>
            <FormField
              labelName="Campaign Category *"
              inputType="select"
              value={form.category}
              handleChange={(e) => handleFormFieldChange("category", e)}
            >
              <option value="">Select Category</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Others">Others</option>
            </FormField>
            {errors.category && <div className="text-red-500 text-sm">{errors.category}</div>}
            </div>
            <div>
            <FormField
              labelName="Goal Amount *"
              placeholder="Enter goal amount in ETH"
              inputType="text"Country
              value={form.target}
              handleChange={(e) => handleFormFieldChange("target", e)}
            />
            {errors.target && <div className="text-red-500 text-sm">{errors.target}</div>}
            </div>
            <div>
            <FormField
              labelName="Goal Date *"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange("deadline", e)}
            />
            {errors.deadline && <div className="text-red-500 text-sm">{errors.deadline}</div>}
            </div>
          </>

        )}

        {currentStep === 4 && (
          <>
            <h2 className="font-epilogue font-bold text-[20px] text-black">
              Campaign Additional Info
            </h2>
            <div>
            <FormField
              labelName="Image of the Affected Person *"
              placeholder="Enter image URL"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleFormFieldChange("image", e)}
            />
            {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}
            </div>
            {/* <div>
            <label className="flex-1 w-full flex flex-col">
              <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                Proof Documents (Medical Reports, Bills) *
              </span>
              <input
                type="file"
                onChange={(e) => handleFileChange("documents", e)}
                className="py-[15px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-black text-[14px] rounded-[10px] sm:min-w-[300px]"
              />
            </label>
            {errors.documents && <div className="text-red-500 text-sm">{errors.documents}</div>}
            </div> */}
          </>
        )}

        {currentStep === 5 && (
          <>
            <h2 className="font-epilogue font-bold text-[20px] text-black">
              Terms and Conditions
            </h2>
            <div className="flex flex-col gap-4 text-black font-semibold text-lg">
              <label className="flex items-center gap-2">
                <input type="checkbox" required />
                <span>
                  I agree to the terms and conditions of the platform.
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" required />
                <span>
                  I confirm that this campaign adheres to all applicable laws
                  and regulations.
                </span>
              </label>
            </div>
          </>
        )}

        "http://api.geonames.org/countryInfoJSON?lang=en&username=srivigneshs09"


        <div className="flex justify-between items-center mt-8">
          {currentStep > 1 && (
            <CustomButton
              btnType="button"
              title="Previous"
              styles="bg-gray-500"
              handleClick={handlePreviousStep}
            />
          )}
          {currentStep < 5 ? (
            <CustomButton
              btnType="button"
              title="Next"
              styles="bg-[#ffde59]"
              handleClick={handleNextStep}
            />
          ) : (
            <CustomButton
              btnType="submit"
              title="Submit Campaign"
              styles="bg-[#ffde59]"
            />
          )}
        </div>
      </form>
      {/* Modal: Shows up after successful submission */}
      {showModal && (
        <Modal
          message="Campaign Submitted Successfully. Click OK to confirm the transaction."
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default CreateCampaign;
