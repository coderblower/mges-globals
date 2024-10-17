import { post } from '../../api/axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useNavigate } from 'react-router-dom';

const Create_Demand_Letter = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    license_no: '',
    visa_number: '',
    visa_date: '',
    positions: [{ category: '', qty: '', salary: '' }],
    terms_conditions: '',
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });


  };

  const handlePositionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPositions = [...formData.positions];
    updatedPositions[index][name] = value;
    setFormData({ ...formData, positions: updatedPositions });
  };

  const addPosition = () => {
    setFormData({
      ...formData,
      positions: [...formData.positions, { category: '', qty: '', salary: '' }],
    });
  };

  const removePosition = (index) => {
    const updatedPositions = formData.positions.filter((_, i) => i !== index);
    setFormData({ ...formData, positions: updatedPositions });
  };

  const handleEditorChange = (value) => {
    setFormData({ ...formData, terms_conditions: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.company_name || !formData.license_no || !formData.visa_number || !formData.visa_date || !formData.terms_conditions) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const res = await post("/api/demand_letter/store", formData);

      if (res) {

        setMessage("Demand letter created successfully!");
        setError(""); // Clear any previous error message
        navigate("/hiring_country_recruting_agency/demand_letter");
      } else {
        setError("Failed to create demand letter. Please try again.");
        setMessage(""); // Clear any previous success message
      }
    } catch (err) {
      console.error("Error creating demand letter:", err);
      setError("An error occurred while creating the demand letter.");
      setMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex items-center justify-between mt-8">
        <h2 className="font-bold">Create Demand Letter</h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Company Name</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">License No</label>
          <input
            type="text"
            name="license_no"
            value={formData.license_no}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Visa Number</label>
          <input
            type="text"
            name="visa_number"
            value={formData.visa_number}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Visa Date</label>
          <input
            type="date"
            name="visa_date"
            value={formData.visa_date}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium">Positions</h3>
          {formData.positions.map((position, index) => (
            <div key={index} className="border p-4 mb-4 rounded-md">
              <div className="mb-2">
                <label className="block text-sm font-medium">Category</label>
                <input
                  type="text"
                  name="category"
                  value={position.category}
                  onChange={(e) => handlePositionChange(index, e)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Qty</label>
                <input
                  type="number"
                  name="qty"
                  value={position.qty}
                  onChange={(e) => handlePositionChange(index, e)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={position.salary}
                  onChange={(e) => handlePositionChange(index, e)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <button
                type="button"
                onClick={() => removePosition(index)}
                className="text-red-600 mt-2"
              >
                Remove Position
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addPosition}
            className="bg-green-500 text-white rounded-md px-4 py-2 mt-2"
          >
            Add Position
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Terms and Conditions</label>
          <ReactQuill
            value={formData.terms_conditions}
            onChange={handleEditorChange}
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

export default Create_Demand_Letter;
