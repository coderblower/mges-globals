import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import Modal from "../../component/Modal";
import { Link, useNavigate } from "react-router-dom";
import TableLoading from "../../component/TableLoading";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import SearchInput from "../../component/SearchInput";
import Pagination from "../../component/Pagination";
import toast, { Toaster } from "react-hot-toast";

const Medical_list = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [number, setNumber] = useState("");
  const [id, setId] = useState("");
  const [modals, setModals] = useState();
  const [csv_data, setCsv_data] = useState([]);
  const [allCandidate, setAllCandate] = useState([]);
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
        role_id: 3,
        pg: "a",
      });
      console.log(res);
      if (res) {
        setAgents(res.data?.data);
        setPaginations({
          per_page: res.per_page,
          total: res.total,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allCandidate) {
      console.log(allCandidate);
      const transformedData = allCandidate?.map((item, i) => {
        return {
          id: item.id,
          Name: item?.name,
          Passport: item?.candidate?.passport,
          Designation: item?.candidate?.designation?.name,
          Created_By: item?.created_by?.name,
          Submission_Date: item?.updated_at.slice(0, 10),
          Status: item?.result == null ? "pending" : item?.result,
        };
      });
      setCsv_data(transformedData);
    }
  }, [agents]);

  const handleSubmit = async () => {
    const payload = {
      id: parseInt(id),
      quota: parseInt(number),
    };
    console.log(payload);
    try {
      const res = await post(`api/partner/quota_update`, payload);
      console.log(res);
      if (res.success) {
        setNumber("");
        setId("");
        setModals(false);
        fetchAgent();
        toast.success("Quota added successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // seet infinite quta
  const handleInfiniteQuta = async (id) => {
    console.log("hallo");
    const payload = {
      id: parseInt(id),
      quota: "1000000",
    };
    console.log(payload);
    try {
      const res = await post(`api/partner/quota_update`, payload);
      console.log(res);
      if (res.success) {
        setId("");
        setModals(false);
        fetchAgent();
        toast.success("Infinite quota added successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="lg:mt-10 mt-2">
        {/* Partner Registration filter */}
        <div className="lg:flex justify-between items-center ">
          <div className="">
            <h2 className="font-bold text-[24px] ">
              Medical List ({agents?.length})
            </h2>
          </div>
          <div className="mt-6 lg:mt-0">
            <SearchInput placeholder="Search Medical Center " />
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
                <th>Quota</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                agents?.length > 0 &&
                agents.map((item, i) => (
                  <tr key={i} className="whitespace-nowrap">
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

                    <th>
                      {item?.partner?.quota - item?.partner?.quota_used >=
                      100000
                        ? "Infinite"
                        : item?.partner?.quota - item?.partner?.quota_used}
                    </th>

                    <th className="flex gap-4">
                      <div className="w-[30px] flex items-center">
                        <Link to={`/admin/partner_profile/${item.id}`}>
                          <img src={veiw_icon} alt="" className="w-5" />
                        </Link>
                      </div>
                      <button
                        onClick={() =>
                          navigate(`sub-candidate-list/${item.id}`)
                        }
                        className="px-[30px]  py-[10px] bg-[#1E3767] rounded-[8px] text-white"
                      >
                        Candidate List
                      </button>
                      <button
                        onClick={() => {
                          setModals(true);
                          setId(item?.id);
                        }}
                        className="px-[30px]  py-[10px] bg-[#1E3767] rounded-[8px] text-white"
                      >
                        Quota Set
                      </button>
                      <button
                        onClick={() => handleInfiniteQuta(item?.id)}
                        className="px-[30px]  py-[10px] bg-[#1E3767] rounded-[8px] text-white"
                      >
                        Infinite Quota
                      </button>
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
        {!loading && agents.length === 0 && (
          <div className="flex justify-center min-w-full mt-20 ">
            <h4 className="text-black font-bold text-xl">No Data found!</h4>
          </div>
        )}
        <Modal modals={modals} setModals={setModals}>
          <h1 className="text-center text-xl font-bold pb-2">Quota Set</h1>

          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="appearance-none bg-transparent border border-black  sm:text-sm rounded-lg outline-none w-full px-4 py-3 mb-3 inner_shadow my-4"
            placeholder="Enter Number"
          />

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="bg-[#1E3767] px-[40px] py-[12px] rounded-lg text-white"
            >
              Submit
            </button>
          </div>
        </Modal>
        <Toaster position="top-right" reverseOrder={false} />
      </div>

      {/* pagition  */}
      {!loading && agents.length > 0 && (
        <Pagination
          paginations={paginations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default Medical_list;
