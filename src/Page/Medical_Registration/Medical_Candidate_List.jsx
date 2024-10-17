import { useEffect, useRef, useState } from "react";
import { post } from "../../api/axios";
import user_img from "../../../public/images/Avater.png";
import notQR_img from "../../../public/images/notQR.jpeg";
import delete_icon from "../../../public/images/delete_icon.svg";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import { Link, NavLink } from "react-router-dom";
import Pagination from "../../component/Pagination";
import Modal from "../../component/Modal";
import { county } from "../../api/country";
import SearchInput from "../../component/SearchInput";
import TableLoading from "../../component/TableLoading";
import CSVBtn from "../../component/CSVBtn";
import success_icon from "../../../public/images/success.svg";
import documentUploadet from "../../../public/images/document.svg";
import documentNotUploadet from "../../../public/images/documentNot.svg";
const API_URL = import.meta.env.VITE_BASE_URL;

const Medical_Candidate_list = () => {
  const [loading, setLoading] = useState(false);
  const [selectCountry, setSelectCountry] = useState("");
  const [candidateID, setCandidateId] = useState("");
  const [userId, setUserId] = useState("");
  const [allCandidate, setAllCandate] = useState([]);
  const [csv_data, setCsv_data] = useState([]);
  const [countryResult, setCountryResult] = useState();
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [newSearchValue, setNewSearchValue] = useState("");
  useEffect(() => {
    fetchCountry();
  }, []);

  const [modals, setModals] = useState();
  const [country, setCountry] = useState([]);
  const [candidate, setCandate] = useState([]);
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCandidate(search);
  }, [currentPage, search, countryResult]);

  useEffect(() => {
    handleCSVData();
  }, []);

  // // search candidate
  // useEffect(() => {
  //   if (newSearchValue === "") {
  //     setSearch("");
  //   }
  // }, [newSearchValue]);

  const fetchCandidate = async (search) => {
    setLoading(true);
    try {
      const res = await post(`/api/user/search_candidate?page=${currentPage}`, {
        pg: "a",
        phone: search,
        country: parseInt(countryResult) ? parseInt(countryResult) : "",
      });
      console.log(res);

      if (res) {
        const filterCandidate = res?.data?.data.filter(
          (user) => user?.candidate?.approval_status !== "pending"
        );
        setLoading(false);
        setCandate(filterCandidate);
        setCount(res?.count);
        setPaginations({
          per_page: res?.data?.per_page,
          total: res?.data?.total,
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
      const res = await post(`/api/candidate/all?page=${currentPage}`, {
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
      // console.log(allCandidate);
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
          Country: item?.candidate?.country == "2" ? "Turkey" : "Russia",
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

  const fetchCountry = async () => {
    try {
      const response = await post(`api/country/all`);
      // console.log(response);
      setCountry(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  // const handelTestSubmit = async () => {
  //   const formData = {
  //     country_id: parseInt(selectCountry),
  //     candidate_id: parseInt(candidateID),
  //     user_id: parseInt(userId),
  //     min: 0,
  //     max: 0,
  //     status: 1,
  //   };
  //   console.log(62, formData);
  //   setLoading(true);
  //   try {
  //     const res = await post("api/candidate_medical_test/create", formData);
  //     console.log(res);
  //     if (res.success) {
  //       fetchCandidate();
  //       setCandidateId("");
  //       setLoading(false);
  //       setModals(false);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log("Failed to post/", error?.response);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSearch = (data) => {
    setSearch(data);
  };

  // console.log("134===>", search);

  return (
    <>
      <div className="lg:mt-10 mt-2">
        {/* Partner Registration filter */}
        <div className="lg:flex justify-between items-center ">
          <div className="">
            <h2 className="font-bold text-[24px] ">Candidates ({count})</h2>
          </div>
          <div className="lg:flex gap-4">
            <select
              value={countryResult}
              onChange={(e) => setCountryResult(e.target.value)}
              className="px-4 py-1  border-2  rounded-md outline-none"
            >
              <option value="">--select--</option>
              <option value="2">Turkey</option>
              <option value="1">Russia</option>
            </select>
            {/* search candidate */}
            <SearchInput
              placeholder="Search Candidates "
              search={search}
              setSearch={setSearch}
              newSearchValue={newSearchValue}
              setNewSearchValue={setNewSearchValue}
            />

            <div className="mt-2 lg:block hidden">
              {csv_data.length > 0 && (
                <CSVBtn data={csv_data} filename={"Candidates List"} />
              )}
            </div>
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
                  // console.log(item?.report);
                  const index =
                    (currentPage - 1) * paginations.per_page + i + 1;
                  return (
                    <>
                      <tr className="whitespace-nowrap">
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
                            className="max-h-[40px] max-w-[40px] "
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
                            <Link to={`/medical/user_profile/${item.id}`}>
                              <img
                                src={veiw_icon}
                                alt=""
                                className="max-w-[20px] max-h-[20px]"
                              />
                            </Link>
                            {item?.candidate?.approval_status === "reject" ? (
                              <NavLink
                                to={`/medical/document_view/${item?.id}`}
                              >
                                <img
                                  src={documentNotUploadet}
                                  alt="file"
                                  className="max-w-[20px] max-h-[20px]"
                                />
                              </NavLink>
                            ) : (
                              <NavLink
                                to={`/medical/document_view/${item?.id}`}
                              >
                                <img
                                  src={documentUploadet}
                                  alt="file"
                                  className="max-w-[20px] max-h-[20px] cursor-pointer"
                                />
                              </NavLink>
                            )}
                            <button
                              onClick={() => {
                                setModals(true);
                                setCandidateId(item?.candidate?.id);
                                setUserId(item?.id);
                              }}
                              className="bg-[#1E3767] px-[20px] py-[6px] rounded-[4px] text-white"
                            >
                              Enroll Now
                            </button>
                          </div>
                        </th>
                      </tr>
                    </>
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

        {/* pagition section */}

        {!loading && candidate?.length > 0 && (
          <Pagination
            paginations={paginations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      <Modal modals={modals} setModals={setModals}>
        <h1 className="text-center text-xl font-bold pb-2">Country</h1>
        <div className="relative my-3">
          <select
            onChange={(e) => setSelectCountry(e.target.value)}
            value={selectCountry}
            className="appearance-none bg-transparent border border-black  sm:text-sm rounded-lg outline-none w-full px-4 py-3 mb-3 inner_shadow placeholder:text-white/30"
            id="influencer_country"
          >
            <option value="" className="text-black">
              Select a country
            </option>
            {country?.map((data) => (
              <option key={data.id} value={data.id} className="text-black">
                {data.name}
              </option>
            ))}
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
            onClick={() => handelTestSubmit()}
            className="bg-[#1E3767] px-4 py-2 rounded-lg text-white"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Medical_Candidate_list;
