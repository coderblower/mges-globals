import { useState } from "react";
import { post } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Register_Agency = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    license_no: "",
    phone: "",
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await post("/api/partner/register", formData);
      if (response?.data?.success) {
        // Navigate to a success or confirmation page if needed
        navigate("/admin/agency-list");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred during registration.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:mt-10 mt-2">
      <h2 className="font-bold text-[24px] mb-4">Register Hiring Agency</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="font-bold mb-1">
            Agency Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="license_no" className="font-bold mb-1">
            License Number
          </label>
          <input
            type="text"
            id="license_no"
            name="license_no"
            value={formData.license_no}
            onChange={handleChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="font-bold mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="font-bold mb-1">
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirm_password" className="font-bold mb-1">
            Confirm Password
          </label>
          <input
            type="text"
            id="confirm_password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="border rounded-lg p-2"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register Agency"}
        </button>
      </form>
    </div>
  );
};

export default Register_Agency;
