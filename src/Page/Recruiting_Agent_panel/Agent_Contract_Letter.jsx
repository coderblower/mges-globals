import { useEffect, useState } from "react";
import { get, post } from "../../api/axios";
import TableLoading from "../../component/TableLoading";
import { useParams, Link } from "react-router-dom";
import Pagination from "../../component/Pagination";

const Agent_Contract_Letter = () => {
  const userData = window.localStorage.getItem('user');
  const { id, name } = userData ? JSON.parse(userData) : {}; // Add fallback if localStorage is empty

  const [demandLetters, setDemandLetters] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
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
      
      const res = await get(`api/agent/get_demand_letters/${id}`);

      console.log(res)
       // Fallback to an empty array
       
      setDemandLetters(res);

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

  // Use effect to fetch data when the component is mounted
  useEffect(() => {
    if (id) {
      fetchDemandLetters();
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
        <h2 className="text-[24px] text-[#4D4D4D] text-center mb-5 font-bold">Demand Letters</h2>
      </div>

      <div className="bg-white shadow-lg mt-8 rounded-md lg:px-[46px] px-[10px] py-[27px]">
        {loading && <TableLoading />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && demandLetters.length > 0 && (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#333]">
                <th className="py-4 px-3 font-semibold">SL.</th>
                <th className="py-4 px-3 font-semibold">Description</th>
                <th className="py-4 px-3 font-semibold">Postions </th>
                <th className="py-4 px-3 font-semibold">View </th>
                <th className="py-4 px-3 font-semibold">Candidates </th> 

                <th className="py-4 px-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandLetters.map((data, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                    } hover:bg-[#f1f1f1]`}
                >
                  <td className="py-4 px-3">{index + 1}</td>
                  
                  <td className="py-4 px-3">{data?.pre_demand_letter?.description || "N/A"}</td>
                  <td className="py-4 px-3">{ JSON.stringify(data?.pre_demand_letter?.positions)}</td>
                  
                  <td className="py-4 px-3">
                    <Link
                      to={`/agent_panel/demand_letter/${data.id}`} // Fix extra closing parenthesis
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                  <td className="py-4 px-3"> <Link
                      to={`/agent_panel/demand_letter/selected_candidate/${data.id}`} // Fix extra closing parenthesis
                      className=" hover:underline"
                    > selected Candidate </Link></td> 
                  <td className="py-4 px-1 text-center w-[30%]">
                  <Link
                      to={`/agent_panel/demand_letter/assign_candidate/${data.id}`} // Fix extra closing parenthesis
                      className="bg-[#1F2937] hover:underline"
                    >
                        <button
                        
                        className="py-2 px-4 bg-[#1F2937] text-white rounded-md" >
                         Assign Candidate 
                      </button>
                    </Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && demandLetters.length === 0 && (
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

export default Agent_Contract_Letter;
