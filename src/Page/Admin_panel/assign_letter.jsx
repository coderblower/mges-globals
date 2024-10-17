import { useState, useEffect } from 'react';
import { get, post } from '../../api/axios'; // Make sure `post` is imported
import { useParams, useNavigate } from 'react-router-dom';

const AgentChecklist = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate for redirection

  useEffect(() => {
    // Fetch agents from the API
    const fetchAgents = async () => {
      try {
        const response = await get('api/pre_demand_letter/getAllAgent');
        console.log(response);
        if (response.success) {
          setAgents(response.data);
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  // Handle checkbox change
  const handleCheckboxChange = (agentId) => {
    setSelectedAgents((prevSelected) => {
      if (prevSelected.includes(agentId)) {
        // Remove from selection if already selected
        return prevSelected.filter((id) => id !== agentId);
      } else {
        // Add to selection if not selected
        return [...prevSelected, agentId];
      }
    });
    console.log(selectedAgents);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    console.log('submitted');
    setLoading(true);
    setError(null);

    const payload = {
      selectedAgents,   // List of selected agent IDs
      pre_demand_id: id // Pre-demand letter ID from the route params
    };

    try {
      await post('api/pre_demand_letter/assignAgent', payload);
      alert("Agents assigned successfully!");

      // Redirect to admin/pre_demand_letter after success
      navigate('/admin/pre_demand_letter');
    } catch (error) {
      console.error("Error submitting agents:", error);
      setError("Failed to assign agents. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-around items-center mt-6 mb-10">
          <h2 className="text-lg font-bold mb-4">Select Agents</h2>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading} // Disable button during loading
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        <div className="space-y-2">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#333]">
                <th className="py-4 px-3 font-semibold">Sl. </th>
                <th className="py-4 px-3 font-semibold">Name</th>
                <th className="py-4 px-3 font-semibold">Phone</th>
                <th className="py-4 px-3 font-semibold">Email</th>
                <th className="py-4 px-3 font-semibold text-center">License No</th>
                <th className="py-4 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr
                  key={agent.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"} hover:bg-[#f1f1f1]`}
                >
                  <td className="py-4 px-3">{index + 1}</td>
                  <td className="py-4 px-3">{agent.full_name}</td>
                  <td className="py-4 px-3">{agent.phone}</td>
                  <td className="py-4 px-3">{agent.email}</td>
                  <td className="py-4 px-3">{agent.license_no}</td>
                  <td className="py-4 px-3">
                    <input
                      type="checkbox"
                      id={`agent-${agent.user_id}`}
                      checked={selectedAgents.includes(agent.user_id)}
                      onChange={() => handleCheckboxChange(agent.user_id)}
                      className="mr-2"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};

export default AgentChecklist;
