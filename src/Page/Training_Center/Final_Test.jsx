import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import user_img from "../../../public/images/Avater.png";
import delete_icon from "../../../public/images/delete_icon.svg";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import Modal from "../../component/Modal";
import TableLoading from "../../component/TableLoading";
const API_URL = import.meta.env.VITE_BASE_URL;

const Final_Test = () => {
  const navigate = useNavigate();
  const [modals, setModals] = useState();
  const [candidate, setCandate] = useState(null);
  const [qualified, setQualified] = useState("");
  const [user_id, setUser_id] = useState("");
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFinalTest();
  }, [currentPage]);

  const fetchFinalTest = async () => {
    setLoading(true);
    try {
      const res = await post(`/api/final_test/all0`);
      console.log(res);
      if (res) {
        setCandate(res.data);
        setPaginations({
          per_page: res.data.per_page,
          total: res.data.total,
        });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      id: parseInt(user_id),
      status: parseInt(qualified),
    };
    console.log(payload);
    try {
      const res = await post(`api/final_test/update`, payload);
      console.log(res);
      if (res.success) {
        navigate("/training/qualified-candidates");
        setModals(false);
        toast.success(res.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("failed!");
    }
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex justify-between items-center ">
        <div className="">
          <h2 className="font-bold text-[24px] ">Final Test Candidates</h2>
        </div>
      </div>

      {/* table  */}
      <div className="overflow-auto mt-6">
        <table className="table table-zebra  overflow-x-auto">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase bg-[#f2f2f2] whitespace-nowrap">
              <th>ID</th>
              <th>Name</th>
              <th>Passport</th>
              <th>Register date</th>
              <th>Email</th>
              <th>Pre Skilled</th>
              <th>Skill Test</th>
              <th>Phone</th>
              <th>Photo</th>
              <th className="text-center">QR</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              candidate?.length > 0 &&
              candidate?.map((item, i) => (
                <tr className="whitespace-nowrap">
                  <th>{i + 1}</th>
                  <th>{item?.user?.name}</th>
                  <th>{item?.candidate?.passport}</th>
                  <th>{item?.created_at.slice(0, 10)}</th>
                  <th>{item?.user?.email}</th>
                  <th>Qualified</th>
                  <th>Qualified</th>
                  <th>{item?.user?.phone}</th>
                  <th>
                    <img
                      className="h-[48px] w-[48px] rounded-full"
                      src={
                        item?.candidate?.photo
                          ? `${API_URL}/${item?.candidate?.photo}`
                          : user_img
                      }
                      alt=""
                    />
                  </th>
                  <th className="flex justify-center">
                    <img
                      className="h-[40px] w-[40px] "
                      src={
                        item?.candidate?.qr_code
                          ? `${API_URL}/${item?.candidate?.qr_code}`
                          : user_img
                      }
                      alt=""
                    />
                  </th>
                  <th>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setModals(true);
                          setUser_id(item.id);
                        }}
                        className="bg-[#1E3767] px-[20px] py-[6px] rounded-[4px] text-white"
                      >
                        Details
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
      {!loading && candidate?.length === 0 && (
        <div className="flex justify-center min-w-full mt-20 ">
          <h4 className="text-black font-bold text-xl">No Data found!</h4>
        </div>
      )}
      {!loading &&
        candidate?.length > 0 &&
        paginations?.total > paginations?.per_page && (
          <Pagination
            paginations={paginations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}

      <Modal modals={modals} setModals={setModals}>
        <h1 className="text-center text-xl font-bold pb-2">Final Test</h1>
        <div className="relative my-3">
          <select
            className="appearance-none bg-transparent border border-black  sm:text-sm rounded-lg outline-none w-full px-4 py-3 mb-3 inner_shadow placeholder:text-white/30"
            id="influencer_country"
            value={qualified}
            onChange={(e) => setQualified(e.target.value)}
          >
            <option value="" className="text-black">
              Select a Option
            </option>
            <option value="1" className="text-black">
              Qualified
            </option>
            <option value="0" className="text-black">
              Unqualified
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mb-2">
            <svg
              fill="#000"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 52 52"
              xmlSpace="preserve"
            >
              <path d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z" />
            </svg>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-[#1E3767] px-[40px] py-[12px] rounded-lg text-white transition-transform active:scale-95"
          >
            Submit
          </button>
        </div>
      </Modal>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Final_Test;
