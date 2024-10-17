import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import TableLoading from "../../component/TableLoading";
import SearchInput from "../../component/SearchInput";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import Pagination from "../../component/Pagination";

const Training_List = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });

  useEffect(() => {
    fetchAgent();
  }, [currentPage]);

  const fetchAgent = async () => {
    setLoading(true);
    try {
      const res = await post(`/api/partner/get_partners?page=${currentPage}`, {
        role_id: 2,
      });
      console.log(res);
      if (res) {
        setAgents(res?.data);
        setPaginations({
          per_page: res?.per_page,
          total: res?.total,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="lg:mt-10 mt-2">
        {/* Partner Registration filter */}
        <div className="lg:flex justify-between items-center ">
          <div className="">
            <h2 className="font-bold text-[24px] ">Training List</h2>
          </div>
          <div className="mt-6 lg:mt-0">
            <SearchInput placeholder="Search training center " />
          </div>
        </div>

        {/* table  */}
        <div className="overflow-auto mt-6">
          <table className="table table-zebra  overflow-x-auto">
            {/* head */}
            <thead className=" border-b-2">
              <tr className="uppercase bg-[#f2f2f2]">
                <th>ID</th>
                <th>Name</th>
                <th>Register date</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Branch name</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                agents?.length > 0 &&
                agents.map((item, i) => (
                  <tr className="whitespace-nowrap">
                    <th>{i + 1}</th>
                    <th>{item?.name}</th>
                    <th>{item?.created_at.slice(0, 10)}</th>
                    <th>{item?.email}</th>
                    <th>{item?.phone ? item?.phone : "Not Save"}</th>
                    <th>
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
                        <button
                          onClick={() =>
                            navigate(`sub-candidate-list/${item.id}`)
                          }
                          className="px-[30px] whitespace-nowrap  py-[10px] bg-[#1E3767] rounded-[8px] text-white"
                        >
                          Candidate List
                        </button>
                      </div>
                    </th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {loading && (
          <div className="flex justify-center min-w-full mt-20 ">
            <TableLoading />
          </div>
        )}
        {!loading && agents?.length === 0 && (
          <div className="flex justify-center min-w-full mt-20 ">
            <h4 className="text-black font-bold text-xl">No Data found!</h4>
          </div>
        )}
      </div>
      {/* pagition  */}
      {!loading && agents?.length > 0 && (
        <Pagination
          paginations={paginations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Training_List;
