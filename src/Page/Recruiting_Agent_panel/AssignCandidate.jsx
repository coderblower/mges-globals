import { useState, useEffect } from 'react';
import { get, post } from '../../api/axios'; // Ensure `post` is imported
import { useParams, useNavigate, Link, NavLink } from 'react-router-dom';

import user_img from "../../../public/images/Avater.png";
import notQR_img from "../../../public/images/notQR.jpeg";
import delete_icon from "../../../public/images/delete_icon.svg";
import edit_icon from "../../assets/update.svg";
import veiw_icon from "../../../public/images/veiw_ison.svg";

import Pagination from "../../component/Pagination";
import SearchInput from "../../component/SearchInput";
import TableLoading from "../../component/TableLoading";
import CSVBtn from "../../component/CSVBtn";
import success_icon from "../../../public/images/success.svg";
import documentUploadet from "../../../public/images/document.svg";
import documentNotUploadet from "../../../public/images/documentNot.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const API_URL = import.meta.env.VITE_BASE_URL;

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
          `/api/candidate_assign/candidate_list_to_assign?page=${currentPage}`,
          {can_id:id}, // empty payload
         
          );
        console.log(res)

        setAgents(res.data); // Assuming agents data is inside `data`
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
      'candidate_list': selectedAgents, // List of selected agent IDs
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
      {
        !loading&& agents.length > 0 && (
          <form onSubmit={handleSubmit}>
        <div className="flex justify-around items-center mt-6 mb-10">
          <h2 className="text-lg font-bold mb-4">Select Candidate</h2>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>

        <div className="overflow-x-auto"> {/* Added this div for horizontal scrolling */}
          <table className="table table-zebra min-w-full"> {/* Set a minimum width for the table */}
            <thead className="border-b-2">
              <tr className="uppercase bg-[#f2f2f2] whitespace-nowrap">
                <th>ID</th>
                <th>Name</th>
                <th>Passport</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Photo</th>
                <th className="text-center">QR</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                agents?.length > 0 &&
                agents?.map((item, i) => {
                  const index = (currentPage - 1) * paginations.per_page + i + 1;
                  return (
                    <tr key={item.id} className="whitespace-nowrap">
                      <th>{index}</th>
                      <th>
                        <div className="flex gap-2 items-center">
                          {item?.candidate?.photo &&
                            item?.candidate?.passport_file &&
                            item?.candidate?.nid_file &&
                            item?.candidate?.training_file && (
                              <img src={success_icon} alt="success" />
                            )}
                          {item?.name}
                        </div>
                      </th>
                      <th>{item?.candidate?.passport || "Null"}</th>
                      <th>{item?.email}</th>
                      <th>{item?.phone}</th>
                      <th>{item?.candidate?.approval_status || "pending"}</th>
                      <th>
                        <img
                          className="h-[48px] w-[48px] rounded-full"
                          src={
                            item?.candidate?.photo
                              ? `${API_URL}/${item?.candidate?.photo}`
                              : user_img
                          }
                          alt=""
                        />
                      </th>
                      <th className="flex justify-center">
                        {item?.candidate?.qr_code &&
                        item?.candidate?.approval_status !== "reject" &&
                        item?.candidate?.approval_status !== "pending" ? (
                          <img
                            className="h-[40px] w-[40px]"
                            src={`${API_URL}/${item?.candidate?.qr_code}`}
                            alt="QR"
                          />
                        ) : (
                          <img className="h-[40px] w-[40px]" src={notQR_img} alt="No QR" />
                        )}
                      </th>
                      <th>
                        <div className="flex gap-4 items-center justify-between">
                          <Link to={`/agent_panel/user_profile/${item.id}`}>
                            <img
                              src={veiw_icon}
                              alt="view"
                              className="max-w-[30px] max-h-[30px]"
                            />
                          </Link>
                          <Link to={`/agent_panel/user_update/${item.id}`}>
                            <img
                              src={edit_icon}
                              alt="edit"
                              className="max-w-[20px] max-h-[20px]"
                            />
                          </Link>
                          <NavLink to={`/agent_panel/document_view/${item.id}`}>
                            <img
                              src={
                                item?.candidate?.approval_status === "reject" ||
                                item?.candidate?.approval_status === "pending"
                                  ? documentNotUploadet
                                  : documentUploadet
                              }
                              alt="file"
                              className="max-w-[20px] max-h-[20px] cursor-pointer"
                            />
                          </NavLink>
                          <input
                        type="checkbox"
                        id={`agent-${item.id}`}
                        checked={selectedAgents.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                        className="mr-2"
                      />
                        </div>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </form>
        )
      }
      
      {!loading && agents.length <= 0 &&(<div>
        
        <Link
                      to={`/agent_panel/demand_letter/`} // Fix extra closing parenthesis
                      className="text-blue-600 hover:underline"
                    >
                      <button className=' text-black text-[29px] flex items-center '>   <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />  </button>
                    </Link>
        <div className=' text-center mt-[100px] font-extrabold'>No Candidate found to Assign</div>

      </div> )}
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
