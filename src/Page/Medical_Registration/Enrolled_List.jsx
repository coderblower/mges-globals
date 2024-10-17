import { useEffect, useRef, useState } from "react";
import { post } from "../../api/axios";
import user_img from "../../../public/images/Avater.png";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../component/Modal";
import { county } from "../../api/country";
import TableLoading from "../../component/TableLoading";
import SearchInput from "../../component/SearchInput";
import InputField from "../../component/InputField";
import CSVBtn from "../../component/CSVBtn";
import Pagination from "../../component/Pagination";
const API_URL = import.meta.env.VITE_BASE_URL;

const Enrolled_List = () => {
  const navigate = useNavigate();
  const [modals, setModals] = useState();
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [fit, setFit] = useState("");
  const [id, setId] = useState("");
  const [result, setResult] = useState("fit");
  const [loading, setLoading] = useState(true);
  const [allCandidateEnrolls, setAllCandateEnrolls] = useState([]);
  const [csv_data, setCsv_data] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [newSearchValue, setNewSearchValue] = useState("");
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    setLoading(true);
    try {
      const response = await post(`api/country/all`);
      console.log(response);
      setCountry(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  const [enrolls, setEnrolls] = useState([]);

  useEffect(() => {
    fetchEnrollList(search);
    handleCSVData();
  }, [currentPage, search]);

  useEffect(() => {
    handleCSVData();
  }, []);

  // // search candidate
  // useEffect(() => {
  //   if (newSearchValue === "") {
  //     setSearch("");
  //   }
  // }, [newSearchValue]);

  const fetchEnrollList = async (search) => {
    setLoading(true);
    try {
      const response = await post(
        `api/candidate_medical_test/all?page=${currentPage}`,
        {
          pg: "a",
          phone: search,
        }
      );
      console.log(response);
      setEnrolls(response?.data?.data);
      setPaginations({
        per_page: response.data.per_page,
        total: response.data.total,
      });
    } catch (error) {
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCSVData = async () => {
    setLoading(true);
    try {
      const res = await post(`api/candidate_medical_test/all`, { pg: "" });
      console.log(res.data);
      if (res) {
        setAllCandateEnrolls(res?.data);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allCandidateEnrolls) {
      // console.log(allCandidateEnrolls);
      const transformedData = allCandidateEnrolls?.map((item, i) => {
        return {
          id: item.id,
          Name: item?.user?.name,
          Phone: item?.user?.phone,
          Passport: item?.candidate?.passport,
          Designation: item?.candidate?.designation?.name,
          Created_By: item?.user?.created_by?.name,
          Submission_Date: item?.updated_at.slice(0, 10),
        };
      });
      setCsv_data(transformedData);
    }
  }, [allCandidateEnrolls]);

  const handleSubmit = async () => {
    const payload = {
      id: parseInt(id),
      min: min,
      max,
      result,
    };
    console.log(payload);
    try {
      const res = await post(`api/candidate_medical_test/update`, payload);
      console.log(res);
      if (res.success) {
        setModals(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (data) => {
    setSearch(data);
  };

  // console.log(search);

  return (
    <>
      <div className="lg:mt-10 mt-2">
        {/* Partner Registration filter */}
        <div className="lg:flex justify-between items-center ">
          <div className="">
            <h2 className="font-bold text-[24px] ">
              Enrolled List ({allCandidateEnrolls?.length})
            </h2>
          </div>
          <div className="flex gap-4 mt-[20px] lg:mt-0">
            {/* <select className="px-4 py-1  border-2  rounded-md outline-none">
              <option value="">--select--</option>
              <option value="lime">02/02/2024</option>
              <option value="lime">13/02/2024</option>
              <option value="lime">5/02/2024</option>
            </select> */}

            {/* <input
              className={`px-4 py-[8px] border-2 border-[#C5BFBF] text-gray-700 font-[500]  w-full  rounded-md outline-none`}
              type="date"
              onChange={(e) => setDateValue(e.target.value)}
              value={dateValue}
            /> */}

            <div className="flex gap-4">
              {/* search candidate */}
              <SearchInput
                placeholder="Search Candidates "
                search={search}
                setSearch={setSearch}
                newSearchValue={newSearchValue}
                setNewSearchValue={setNewSearchValue}
              />
              {csv_data?.length > 0 && (
                <div className="mt-2">
                  <CSVBtn data={csv_data} filename={"Enrolled List"} />
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
              <tr className="uppercase bg-[#f2f2f2] whitespace-nowrap">
                <th>ID</th>
                <th>Name</th>

                <th>Passport</th>
                <th>Register date</th>
                <th>Enroll date</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Photo</th>
                <th className="text-center">QR</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                enrolls?.length > 0 &&
                enrolls?.map((item, i) => (
                  <tr className="whitespace-nowrap ">
                    <th>{i + 1}</th>
                    {/* <th>{item?.user?.name}</th> */}
                    <th>
                      {item?.candidate?.country === "1" ? (
                        <div className="flex gap-2">
                          <p className="text-[15px]">
                            {item?.candidate?.firstName}
                          </p>
                          <p className="text-[15px]">
                            {item?.candidate?.lastName}
                          </p>
                        </div>
                      ) : (
                        item?.user?.name
                      )}
                    </th>

                    <th>{item?.candidate?.passport}</th>
                    <th>{item?.user?.created_at.slice(0, 10)}</th>
                    <th>{item?.created_at.slice(0, 10)}</th>
                    <th>{item?.user?.email}</th>
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
                    <th className="">
                      {item?.result === "fit" || item?.result === "unfit" ? (
                        <button
                          disabled
                          className="bg-[#1E3767] px-[20px] py-[6px] rounded-[4px] w-full text-[gray]"
                        >
                          Submitted
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate(
                              `/medical/enrolled_list/${item.id}/${item.country_id}`
                            )
                          }
                          className="bg-[#1E3767] px-[20px] py-[6px] rounded-[4px] text-white"
                        >
                          Report Submit
                        </button>
                      )}
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
        {!loading && enrolls?.length === 0 && (
          <div className="flex justify-center min-w-full mt-20 ">
            <h4 className="text-black font-bold text-xl">No Data found!</h4>
          </div>
        )}

        {/* pagition  */}

        {!loading && allCandidateEnrolls?.length > 0 && (
          <Pagination
            paginations={paginations}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      <Modal modals={modals} setModals={setModals}>
        <h1 className="text-center text-xl font-bold pb-2">Country</h1>
        <div>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="appearance-none bg-transparent border border-black  sm:text-sm rounded-lg outline-none w-full px-4 py-3 mb-3 inner_shadow my-4"
            placeholder="Enter Min Number"
          />
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="appearance-none bg-transparent border border-black  sm:text-sm rounded-lg outline-none w-full px-4 py-3 mb-3 inner_shadow my-4"
            placeholder="Enter Max  Number"
          />

          <div className="relative my-3">
            <select
              className="appearance-none bg-transparent border border-black  sm:text-sm rounded-lg outline-none w-full px-4 py-3 mb-3 inner_shadow placeholder:text-white/30"
              id="influencer_country"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            >
              <option value="" className="text-black">
                Select a Option
              </option>
              <option value="fit" className="text-black">
                Fit
              </option>
              <option value="unfit" className="text-black">
                Unfit
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
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-yellow-400 px-4 py-2 rounded-lg text-white"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Enrolled_List;
