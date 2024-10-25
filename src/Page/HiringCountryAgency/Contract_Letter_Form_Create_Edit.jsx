import { post, get, put } from '../../api/axios'; // Import the get and put functions
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams, useNavigate } from "react-router-dom";

const Contract_Letter_Form_Create_Edit = () => {
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

  useEffect(() => {
    // Fetch data if contractLetterId exists (for editing)
    const fetchContractLetterForm = async () => {
      if (contractLetterId) {
        try {
          const response = await get(`/api/contract_letter_form/${contractLetterId}`);
          
          setFormData(response); // Assuming response.data contains the form data
        } catch (err) {
          console.error("Error fetching contract letter form data:", err);
          setError("Failed to load contract letter form.");
        }
      }
    };

    fetchContractLetterForm();
  }, [contractLetterId]);

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
    e.preventDefault();
    const payload = {
      ...formData,
      contract_letter_id: contractLetterId, // Ensure this variable holds the correct value
    };

    if (!formData.description) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      let res;
      if (contractLetterId) {
        // Update existing record
        res = await put(`/api/contract_letter_form/${contractLetterId}`, payload);
        console.log(res);
      } else {
        // Create new record
        res = await post("/api/contract_letter_form", payload);
      }

      if (res) {
        setMessage("Contract letter saved successfully!");
        setError("");
        navigate("/hiring_country_recruting_agency/contract_letter/admin_request");
      } else {
        setError("Failed to save Contract letter. Please try again.");
        setMessage("");
      }
    } catch (err) {
      console.error("Error saving contract letter:", err);
      setError("An error occurred while saving the Contract letter.");
      setMessage("");
    }
  };

  return (
    <div className="lg:mt-10 mt-2">
      <div className="flex items-center justify-between mt-8">
        <h2 className="font-bold">{contractLetterId ? 'Edit' : 'Create'} Contract Letter</h2>
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
          {contractLetterId ? 'Update' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Contract_Letter_Form_Create_Edit;
