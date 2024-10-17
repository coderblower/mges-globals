import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import TableLoading from "../../component/TableLoading";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import SearchInput from "../../component/SearchInput";
import Pagination from "../../component/Pagination";
import CSVBtn from "../../component/CSVBtn";

const Hiring_Agency = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [csv_data, setCsv_data] = useState([]);
  const [allAgents, setsetAllAgents] = useState([]);
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });

  useEffect(() => {
    fetchAgent();
    handleCSVData();
  }, [currentPage]);

  useEffect(() => {
    if (allAgents) {
      const transformedData = allAgents?.map((item, i) => {
        return {
          id: item.id,
          Name: item?.name,
          Phone: item?.phone,
          Created_By: item?.created_by?.name,
          Submission_Date: item?.updated_at.slice(0, 10),
          Status: item?.result == null ? "pending" : item?.result,
        };
      });
      setCsv_data(transformedData);
    }
  }, [agents]);

  const fetchAgent = async () => {
    setLoading(true);
    try {
      const res = await post(`/api/partner/get_partners?page=${currentPage}`, {
        role_id: 4,
        pg: "a",
      });
      if (res) {
        setAgents(res?.data?.data);
        setPaginations({
          per_page: res.data_p.per_page,
          total: res.data_p.total,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCSVData = async () => {
    setLoading(true);
    try {
      const res = await post(`/api/partner/get_partners?page=${currentPage}`, {
        role_id: 4,
        pg: "",
      });
      if (res) {
        setsetAllAgents(res?.data);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="lg:flex justify-between items-center">
        <div>
          <h2 className="font-bold text-[24px]">
            Hiring Agency List ({agents?.length})
          </h2>
        </div>
        <div className="flex gap-4 mt-6 lg:mt-0">
          <SearchInput placeholder="Search Agent " />
          {csv_data?.length > 0 && (
            <div className="mt-2">
              <CSVBtn data={csv_data} filename={"Agent List"} />
            </div>
          )}
          <button
            onClick={() => navigate("/admin/register-agency")}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Register Agency
          </button>
        </div>
      </div>
      {/* table  */}
      <div className="overflow-auto mt-6">
        <table className="table table-zebra overflow-x-auto w-full">
          <thead className="border-b-2">
            <tr className="uppercase bg-[#f2f2f2]">
              <th>ID</th>
              <th>Name</th>
              <th>Register date</th>
              <th>Email</th>
              <th>License No</th>
              <th>Phone</th>
              <th>Branch name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              agents?.length > 0 &&
              agents.map((item, i) => (
                <tr key={i}>
                  <th>{i + 1}</th>
                  <th className="whitespace-nowrap">{item?.name}</th>
                  <th>{item?.created_at.slice(0, 10)}</th>
                  <th>{item?.email}</th>
                  <th className="whitespace-nowrap">
                    {item?.partner?.license_no}
                  </th>
                  <th>{item?.phone ? item?.phone : "Not Save"}</th>
                  <th className="whitespace-nowrap">
                    {item?.partner?.branch_name
                      ? item?.partner?.branch_name
                      : "Not Save"}
                  </th>
                  <th className="text-center">
                    <div className="flex gap-4">
                      <div className="w-[30px] flex items-center">
                        <Link to={`/admin/partner_profile/${item.id}`}>
                          <img src={veiw_icon} alt="" className="w-5" />
                        </Link>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            navigate(`sub-candidate-list/${item.id}`)
                          }
                          className="px-[30px] whitespace-nowrap py-[10px] bg-[#1E3767] rounded-[8px] text-white"
                        >
                          Candidate List
                        </button>
                      </div>
                    </div>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && (
          <div className="flex justify-center min-w-full mt-20">
            <TableLoading />
          </div>
        )}
        {!loading && agents?.length === 0 && (
          <div className="flex justify-center min-w-full mt-20">
            <h4 className="text-black font-bold text-xl">No Data found!</h4>
          </div>
        )}
      </div>
      {/* pagination */}
      {!loading &&
        agents?.length > 0 &&
        paginations?.total > paginations?.per_page && (
          <Pagination
            paginations={paginations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
    </div>
  );
};

export default Hiring_Agency;
