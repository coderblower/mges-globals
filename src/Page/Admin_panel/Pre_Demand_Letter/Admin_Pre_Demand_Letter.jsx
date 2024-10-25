import { useEffect, useState } from "react";
import { post, get } from "../../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import TableLoading from "../../../component/TableLoading";
import veiw_icon from "../../../../public/images/veiw_ison.svg";
import SearchInput from "../../../component/SearchInput";
import Pagination from "../../../component/Pagination";
import CSVBtn from "../../../component/CSVBtn";

const Admin_Pre_Demand_Letter = () => {
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const [allLetters, setAllLetters] = useState([]);
  const [pagination, setPagination] = useState({
    per_page: "",
    total: "",
  });

  useEffect(() => {
    fetchPreDemandLetters();
    handleCSVData();
  }, [currentPage]);

  useEffect(() => {
    if (allLetters) {
      const transformedData = allLetters?.map((letter) => ({
        id: letter.id,
        "Company Name": letter.company_name,
        "License No": letter.license_no,
        "Submission Date": letter.updated_at.slice(0, 10),
        Status: letter.status || "Pending",
      }));
      setCsvData(transformedData);
    }
  }, [letters]);

  const fetchPreDemandLetters = async () => {
    setLoading(true);
    try {
      const res = await get(`/api/pre_demand_letter/index?page=${currentPage}`);
      if (res) {
        setLetters(res.data);
        
        setPagination({
          per_page: res.per_page,
          total: res.total,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching pre-demand letters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCSVData = async () => {
    setLoading(true);
    try {
      const res = await get(`/api/pre_demand_letter/index?page=${currentPage}`);
      if (res) {
      setAllLetters(res?.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching CSV data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveStatus = async (id) => {
    setLoading(true);
    try {
      const res = await post(`/api/pre_demand_letter/status_approve/${id}`);
      if (res) {
       
        fetchPreDemandLetters();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching CSV data:", error);
    } finally {
      
      setLoading(false);
    }
  };


  return (
    <div className="lg:mt-10 mt-2">
      {/* Header */}
      <div className="lg:flex justify-between items-center">
        <div>
          <h2 className="font-bold text-[24px]">
            Pre-Demand Letter List ({letters?.length})
          </h2>
        </div>
        <div className="flex gap-4 mt-6 lg:mt-0">
          <SearchInput placeholder="Search Pre-Demand Letter" />
          {csvData?.length > 0 && (
            <div className="mt-2">
              <CSVBtn data={csvData} filename={"Pre-Demand Letters List"} />
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto mt-6">
        <table className="table table-zebra overflow-x-auto w-full">
          <thead className="border-b-2">
            <tr className="uppercase bg-[#f2f2f2]">
              <th>ID</th>
              <th>Description</th>
              <th>Position</th>
              <th>Terms & Conditions</th>
              <th>Submission Date</th>
              <th>view</th>
              <th className="text-center py-4 w-[20%]">Action</th>
            </tr>
          </thead>

          <tbody>
            {!loading && letters?.length > 0 &&
              letters.map((letter, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <td>{letter.description}</td>
                  <td className="py-4 px-3">
                    {letter.positions?.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {letter.positions.map((position, i) => (
                          <li key={i} className="mb-2">
                            <strong>Category:</strong> {position.category},{" "}
                            <strong>Qty:</strong> {position.qty},{" "}
                            <strong>Salary:</strong> ${position.salary}
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
                      __html: letter.terms_conditions || "No Terms",
                    }}
                  />
                  <td>{letter.updated_at.slice(0, 10)}</td>
                  <td className={letter.status === "approved" ? "text-green-600" : "text-yellow-600"}>
                  <Link
                      to={`/admin/demand_letter/${letter.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                  <td className="text-center ">
                    <div className="flex justify-center">
                                          
                    { letter.status !== "approved" ? ( <Link
                      to={`/admin/pre_demand_letter/assign/${letter.id}`}
                      className="text-blue-600 hover:underline"
                    >
                     <button
                      
                        className="px-[10px] py-[10px] bg-[#1E3767] text-white rounded-[8px]"
                      >
                        assign Agent
                      </button> 
                    </Link> ): (<div className=" text-green-600 "> {letter.status} </div>)}
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {loading && (
          <div className="flex justify-center min-w-full mt-20">
            <TableLoading />
          </div>
        )}
        {!loading && letters?.length === 0 && (
          <div className="flex justify-center min-w-full mt-20">
            <h4 className="text-black font-bold text-xl">No Data found!</h4>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && letters?.length > 0 && pagination?.total > pagination?.per_page && (
        <Pagination
          paginations={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Admin_Pre_Demand_Letter;
