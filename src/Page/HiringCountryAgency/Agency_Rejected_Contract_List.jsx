import { useEffect, useState } from "react";
import { get, post } from "../../api/axios";
import TableLoading from "../../component/TableLoading";
import { useParams, Link } from "react-router-dom";
import Pagination from "../../component/Pagination";



import eyeButton from "../../../public/images/veiw_ison.svg";
import edit from "../../../public/images/edit_icon.svg";
import documentView from "../../../public/images/document.svg";
import closeButton from "../../../public/images/close_icon.svg";





const Agency_Rejected_Contract_List = () => {
  const userData = window.localStorage.getItem('user');
  const { id, name } = userData ? JSON.parse(userData) : {}; // Add fallback if localStorage is empty

  const [contractLetters, setContractLetters] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    per_page: 10,
    total: 0,
  });
  const [buttonStatus, setButtonStatus] = useState({}); // Track button status

  // Fetch demand letters from the API
  const fetchContractLetters = async () => {
    setLoading(true);
    setError(null); // Reset any previous error

    try {
      
      const res = await get(`api/contract_letter/agency_show_rejected`);

      console.log(res)
       // Fallback to an empty array
       
      setContractLetters(res);

      // Update pagination
      setPagination({
        per_page: res.per_page || 10, // Use default values if `per_page` is missing
        total: res.total || 0,
      });

    } catch (error) {
      console.error("Error fetching demand letters:", error);
      setError("Failed to fetch demand letters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch sent item checks
  const sendItemCheck = async () => {
    try {
      const res = await post(`api/pre_demand_letter/already`);

      // Update button statuses
      res.forEach(data => {
        setButtonStatus(prevStatus => ({ ...prevStatus, [data.user_id]: true }));
      });

    } catch (error) {
      console.error("Error checking sent items:", error);
    }
  };

  const handletikButton = async (id) => {
    try {

      const res = await post(`api/contract_letter/admin_approve/${id}`);
      console.log('success');
      // Update button statuses
      fetchContractLetters(); 

    } catch (error) {
      console.error("Error checking sent items:", error);
    }
  };

  const handleCloseButton = async () => {
    try {

      console.log('button clicked ')
      const res = await post(`api/pre_demand_letter/alreadysdfs`);

      // Update button statuses
      res.forEach(data => {
        setButtonStatus(prevStatus => ({ ...prevStatus, [data.user_id]: true }));
      });

    } catch (error) {
      console.error("Error checking sent items:", error);
    }
  };

  // Use effect to fetch data when the component is mounted
  useEffect(() => {
    if (id) {
      fetchContractLetters();
      sendItemCheck();
    }
  }, [id]);

  // Handle create action
  const handleCreate = async (demandLetterId) => {
    setLoading(true);
    setError(null);

    try {
      const res = await post(`api/pre_demand_letter/approve_demand_letter/${demandLetterId}`);

      // Mark this demand letter as "sent" in button status
      setButtonStatus(prevStatus => ({ ...prevStatus, [demandLetterId]: true }));

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
        <h2 className="text-[24px] text-[#4D4D4D] text-center mb-5 font-bold"> Checking Agent Contract Letters </h2>
      </div>

      <div className="bg-white shadow-lg mt-8 rounded-md lg:px-[46px] px-[10px] py-[27px]">
        {loading && <TableLoading />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && contractLetters.length > 0 && (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#333]">
                <th className="py-4 px-3 font-semibold">SL.</th>
                <th className="py-4 px-3 font-semibold">Title</th>
                <th className="py-4 px-3 font-semibold">Agency Name </th>
                <th className="py-4 px-3 font-semibold">License No.  </th>
              </tr>
            </thead>
            <tbody>
              {contractLetters.map((data, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                    } hover:bg-[#f1f1f1]`}
                >
                  <td className="py-4 px-3">{index + 1}</td>
                  
                  <td className="py-4 px-3">{data?.demand_letter_issue.pre_demand_letter.description }</td>
                  <td className="py-4 px-3">{ data.agent.name }</td>
                  
                  <td className="py-4 px-3">
                    {data.agent.partner.license_no}
                  </td>
                
                 
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && contractLetters.length === 0 && (
          <p className="text-center">No demand letters found.</p>
        )}
      </div>

      {/* Add Pagination if needed */}
      <div className="flex items-center justify-center mt-[24px]">
        {/* Pagination component if needed */}
        {/* <Pagination total={pagination.total} perPage={pagination.per_page} /> */}
      </div>
    </div>
  );
};

export default Agency_Rejected_Contract_List;
