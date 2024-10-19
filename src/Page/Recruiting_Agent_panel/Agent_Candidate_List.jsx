import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import user_img from "../../../public/images/Avater.png";
import notQR_img from "../../../public/images/notQR.jpeg";
import delete_icon from "../../../public/images/delete_icon.svg";
import edit_icon from "../../assets/update.svg";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import { Link, NavLink } from "react-router-dom";
import Pagination from "../../component/Pagination";
import SearchInput from "../../component/SearchInput";
import TableLoading from "../../component/TableLoading";
import CSVBtn from "../../component/CSVBtn";
import success_icon from "../../../public/images/success.svg";
import documentUploadet from "../../../public/images/document.svg";
import documentNotUploadet from "../../../public/images/documentNot.svg";
const API_URL = import.meta.env.VITE_BASE_URL;

const Agent_Candidate_List = () => {
  const [candidate, setCandidate] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");

  const [pagination, setPagination] = useState({
    per_page: 10,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCandidates();
  }, [currentPage, search, countryFilter]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await post(`/api/candidate/candidate_by_creator`, {
        page: currentPage,
        search,
        country: countryFilter ? parseInt(countryFilter) : "",
      });
      setCandidate(res?.data?.data || []);
      setPagination({
        per_page: res?.data?.per_page,
        total: res?.data?.total,
      });
      setCsvData(transformDataForCSV(res?.data_all));
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const transformDataForCSV = (data) => {
    return data?.map((item) => ({
      id: item.id,
      Name: item?.name,
      Passport: item?.candidate?.passport || "N/A",
      Designation: item?.candidate?.designation?.name || "N/A",
      Created_By: item?.created_by?.name || "N/A",
      Submission_Date: item?.updated_at?.slice(0, 10) || "N/A",
      Country: item?.candidate?.country === "2" ? "Turkey" : "Russia",
      Status: item?.result || "pending",
    }));
  };

  const handleCountrySearch = (e) => {
    setCountryFilter(e.target.value);
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* Filter and search section */}
      <div className="lg:flex justify-between items-center">
        <h2 className="font-bold text-[24px] ">
          Candidates ({pagination?.total})
        </h2>

        <div className="flex gap-4 mt-[20px] lg:mt-0">
          <select
            value={countryFilter}
            onChange={handleCountrySearch}
            className="px-4 py-1 border-2 rounded-md outline-none"
          >
            <option value="">--Select Country--</option>
            <option value="2">Turkey</option>
            <option value="1">Russia</option>
          </select>

          <SearchInput
            placeholder="Search Candidates"
            search={search}
            setSearch={setSearch}
          />

          {csvData?.length > 0 && (
            <CSVBtn data={csvData} filename={"Candidates_List"} />
          )}
        </div>
      </div>

      {/* Candidates Table */}
      <div className="overflow-auto mt-6">
        <table className="table table-zebra overflow-x-auto">
          <thead className="border-b-2">
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
                const index = (currentPage - 1) * pagination.per_page + i + 1;
                return (
                  <tr key={item.id} className="whitespace-nowrap">
                    <th>{index}</th>
                    <th>
                      <div className="flex gap-2 items-center">
                        {item?.candidate?.photo &&
                          item?.candidate?.passport_file &&
                          item?.candidate?.nid_file &&
                          item?.candidate?.training_file && (
                            <img src={success_icon} alt="success" />
                          )}
                        {item?.name}
                      </div>
                    </th>
                    <th>{item?.candidate?.passport || "Null"}</th>
                    <th>{item?.email}</th>
                    <th>{item?.phone}</th>
                    <th>{item?.candidate?.approval_status || "pending"}</th>
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
                          className="h-[40px] w-[40px]"
                          src={`${API_URL}/${item?.candidate?.qr_code}`}
                          alt="QR"
                        />
                      ) : (
                        <img className="h-[40px] w-[40px]" src={notQR_img} alt="No QR" />
                      )}
                    </th>
                    <th>
                      <div className="flex gap-4 items-center justify-between">
                        <Link to={`/agent_panel/user_profile/${item.id}`}>
                          <img
                            src={veiw_icon}
                            alt="view"
                            className="max-w-[30px] max-h-[30px]"
                          />
                        </Link>
                        <Link to={`/agent_panel/user_update/${item.id}`}>
                          <img
                            src={edit_icon}
                            alt="edit"
                            className="max-w-[20px] max-h-[20px]"
                          />
                        </Link>
                        <NavLink to={`/agent_panel/document_view/${item.id}`}>
                          <img
                            src={
                              item?.candidate?.approval_status === "reject" ||
                              item?.candidate?.approval_status === "pending"
                                ? documentNotUploadet
                                : documentUploadet
                            }
                            alt="file"
                            className="max-w-[20px] max-h-[20px] cursor-pointer"
                          />
                        </NavLink>
                      </div>
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Loading and empty states */}
      {loading && (
        <div className="flex justify-center min-w-full mt-20">
          <TableLoading />
        </div>
      )}
      {!loading && candidate?.length === 0 && (
        <div className="flex justify-center min-w-full mt-20">
          <h4 className="text-black font-bold text-xl">No Data found!</h4>
        </div>
      )}

      {/* Pagination */}
      {!loading && candidate?.length > 0 && pagination?.total > pagination?.per_page && (
        <Pagination
          paginations={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Agent_Candidate_List;
