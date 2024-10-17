import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import user_img from "../../../public/images/Avater.png";
import notQR_img from "../../../public/images/notQR.jpeg";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import edit_icon from "../../assets/update.svg";
import { Link, NavLink } from "react-router-dom";
import Pagination from "../../component/Pagination";
import SearchInput from "../../component/SearchInput";
import CSVBtn from "../../component/CSVBtn";
import TableLoading from "../../component/TableLoading";
import success_icon from "../../../public/images/success.svg";
import documentUploadet from "../../../public/images/document.svg";
import documentNotUploadet from "../../../public/images/documentNot.svg";
const API_URL = import.meta.env.VITE_BASE_URL;

const Admin_Candidate_List = () => {
  const [candidate, setCandate] = useState([]);
  const [allCandidate, setAllCandate] = useState([]);
  const [csv_data, setCsv_data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [newSearchValue, setNewSearchValue] = useState("");
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const [countryResult, setCountryResult] = useState();

  useEffect(() => {
    fetchCandidate(search);
    // handleCSVData();
  }, [currentPage, search, countryResult]);

  // useEffect(() => {
  //   if (newSearchValue === "") {
  //     setSearch("");
  //   }
  // }, [newSearchValue]);

  useEffect(() => {
    handleCSVData();
  }, []);

  const fetchCandidate = async (search) => {
    setLoading(true);
    try {
      const res = await post(`/api/user/search_candidate?page=${currentPage}`, {
        pg: "a",
        phone: search,
        country: parseInt(countryResult) ? parseInt(countryResult) : "",
      });
      console.log(res);
      setCandate(res?.data?.data);
      setPaginations({
        per_page: res?.data?.per_page,
        total: res?.data?.total,
      });
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
      const res = await post(`/api/candidate/all`, {
        pg: "",
      });
      console.log(res.data);
      if (res) {
        setAllCandate(res?.data);
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
          photo: item?.candidate?.photo?.slice(
            27,
            item?.candidate?.photo?.length
          ),
          Country: item?.candidate?.country == "2" ? " Turkey" : "Russia",
          NID_File: item?.candidate?.nid_file?.slice(
            27,
            item?.candidate?.nid_file?.length
          ),
          Passport_File: item?.candidate?.passport_file?.slice(
            27,
            item?.candidate?.passport_file?.length
          ),
          Academic_File: item?.candidate?.academic_file?.slice(
            27,
            item?.candidate?.academic_file?.length
          ),
          Experience_File: item?.candidate?.experience_file?.slice(
            27,
            item?.candidate?.experience_file?.length
          ),
          Training_File: item?.candidate?.training_file?.slice(
            27,
            item?.candidate?.training_file?.length
          ),
          Status: item?.result == null ? "pending" : item?.result,
        };
      });
      setCsv_data(transformedData);
    }
  }, [allCandidate]);

  // const handleSearch = async (data) => {
  //   setSearch(data);
  // };

  // console.log("=====>84", search);

  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="lg:flex justify-between items-center ">
        <div className="">
          <h2 className="font-bold text-[24px] ">
            Candidates ({paginations?.total})
          </h2>
        </div>
        <div className="lg:flex block gap-4 mt-6 lg:mt-0">
          <div className="flex gap-4">
            <select
              value={countryResult}
              onChange={(e) => setCountryResult(e.target.value)}
              className="px-4 py-1  border-2  rounded-md outline-none"
            >
              <option value="">--select--</option>
              <option value="2">Turkey</option>
              <option value="1">Russia</option>
            </select>

            <select className="px-4 py-1  border-2  rounded-md outline-none">
              <option value="grapefruit">Agent Center</option>
              <option value="lime">Training Center</option>
              <option value="mango">Medical Center</option>
            </select>
          </div>

          <div className="flex gap-4 mt-6 lg:mt-0">
            {/* search filed */}
            <SearchInput
              placeholder="Search Candidates "
              search={search}
              setSearch={setSearch}
              newSearchValue={newSearchValue}
              setNewSearchValue={setNewSearchValue}
            />

            {csv_data?.length > 0 && (
              <div className="mt-2">
                <CSVBtn data={csv_data} filename={"Candidates List"} />
              </div>
            )}
          </div>
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
              <th>Created By</th>
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
                      <div className="flex gap-1 items-center">
                        <>
                          {item?.candidate?.photo &&
                            item?.candidate?.passport_file &&
                            item?.candidate?.nid_file &&
                            item?.candidate?.training_file && (
                              <img src={success_icon} alt="success" />
                            )}
                        </>
                        {item?.name}
                      </div>
                    </th>
                    <th className="whitespace-nowrap">
                      {item?.candidate?.passport || "Null"}
                    </th>
                    <th>{item?.created_by?.name}</th>
                    <th>{item?.phone}</th>

                    {<th>{item?.candidate?.approval_status}</th>}
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
                      {item?.candidate?.qr_code &&
                      item?.candidate?.approval_status !== "reject" &&
                      item?.candidate?.approval_status !== "pending" ? (
                        <img
                          className="h-[40px] w-[40px] "
                          src={`${API_URL}/${item?.candidate?.qr_code}`}
                          alt=""
                        />
                      ) : (
                        <img
                          className="h-[40px] w-[40px] "
                          src={notQR_img}
                          alt=""
                        />
                      )}
                    </th>
                    <th>
                      <div className="flex items-center justify-between gap-3">
                        <Link to={`/admin/user_profile/${item.id}`}>
                          <img src={veiw_icon} alt="" className="w-5" />
                        </Link>
                        <Link to={`/admin/user_update/${item.id}`}>
                          <img src={edit_icon} alt="" className="w-5" />
                        </Link>

                        {item?.candidate?.approval_status === "reject" ||
                        item?.candidate?.approval_status === "pending" ? (
                          <NavLink to={`/admin/document_view/${item?.id}`}>
                            <img
                              src={documentNotUploadet}
                              alt="file"
                              className="max-w-[20px] max-h-[20px]"
                            />
                          </NavLink>
                        ) : (
                          <NavLink to={`/admin/document_view/${item?.id}`}>
                            <img
                              src={documentUploadet}
                              alt="file"
                              className="max-w-[20px] max-h-[20px] cursor-pointer"
                            />
                          </NavLink>
                        )}
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

      {/* pagition  */}

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

export default Admin_Candidate_List;
