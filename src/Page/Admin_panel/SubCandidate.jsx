import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import user_img from "../../../public/images/Avater.png";
import delete_icon from "../../../public/images/delete_icon.svg";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "../../component/Pagination";
import SearchInput from "../../component/SearchInput";
import TableLoading from "../../component/TableLoading";
const API_URL = import.meta.env.VITE_BASE_URL;

const SubCandidate = () => {
  const { id } = useParams();
  const location = useLocation();
  // !location.pathname.includes("/dashboards")
  const navigate = useNavigate();
  const [candidate, setCandate] = useState([]);
  const [search, setSearch] = useState("");
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState({});

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubCandidate();
  }, [currentPage, id]);

  const fetchSubCandidate = async () => {
    try {
      const res = await post(
        `/api/candidate/candidate_by_creator?page=${currentPage}`,
        {
          user_id: id,
        }
      );
      console.log(res);
      if (res) {
        setCandate(res.data.data);
        setCount(res);
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

  const handleSearch = async (data) => {
    setSearch(data);
    try {
      const res = await post(`api/user/search_candidate`, {
        phone: data,
        creator: count?.creator?.id,
      });
      console.log(res);
      if (res) {
        setCandate(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex justify-between items-center ">
        <div className="">
          <h2 className="font-bold text-[24px] ">
            Candidates {count?.count}{" "}
            <span className="text-[15px]">({count?.creator?.name})</span>
          </h2>
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-1  border-2  rounded-md outline-none">
            <option value="grapefruit">Agent Center</option>
            <option value="lime">Training Center</option>
            <option value="mango">Medical Center</option>
          </select>
          <SearchInput
            placeholder="Search Candidates "
            data={search}
            handleSearch={handleSearch}
          />
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
              <th>Passport</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Photo</th>
              <th className="text-center">QR</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              candidate?.length > 0 &&
              candidate?.map((item, i) => (
                <tr className="whitespace-nowrap">
                  <th>{i + 1}</th>
                  <th>{item?.name}</th>
                  <th>{item?.candidate?.passport || "Null"}</th>
                  <th>{item?.email}</th>
                  <th>{item?.phone}</th>
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
                    <div className="flex justify-center items-center gap-3">
                      <Link to={`/admin/user_profile/${item.id}`}>
                        <img src={veiw_icon} alt="" className="w-5" />
                      </Link>
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

      {!loading && candidate?.length > 0 && (
        <Pagination
          paginations={paginations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default SubCandidate;
