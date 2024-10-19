import { useState, useEffect } from 'react';
import { get, post } from '../../api/axios'; // Make sure `post` is imported
import { useParams, useNavigate } from 'react-router-dom';

const AssignCandidate = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate for redirection
  const [paginations, setPaginations] = useState({
    per_page: 10, // default per page
    total: 0,     // total records
  });
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('user_token'); // Assuming you store token in local storage
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    // Fetch agents from the API
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const res = await post(
          `/api/candidate/candidate_by_creator?page=${currentPage}`,
          {}, // empty payload
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );

        setAgents(res.data.data); // Assuming agents data is inside `data`
        setPaginations({
          per_page: res.data.per_page,
          total: res.data.total,
        });
      } catch (error) {
        console.error('Error fetching agents:', error);
        setError("Failed to fetch agents.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, [currentPage, token]); // Add token and currentPage as dependencies

  // Handle checkbox change
  const handleCheckboxChange = (agentId) => {
    console.log(selectedAgents)
    setSelectedAgents((prevSelected) =>
      prevSelected.includes(agentId)
        ? prevSelected.filter((id) => id !== agentId) // Deselect if already selected
        : [...prevSelected, agentId] // Add if not selected
    );
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      'user_id': user.id,
      'demand_letter_issue_id': id,
      'candidate_list': selectedAgents , // List of selected agent IDs
       // Pre-demand letter ID from the route params
    };

    try {
      await post(
        'api/candidate_assign/store',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      alert('Agents assigned successfully!');
      navigate('/agent_panel/demand_letter');
    } catch (error) {
      console.error('Error submitting agents:', error);
      setError('Failed to assign agents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="flex justify-around items-center mt-6 mb-10">
          <h2 className="text-lg font-bold mb-4">Select Cancidate </h2>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        <div className="space-y-2">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#333]">
                <th className="py-4 px-3 font-semibold">Sl.</th>
                <th className="py-4 px-3 font-semibold">Name</th>
                <th className="py-4 px-3 font-semibold">Phone</th>
                <th className="py-4 px-3 font-semibold">Email</th>
                <th className="py-4 px-3 font-semibold text-center">License No</th>
                <th className="py-4 px-3 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, i) => {
                const index = (currentPage - 1) * paginations.per_page + i + 1;
                return (
                  <tr
                    key={agent.id}
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#f9f9f9]'} hover:bg-[#f1f1f1]`}
                  >
                    <td className="py-4 px-3">{index}</td>
                    <td className="py-4 px-3">{agent.full_name}</td>
                    <td className="py-4 px-3">{agent.phone}</td>
                    <td className="py-4 px-3">{agent.email}</td>
                    <td className="py-4 px-3">{agent.license_no}</td>
                    <td className="py-4 px-3">
                      <input
                        type="checkbox"
                        id={`agent-${agent.id}`}
                        checked={selectedAgents.includes(agent.id)}
                        onChange={() => handleCheckboxChange(agent.id)}
                        className="mr-2"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
      {!loading && agents.length > 0 && paginations.total > paginations.per_page && (
        <Pagination
          paginations={paginations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AssignCandidate;
