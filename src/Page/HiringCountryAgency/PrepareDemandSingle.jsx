import { useEffect, useState } from "react";
import { get, post } from "../../api/axios";
import TableLoading from "../../component/TableLoading";
import { useParams, Link } from "react-router-dom";
import Pagination from "../../component/Pagination";
import Modal from "../../component/Modal"; // Import your Modal component
import Demand_Letter_View from "./Demand_Letter_View";

import documentUploadet from "../../../public/images/document.svg";
import documentNotUploadet from "../../../public/images/documentNot.svg";
import edit_icon from "../../assets/update.svg";
import veiw_icon from "../../../public/images/veiw_ison.svg";

const PrepareDemandSingle = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [demandLetters, setDemandLetters] = useState(null); // Start as null
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [send, setSend] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    per_page: "",
    total: "",
  });
  const [buttonStatus, setButtonStatus] = useState({}); // New state to track button status
  const [modals, setModals] = useState(false); // State for modal visibility
  const [selectedPositions, setSelectedPositions] = useState([]); // State to hold positions data

  // Fetch demand letters from the API
  const fetchDemandLetters = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const res = await get(`api/pre_demand_letter/agreed_pdl_to_agency_single/${id}`);
      setDemandLetters(res);
      setUsers(res.users || []);  // Ensure `users` is set to an empty array if it's undefined

      setPagination({
        per_page: res.per_page || 10,  // Use default values if `per_page` is missing
        total: res.total || 0,
      });

    } catch (error) {
      console.error("Error fetching demand letters:", error);
      setError("Failed to fetch demand letters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  const sendItemCheck = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const res = await get(`api/pre_demand_letter/show_demand_letter/${id}`);
      res.forEach(data => {
        setButtonStatus(prevStatus => ({ ...prevStatus, [data.user_id]: true })); 
      });
    } catch (error) {
      console.error("Error fetching demand letters:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use effect to fetch data when the component is mounted
  useEffect(() => {
    fetchDemandLetters();
    sendItemCheck();
  }, [id]);

  // Handle Approve, Reject, Delete actions
  const handleApprove = (userId) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: "Approved" } : user));
  };

  const handleReject = (userId) => {
    setUsers(users.map(user => user.id === userId ? { ...user, status: "Rejected" } : user));
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleCreate = async (id, preId) => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const res = await post(`api/pre_demand_letter/demand_single/${parseInt(id, 10)}/${parseInt(preId, 10)}`);
      setButtonStatus(prevStatus => ({ ...prevStatus, [id]: true }));
      setSend(true);
    } catch (error) {
      console.error("Error fetching demand letters:", error);
      setError("Failed to fetch demand letters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle opening the modal with position data
  const handleViewPositions = (positions) => {
    setSelectedPositions(positions);
    setModals(true);
  };

  return (
    <div className="lg:mt-10 mt-2">
      <div className="flex items-center justify-center mt-[24px]">
        <h2 className="text-[24px] text-[#4D4D4D] text-center mb-5 font-bold">Demand Letter Issuing & Send to Admin for Approval</h2>
      </div>

      <div>
        <h2 className=" text-center text-2xl">Job Description</h2>
      </div>

      {/* Demand Letters Table */}
      <div className="bg-white shadow-lg mt-8 rounded-md lg:px-[46px] px-[10px] py-[27px]">
        <table className="w-full text-left p-4 border-spacing-2 mb-10">
          <thead>
            <tr className="py-5">
              <th className="text-left p-2">Description:</th>
            </tr>
            <tr>
              <td className="p-4"><p className="ml-10">{demandLetters?.description || "No description available"}</p></td>
            </tr>
            <tr>
              <th className="text-left p-4">Positions:</th>
            </tr>
            <tr>
              <td className=" "><p className="ml-10">{JSON.stringify(demandLetters?.positions || "No positions available")}</p></td>
            </tr>
          </thead>
        </table>

        <div className="flex items-center justify-center mt-[24px]">
          <h2 className=" text-center text-2xl font-bold mb-10">Agency List</h2>
        </div>

        {loading && <TableLoading />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && users.length > 0 && (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#333]">
                <th className="py-4 px-3 font-semibold">ID</th>
                <th className="py-4 px-3 font-semibold">Agency Name</th>
                <th className="py-4 px-3 font-semibold">View</th>
                <th className="py-4 px-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                    } hover:bg-[#f1f1f1]`}
                >
                  <td className="py-4 px-3">{index + 1}</td>
                  <td className="py-4 px-3">{user.name || "N/A"}</td>
                  <td className="py-4 px-3">
                    <Link
                      to={`/hiring_country_recruting_agency/demand_letter/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      <img src={documentUploadet} alt="" /> 
                    </Link>
                  </td>
                  <td className="py-4 px-3 text-center">
                     {/* Eye Button to view positions */}
                     <button
                      onClick={() => handleViewPositions(user.positions || [])}
                      className="ml-2 text-blue-500 hover:underline"
                    >
                     <img src={veiw_icon} alt="" />
                    </button>
                    <button
                      onClick={() => handleCreate(user.id, demandLetters.id)}
                      className={`py-3 px-6 ${buttonStatus[user.id] ? "bg-[#ffffff]  text-black" : "bg-[#1E3767] text-white"}   font-bold rounded-md`}
                      disabled={!!buttonStatus[user.id]} // Disable if the button has been clicked
                    >
                      {buttonStatus[user.id] ? "Done" : "Send"} {/* Change button text */}
                    </button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="text-center">No users found.</p>
        )}
      </div>

      {/* Modal to display positions data */}
      <Modal modals={modals} setModals={setModals}>
        <div className=" py-10">
        <h2 className="text-lg font-bold"> Requirement</h2>
        
  <table className="min-w-full border-collapse border border-gray-200 mt-4">
    <thead>
      <tr className="bg-gray-100">
        <th className="border border-gray-300 px-4 py-2">Description</th>
        <th className="border border-gray-300 px-4 py-2">Quantity</th>
        <th className="border border-gray-300 px-4 py-2">Salary</th> {/* New Salary column */}
      </tr>
    </thead>
    <tbody>
      {selectedPositions.map((pos, index) => (
        <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <td className="border border-gray-300 px-4 py-2">{pos.des}</td>
          <td className="border border-gray-300 px-4 py-2">{pos.qty}</td>
          <td className="border border-gray-300 px-4 py-2">{pos.salary}</td> {/* Salary data */}
        </tr>
      ))}
    </tbody>
  </table>
        </div>
      </Modal>

      <div className="flex items-center justify-center mt-[24px]"></div>
    </div>
  );
};

export default PrepareDemandSingle
