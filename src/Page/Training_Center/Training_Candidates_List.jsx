import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import user_img from "../../../public/images/Avater.png";
import notQR_img from "../../../public/images/notQR.jpeg";
import delete_icon from "../../../public/images/delete_icon.svg";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Pagination from "../../component/Pagination";
import SearchInput from "../../component/SearchInput";
import TableLoading from "../../component/TableLoading";
import success_icon from "../../../public/images/success.svg";
import documentUploadet from "../../../public/images/document.svg";
import documentNotUploadet from "../../../public/images/documentNot.svg";
const API_URL = import.meta.env.VITE_BASE_URL;

const Training_Candidates_List = () => {
  const [candidate, setCandate] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [newSearchValue, setNewSearchValue] = useState("");
  const [countryResult, setCountryResult] = useState();

  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidate();
  }, [currentPage, filter]);

  // // search candidate
  // useEffect(() => {
  //   if (newSearchValue === "") {
  //     setSearch("");
  //   }
  // }, [newSearchValue]);

  const fetchCandidate = async () => {
    setLoading(true);
    try {
      const res = await post(`/api/candidate/${filter}?page=${currentPage}`, {
        pg: "a",
      });
      console.log(res);
      if (res) {
        const filterCandidate = res?.data?.data.filter(
          (user) => user?.candidate?.approval_status !== "pending"
        );
        setCandate(filterCandidate);
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

  const handleEnroll = async (id) => {
    // console.log(id);
    const payload = {
      user_id: id,
      status: 1,
    };
    try {
      const res = await post(`api/pre_skill_test/create`, payload);
      console.log(res);
      if (res) {
        navigate("/training/pre_skill_test");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (search !== "") {
      const handleSearch = async (data) => {
        try {
          const res = await post(`api/user/search_candidate`, {
            phone: data,
          });
          console.log(res);
          if (res) {
            setCandate(res?.data);
          }
        } catch (err) {
          console.log(err);
        }
      };
      handleSearch(search);
    }
  }, [search]);

  const handleCountrySearch = async (data) => {
    setCountryResult(data);
    try {
      const res = await post(`api/user/search_candidate`, {
        phone: "",
        country: parseInt(data) ? parseInt(data) : "",
      });
      console.log(res);
      if (res) {
        setCandate(res?.data);
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
          <h2 className="font-bold text-[24px] ">All Candidates</h2>
        </div>
        <div className="flex gap-3">
          <select
            value={countryResult}
            onChange={(e) => handleCountrySearch(e.target.value)}
            className="px-4 py-1  border-2  rounded-md outline-none"
          >
            <option value="">--select--</option>
            <option value="2">Turkey</option>
            <option value="1">Russia</option>
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-1  border-2  rounded-md outline-none"
          >
            <option value="all" className="text-black">
              All Candidates
            </option>
            <option value="candidate_by_creator">My Creation</option>
          </select>
          {/* search candidate */}
          <SearchInput
            placeholder="Search Candidates "
            search={search}
            setSearch={setSearch}
            newSearchValue={newSearchValue}
            setNewSearchValue={setNewSearchValue}
          />
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
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Photo</th>
              <th className="text-center">QR</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              candidate?.length > 0 &&
              candidate?.map((item, i) => {
                const index = (currentPage - 1) * paginations.per_page + i + 1;
                return (
                  <tr className="whitespace-nowrap" key={i}>
                    <th>{index}</th>
                    {/* <th>{item?.name}</th> */}
                    <th>
                      <div className="flex gap-1">
                        <>
                          {item?.candidate?.photo &&
                            item?.candidate?.passport_file &&
                            item?.candidate?.nid_file &&
                            item?.candidate?.training_file && (
                              <img src={success_icon} alt="success" />
                            )}
                        </>
                        <>{item?.name}</>
                      </div>
                    </th>
                    <th>{item?.candidate?.passport || "Null"}</th>
                    <th>{item?.email}</th>
                    <th>{item?.phone}</th>
                    {<th>{item?.candidate?.approval_status}</th>}
                    <th className="min-w-[60px]">
                      <div className=" w-[50px]">
                        <img
                          className="w-full h-full rounded-full"
                          src={
                            item?.candidate?.photo
                              ? `${API_URL}/${item?.candidate?.photo}`
                              : user_img
                          }
                          alt=""
                        />
                      </div>
                    </th>
                    <th className="flex justify-center">
                      <img
                        className="h-[40px] w-[40px] "
                        src={
                          item?.candidate?.qr_code &&
                          item?.candidate?.approval_status !== "reject"
                            ? `${API_URL}/${item?.candidate?.qr_code}`
                            : notQR_img
                        }
                        alt=""
                      />
                    </th>
                    <th>
                      <div className="flex items-center justify-between gap-4">
                        <Link to={`/training/user_profile/${item.id}`}>
                          <img
                            src={veiw_icon}
                            alt=""
                            className="max-w-[25px] max-h-[25px]"
                          />
                        </Link>
                        {item?.candidate?.approval_status === "reject" ? (
                          <NavLink to={`/training/document_view/${item?.id}`}>
                            <img
                              src={documentNotUploadet}
                              alt="file"
                              className="max-w-[20px] max-h-[20px]"
                            />
                          </NavLink>
                        ) : (
                          <NavLink to={`/training/document_view/${item?.id}`}>
                            <img
                              src={documentUploadet}
                              alt="file"
                              className="max-w-[20px] max-h-[20px] cursor-pointer"
                            />
                          </NavLink>
                        )}

                        <button
                          onClick={() => handleEnroll(item?.id)}
                          className="bg-[#1E3767] px-[20px] py-[6px] rounded-[4px] text-white"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </th>
                  </tr>
                );
              })}
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
    </div>
  );
};

export default Training_Candidates_List;
