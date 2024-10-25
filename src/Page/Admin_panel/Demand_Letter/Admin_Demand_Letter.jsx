import { useEffect, useState } from "react";
import { get, post } from "../../../api/axios";
import TableLoading from "../../../component/TableLoading";
import { useParams, Link } from "react-router-dom";
import Pagination from "../../../component/Pagination";

const Admin_Demand_Letter = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [demandLetters, setDemandLetters] = useState([]); // Start as an empty array
  const [loading, setLoading] = useState(true);
  const [send, setSend] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    per_page: 10,
    total: 0,
  });
  const [buttonStatus, setButtonStatus] = useState({}); // Track button status

  // Fetch demand letters from the API
  const fetchDemandLetters = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const res = await get(`api/pre_demand_letter/get_demand_list_by_admin`);


      // Set demand letters and update pagination
      setDemandLetters(res.data || []);
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

  // Check and mark sent items
  const sendItemCheck = async () => {
    try {
      const res = await post(`api/pre_demand_letter/already`);

      // Mark sent items
      const updatedStatus = res.reduce((acc, data) => {
        acc[data.id] = true;
        return acc;
      }, {});
      
      setButtonStatus(updatedStatus);

       console.log(res, updatedStatus)

    } catch (error) {
      console.error("Error fetching sent status:", error);
    }
  };

  // Fetch data when the component is mounted
  useEffect(() => {
    fetchDemandLetters();
    sendItemCheck();
  }, []); // Removed `id` dependency since it's static

  // Handle Approve action
  const handleCreate = async (id) => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      await post(`api/pre_demand_letter/approve_demand_letter/${id}`);

      // Mark this user as "sent" in button status
      setButtonStatus((prevStatus) => ({ ...prevStatus, [id]: true }));
      setSend(true);
    } catch (error) {
      console.error("Error approving demand letter:", error);
      setError("Failed to approve demand letter. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:mt-10 mt-2">
      <div className="flex items-center justify-center mt-[24px]">
        <h2 className="text-[24px] text-[#4D4D4D] text-center mb-5 font-bold">Demand Letter for Admin Approval</h2>
      </div>

      {/* Demand Letters Table */}
      <div className="bg-white shadow-lg mt-8 rounded-md lg:px-[46px] px-[10px] py-[27px]">
        {loading && <TableLoading />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && demandLetters.length > 0 && (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#333]">
                <th className="py-4 px-3 font-semibold">ID</th>
                <th className="py-4 px-3 font-semibold">Agency Name</th>
                <th className="py-4 px-3 font-semibold">Licence NO. </th>
                <th className="py-4 px-3 font-semibold">View</th>
                <th className="py-4 px-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandLetters.map((data, index) =>{
                const {partner, user, pre_demand_letter} = data;
                
                return  (
                  <tr
                    key={data.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"} hover:bg-[#f1f1f1]`}
                  >
                    <td className="py-4 px-3">{index + 1}</td>
                    <td className="py-4 px-3">{user.name || "N/A"}</td>
                    <td className="py-4 px-3">{partner?.license_no || "N/A"}</td>
                    <td className="py-4 px-3">
                      <Link
                        to={`/admin/demand_letter/${data.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                    <td className="py-4 px-3 text-center">
                      <button
                        onClick={() => handleCreate(data.id)}
                        className={`py-3 px-6 ${buttonStatus[data.id] ? "bg-[#ffffff] text-black" : "bg-[#1E3767] text-white"} font-bold rounded-md`}
                        disabled={!!buttonStatus[data.id]} // Disable if the button has been clicked
                      >
                        {buttonStatus[data.id] ? "Done" : "Approve"} {/* Change button text */}
                      </button>
                    </td>
                  </tr>
                )

              }
              
             )}
            </tbody>
          </table>
        )}

        {!loading && !error && demandLetters.length === 0 && (
          <p className="text-center">No demand letters found.</p>
        )}
      </div>

      {/* Pagination component (if needed) */}
      <div className="flex items-center justify-center mt-[24px]">
        {/* Add Pagination logic here if necessary */}
      </div>
    </div>
  );
};

export default Admin_Demand_Letter;
