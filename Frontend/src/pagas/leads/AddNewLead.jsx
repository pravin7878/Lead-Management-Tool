import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLead } from "../../../store/actions/lead";
import { Link } from "react-router-dom";

const AddLeadForm = () => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    leadName: "",
    contactNumber: "",
    email: "",
    address: "",
    status: "new",
    nextFollowUpDate: "",
    nextFollowUpTime: "",
    leadSource: "",
    conversionDate: "",
    leadNotes: "",
    customerType: "retail",
    medicalNeeds: "",
    purchaseHistory: {
      productName: "",
      purchaseDate: "",
      amount: "",
    },
  });
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth);
  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle nested purchaseHistory fields separately
    if (name.startsWith("purchaseHistory.")) {
      const field = name.split(".")[1];
      setFormData((prevState) => ({
        ...prevState,
        purchaseHistory: {
          ...prevState.purchaseHistory,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    dispatch(createLead({
      url: `${import.meta.env.VITE_APP_BACKEND_URL}/leads`,
      token: user?.user?.token,
      data: formData
    }))
  };

  return (<>
    <div className="w-[70%] m-auto mt-2">
      <Link className="bg-red-500 text-white font-bold px-2 py-1 rounded-md hover:bg-red-400" to={"/dashboard"}>Go Back</Link>
    </div>
    <div className="w-[70%] mx-auto p-3 m-3 bg-gray-300 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add New Lead</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Lead Name */}
        <div>
          <label htmlFor="leadName" className="block text-gray-600 font-medium">
            Lead Name
          </label>
          <input
            type="text"
            id="leadName"
            name="leadName"
            value={formData.leadName}
            onChange={handleInputChange}
            placeholder="Enter lead name"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Contact Number */}
        <div>
          <label
            htmlFor="contactNumber"
            className="block text-gray-600 font-medium"
          >
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter contact number"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-gray-600 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label htmlFor="address" className="block text-gray-600 font-medium">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter address"
            rows="3"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-gray-600 font-medium">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Next Follow-Up Date */}
        <div>
          <label
            htmlFor="nextFollowUpDate"
            className="block text-gray-600 font-medium"
          >
            Next Follow-Up Date
          </label>
          <input
            type="date"
            id="nextFollowUpDate"
            name="nextFollowUpDate"
            value={formData.nextFollowUpDate}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Next Follow-Up Time */}
        <div>
          <label
            htmlFor="nextFollowUpTime"
            className="block text-gray-600 font-medium"
          >
            Next Follow-Up Time
          </label>
          <input
            type="time"
            id="nextFollowUpTime"
            name="nextFollowUpTime"
            value={formData.nextFollowUpTime}
            onChange={handleInputChange}
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Lead Source */}
        <div>
          <label
            htmlFor="leadSource"
            className="block text-gray-600 font-medium"
          >
            Lead Source
          </label>
          <select value={formData.leadSource}
            id="leadSource"
            name="leadSource"
            onChange={handleInputChange}
            placeholder="Enter lead source"
            className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="">select source</option>
            <option value="online">online</option>
            <option value="referral">referral</option>
            <option value="walk-in">walk-in</option>
            <option value="other">other</option>
          </select>

        </div>

        {/* Purchase History */}
        <fieldset className="space-y-4">
          <legend className="text-gray-600 font-medium">Purchase History</legend>
          <div>
            <label
              htmlFor="purchaseHistory.productName"
              className="block text-gray-600 font-medium"
            >
              Product Name
            </label>
            <input
              type="text"
              id="purchaseHistory.productName"
              name="purchaseHistory.productName"
              value={formData.purchaseHistory.productName}
              onChange={handleInputChange}
              placeholder="Enter product name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </fieldset>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Lead
          </button>
        </div>
      </form>
    </div>
  </>);
};

export default AddLeadForm;
