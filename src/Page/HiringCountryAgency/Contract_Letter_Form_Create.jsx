import { post } from '../../api/axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, Link, useNavigate } from "react-router-dom";


const Contract_Letter_Form_Create = () => {
  const { id: contractLetterId } = useParams();
  const [formData, setFormData] = useState({
    contract_title: '',
    employers_title: '',
    work_address: '',
    employer_phone: '',
    email: '',
    description: '',
    issued_date: '',
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDescriptionChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
  };

  const handleSubmit = async (e) => {
    const payload = {
      ...formData,
      contract_letter_id: contractLetterId, // Make sure this variable is defined and holds the correct value
    };
    e.preventDefault();
  
    if (!formData.description) {
      setError("Please fill in all required fields.");
      return;
    }
  
    try {
      // Update the endpoint to use the create route for ContractLetter
      const res = await post("/api/contract_letter_form", payload);
      
      if (res) {
        setMessage("Contract letter created successfully!");
        setError("");
        // Navigate to the desired path after successful creation
        navigate("/hiring_country_recruting_agency/contract_letter/admin_request");
      } else {
        setError("Failed to create Contract letter. Please try again.");
        setMessage("");
      }
    } catch (err) {
      console.error("Error creating contract letter:", err);
      setError("An error occurred while creating the Contract letter.");
      setMessage("");
    }
  };
  

  return (
    <div className="lg:mt-10 mt-2">
      <div className="flex items-center justify-between mt-8">
        <h2 className="font-bold">Create Pre Demand Letter</h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Contract Title</label>
          <input
            type="text"
            name="contract_title"
            value={formData.contract_title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Employers Title</label>
          <input
            type="text"
            name="employers_title"
            value={formData.employers_title}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Work Address</label>
          <input
            type="text"
            name="work_address"
            value={formData.work_address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Employer Phone</label>
          <input
            type="tel"
            name="employer_phone"
            value={formData.employer_phone}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* New Issued Date Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Issued Date</label>
          <input
            type="date"
            name="issued_date"
            value={formData.issued_date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Rich Text Editor for Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            className="mt-1 border border-gray-300 rounded-md"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['link', 'image'],
                ['clean'],
              ],
            }}
            formats={[
              'header',
              'bold',
              'italic',
              'underline',
              'link',
              'image',
            ]}
          />
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white rounded-md px-4 py-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contract_Letter_Form_Create;
