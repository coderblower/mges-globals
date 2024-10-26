import { useEffect, useState } from "react";
import { get, post } from "../../../api/axios";
import TableLoading from "../../../component/TableLoading";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../../component/Pagination";

import eyeButton from "../../../../public/images/veiw_ison.svg";
import edit from "../../../../public/images/edit_icon.svg";
import documentView from "../../../../public/images/document.svg";
import closeButton from "../../../../public/images/close_icon.svg";
import tik from "../../../../public/images/success_2.svg";

const Contract_Letter_Varified = () => {
  const userData = window.localStorage.getItem('user');
  const { id, name } = userData ? JSON.parse(userData) : {};
  const location = useLocation();
  const [contractLetters, setContractLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    per_page: 10,
    total: 0,
  });
  const [buttonStatus, setButtonStatus] = useState({});

  const fetchContractLetters = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await get(`api/contract_letter/admin_show_agency_approved_contract_letter_varified`);
      setContractLetters(res);
      setPagination({
        per_page: res.per_page || 10,
        total: res.total || 0,
      });
    } catch (error) {
      console.error("Error fetching demand letters:", error);
      setError("Failed to fetch demand letters. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const tikHandler = async (id) => {
    try {
      await post(`api/contract_letter/admin_approve_for_agent/${id}`);
      console.log("Contract approved for agent");
      fetchContractLetters();
    } catch (error) {
      console.error("Error approving contract letter:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchContractLetters();
    }
  }, [id]);

  return (
    <div className="lg:mt-10 mt-2 relative"> {/* Added relative positioning */}
      
      {/* Top-left corner buttons */}
      <div className="absolute top-4 left-4 flex">
  <Link
    to="/admin/contract_letter/Agency_request"
    className={`px-4 py-2 font-semibold rounded-l-md transform ${
      location.pathname === '/admin/contract_letter/Agency_request_varified' 
        ? 'bg-[rgb(30,55,103)]  text-white  cursor-pointer'
        : 'bg-gray-300 text-gray-700 cursor-default'
    }`}
    
  >
    Verifying
  </Link>
  <Link
    to="/admin/contract_letter/Agency_request_varified"
    className={`px-4 py-2 font-semibold rounded-r-md transform ${
      location.pathname === '/admin/contract_letter/Agency_request'

        ? 'bg-[rgb(30,55,103)] text-white  cursor-pointer'
        : 'bg-gray-300 text-gray-700 cursor-default'
    }`}
    style={{
      
      
    }}
  >
    <span className="absolute -left-0.5 top-0 h-full w-1 transform bg-white"></span>
    Verified
  </Link>
</div>


      <div className="flex items-center justify-center mt-[24px]">
        <h2 className="text-[24px] text-[#4D4D4D] text-center mb-5 font-bold">
          Checking Agent Contract Letters
        </h2>
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
                <th className="py-4 px-3 font-semibold">Agency Name</th>
                <th className="py-4 px-3 font-semibold">License No.</th>
                <th className="py-4 px-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contractLetters.map((data, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                  } hover:bg-[#f1f1f1]`}
                >
                  <td className="py-4 px-3">{index + 1}</td>
                  <td className="py-4 px-3">
                    {data?.demand_letter_issue?.pre_demand_letter?.description}
                  </td>
                  <td className="py-4 px-3">{data?.agent?.name}</td>
                  <td className="py-4 px-3">{data?.agent?.partner?.license_no}</td>
                  <td className="py-4 px-1 text-center w-[30%]">
                    <span className="flex justify-center space-x-3">
                      <Link
                        to={`/admin/contract_letter/single_contract_view_with_forms/${data.demand_letter_id}`}
                      >
                        <img src={documentView} alt="View Contract Letter" />
                      </Link>
                    
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !error && contractLetters.length === 0 && (
          <p className="text-center">No Contract letters found.</p>
        )}
      </div>

      {/* Pagination if needed */}
      <div className="flex items-center justify-center mt-[24px]">
        {/* Uncomment below if you want to add Pagination */}
        {/* <Pagination total={pagination.total} perPage={pagination.per_page} /> */}
      </div>
    </div>
  );
};

export default Contract_Letter_Varified;
