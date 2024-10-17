import { useEffect, useState } from "react";
import { get, post } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import Pagination from "../../component/Pagination";
import TableLoading from "../../component/TableLoading";
import InputField from "../../component/InputField";
const API_URL = import.meta.env.VITE_BASE_URL;

const Agent_Pre_Demand_Letter = () => {
  const [preDemandLetters, setPreDemandLetters] = useState([]);
  const [pagination, setPagination] = useState({
    per_page: 10,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ userId , setUserId] = useState(JSON.parse(window.localStorage.getItem("user")).id);

  // Fetch pre-demand letters when component mounts or when page changes
  useEffect(() => {
    
    fetchPreDemandLetters();
  }, [currentPage]);

  const fetchPreDemandLetters = async () => {
    setLoading(true);
    
    try {
      const res = await post(`/api/pre_demand_letter/list?page=${currentPage}`, {userId});
      
      setPreDemandLetters(res?.data);
      setPagination({
        per_page: res.data.per_page,
        total: res.data.total,
      });
    } catch (error) {
      console.error("Error fetching pre-demand letters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlebdAgencyAgree = async(id) =>{
    setLoading(true)
    
    try {
      
      
      const res = await post(`api/pre_demand_letter/agency_agreement_status_change/${id}/${userId}`)
      
      fetchPreDemandLetters();
    } catch(error){
      console.error('Please try again... ')
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="lg:mt-10 mt-2">
      {/* Header Section */}
      <div className="lg:flex justify-between items-center ">
        <div>
          <h2 className="font-bold text-[24px] ">
            Pre-Demand Letters ({preDemandLetters.length})
          </h2>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-auto mt-6">
        <table className="table table-zebra overflow-x-auto">
          {/* Table Head */}
          <thead className="border-b-2">
            <tr className="uppercase bg-[#f2f2f2] whitespace-nowrap">
              <th>ID</th>
              <th>Description</th>
              <th>Positions</th>
              <th>Terms & Conditions</th>
              <th>Status</th>
              <th>Agency Agreement</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {!loading &&
              preDemandLetters?.length > 0 &&
              preDemandLetters?.map((item, i) => {
                const index = (currentPage - 1) * pagination.per_page + i + 1;
                return (
                  <tr key={item.id} className="whitespace-nowrap">
                    <th>{item.id}</th>
                    <td>{item.description}</td>
                    <td className="py-4 px-3">
                    {item?.positions?.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {item.positions.map((position, index) => (
                          <li key={index} className="mb-2">
                            <strong>Category:</strong> {position.category || "N/A"},{" "}
                            <strong>Qty:</strong> {position.qty || "N/A"},{" "}
                            <strong>Salary:</strong> ${position.salary || "N/A"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "No Positions"
                    )}
                    </td>
                    <td
                    className="py-4 px-3"
                    dangerouslySetInnerHTML={{
                      __html: item.terms_conditions || "No Terms",
                    }}
                  />
                    <td>{item.status}</td>
                    <td>
                    
                    <div className=" flex gap-4">
                      <div className=" w-[30px] flex items-center">
                        <Link to={`/agent_panel/document_view/${item.id}`}>
                            <img src={veiw_icon} alt="view" className="w-5" />
                          </Link>
                      </div>
                      <button
                        onClick={(e) => handlebdAgencyAgree(item.id)}
                        className="px-6 py-[13px] border-2 border-[#C5BFBF] text-gray-700 font-[500] w-full rounded-md outline-none 
                        transition-all duration-300 ease-in-out transform hover:border-[#1E3767] hover:scale-105   active:scale-95 relative overflow-hidden cursor-pointer "
                      >
                      {item.bd_agency_agree.some(x=> x==userId) ? "Agreed": "Not Agreed"}
                      </button>
                    </div>
              
                      </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center min-w-full mt-20">
            <TableLoading />
          </div>
        )}

        {/* No Data Found */}
        {!loading && preDemandLetters?.length === 0 && (
          <div className="flex justify-center min-w-full mt-20">
            <h4 className="text-black font-bold text-xl">No Data found!</h4>
          </div>
        )}

        {/* Pagination */}
        {!loading &&
          preDemandLetters?.length > 0 &&
          pagination?.total > pagination?.per_page && (
            <Pagination
              paginations={pagination}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
      </div>
    </div>
  );
};

export default Agent_Pre_Demand_Letter;