import SearchInput from "../../component/SearchInput";
import { useEffect, useState } from "react";
import { post } from "../../api/axios";
const API_URL = import.meta.env.VITE_BASE_URL;
import { saveAs } from "file-saver";
import Pagination from "../../component/Pagination";
import TableLoading from "../../component/TableLoading";
import CSVBtn from "../../component/CSVBtn";

const MedicalReports = () => {
  const [loading, setLoading] = useState(false);
  const [candidate, setCandate] = useState([]);
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [medicalList, setMedicalList] = useState([]);
  const [result, setResult] = useState("");
  const [user_id, setUser_id] = useState("");
  const [count, setCount] = useState(0);
  const [allCandidate, setAllCandate] = useState([]);
  const [csv_data, setCsv_data] = useState([]);

  useEffect(() => {
    fetchEnrollList();
  }, [user_id, result]);

  const fetchEnrollList = async () => {
    setLoading(true);
    try {
      const response = await post(`api/candidate_medical_test/filter`, {
        result,
        user_id,
      });
      console.log(response, "=======>");

      if (response.success) {
        console.log("done");
        setLoading(false);
        setCount(response.count);
        setCandate(response?.data);
        setAllCandate(response?.data_all);
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
          Name: item?.user?.name,
          Passport: item?.candidate?.passport,
          Designation: item?.candidate?.designation?.name,
          Created_By: item?.user?.createdby?.name,
          Submission_Date: item?.updated_at?.slice(0, 10),
          Status: item?.result == null ? "pending" : item?.result,
        };
      });
      setCsv_data(transformedData);
    }
  }, [candidate]);

  const handleClick = (data) => {
    console.log(data);
    const url = `${API_URL}/${data}`;
    saveAs(url, "image.svg");
  };

  useEffect(() => {
    fetchMedical();
  }, []);

  const fetchMedical = async () => {
    try {
      const res = await post(`api/user/group_by`, {
        role_id: 3,
      });
      if (res.success) {
        setMedicalList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="lg:mt-10 mt-2">
        <div className="flex justify-between items-center ">
          <h2 className="font-bold text-[24px] text-[#4D4D4D]">
            Medical Reports ({count})
          </h2>
          {/* <SearchInput placeholder="Search Candidates " /> */}

          <div className="flex gap-4">
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className=" px-2 p-[8px]  mb-5 rounded-md outline-none border-2 border-[#C5BFBF]"
            >
              <option value="">--select--</option>
              <option value="fit">Fit</option>
              <option value="unfit">Unfit</option>
            </select>

            <select
              value={user_id}
              onChange={(e) => setUser_id(e.target.value)}
              className=" px-2 p-[8px]  mb-5 rounded-md outline-none border-2 border-[#C5BFBF]"
            >
              <option value="">--select--</option>
              {medicalList &&
                medicalList?.map((data) => (
                  <option key={data.id} value={data?.id}>
                    {data?.name}
                  </option>
                ))}
            </select>
            {csv_data?.length > 0 && (
              <div className="mt-2">
                <CSVBtn data={csv_data} filename={"Medical Reports List"} />
              </div>
            )}
          </div>
        </div>

        {/* table  */}
        <div className="overflow-auto mt-6 w-full ">
          <table className="table table-zebra overflow-x-auto w-full ">
            {/* head */}
            <thead className=" pb-5">
              <tr className="uppercase whitespace-nowrap border-b border-black text-[#4D4D4D] text-[14px]">
                <th className="pb-5">ID</th>
                <th className="pb-5">Name</th>
                <th className="pb-5">Passport</th>
                <th className="pb-5">Agent</th>
                <th className="pb-5">Enroll date</th>
                <th className="pb-5">Submission date</th>
                <th className="pb-5">Status</th>
                <th className="pb-5 pl-5 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                candidate?.length > 0 &&
                candidate?.map((item, i) => (
                  <tr key={item.id} className="whitespace-nowrap">
                    <th>{i + 1}</th>
                    <th>{item?.user?.name}</th>
                    <th>{item?.candidate?.passport}</th>
                    <th>{item?.user?.createdby.name}</th>
                    <th>{item?.created_at.slice(0, 10)}</th>
                    <th>{item?.updated_at.slice(0, 10)}</th>
                    <th>
                      {item?.result == null ? "pending" : item?.result}
                      {item?.max === 1 && "(Repeat)"}
                    </th>

                    <th className="">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleClick(item.file)}
                          className="bg-[#1E3767] px-[20px] py-[6px] rounded-full text-white"
                        >
                          Download
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
    </>
  );
};

export default MedicalReports;

// Array(6)
//                 .fill(null)
//                 .map((_, index) => (
//                   <div key={index} className="animate-pulse w-full">
//                     <div className="h-[30px] min-w-[500px] bg-gray-300 rounded-md mb-5"></div>
//                   </div>
//                 ))
