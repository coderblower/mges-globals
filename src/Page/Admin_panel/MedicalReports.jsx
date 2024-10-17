import SearchInput from "../../component/SearchInput";
import { useEffect, useState } from "react";
import { post } from "../../api/axios";
const API_URL = import.meta.env.VITE_BASE_URL;
import { saveAs } from "file-saver";
import Select from "../../component/Select";
import CSVBtn from "../../component/CSVBtn";
import TableLoading from "../../component/TableLoading";
import Pagination from "../../component/Pagination";

const MedicalReports = () => {
  const [loading, setLoading] = useState(false);
  const [candidate, setCandate] = useState([]);
  const [allCandidate, setAllCandate] = useState([]);
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [medicalList, setMedicalList] = useState([]);
  const [result, setResult] = useState("");
  const [user_id, setUser_id] = useState("");
  const [count, setCount] = useState(0);
  const [agent_list, setAgent_list] = useState([]);
  const [agent_id, setAgent_id] = useState("");
  const [csv_data, setCsv_data] = useState([]);
  const [search, setSearch] = useState("");
  const [newSearchValue, setNewSearchValue] = useState("");

  // console.log("all 28 =====>", agent_id);

  useEffect(() => {
    fetchEnrollList();
    handleCSVData();
  }, [currentPage, user_id, result, agent_id, search]);

  // // search candidate
  // useEffect(() => {
  //   if (newSearchValue === "") {
  //     setSearch("");
  //   }
  // }, [newSearchValue]);

  const fetchEnrollList = async () => {
    setLoading(true);
    try {
      const response = await post(
        `api/candidate_medical_test/filter?page=${currentPage}`,
        {
          result,
          user_id,
          agent_id,
          passport: search,
          pg: "a",
        }
      );
      // console.log("=======>39");

      if (response.success) {
        console.log("done");
        setLoading(false);
        setCount(response.count);
        setCandate(response?.data?.data);
        setPaginations({
          per_page: response.data.per_page,
          total: response.data.total,
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
      const res = await post(`api/candidate_medical_test/filter`, {
        result,
        user_id,
        agent_id,
        passport: search,
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
      const transformedData = allCandidate?.map((item, i) => {
        return {
          id: item.id,
          Name: item?.user?.name,
          Passport: item?.candidate?.passport,
          Note: item?.note,
          Agent: item?.user?.createdby?.name,
          Medical_Name: item?.enrolled_by?.name,
          Enroll_Date: item?.created_at.slice(0, 10),
          Submission_Date: item?.updated_at.slice(0, 10),
          Status: item?.result == null ? "pending" : item?.result,
        };
      });
      setCsv_data(transformedData);
    }
  }, [allCandidate]);

  const handleClick = (data) => {
    console.log(data);
    const url = `${API_URL}/${data}`;
    saveAs(url, "image.svg");
  };

  // const handleClick = (data) => {
  //   console.log(data);
  //   const imageUrl = `${API_URL}/${data}`;
  //   console.log(imageUrl);

  //   fetch(imageUrl, {
  //     mode: "no-cors",
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const blobUrl = URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = blobUrl;
  //       link.download = "your_image.jpg";
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(blobUrl);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching image:", error);
  //     });
  // };

  useEffect(() => {
    fetchMedical();
    fetchAgent();
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

  const fetchAgent = async () => {
    try {
      const res = await post(`/api/partner/get_partners`, {
        role_id: 4,
      });
      console.log(res);
      if (res.success) {
        setAgent_list(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSearch = async (data) => {
  //   setSearch(data);
  //   try {
  //     const res = await post(`api/user/search_candidate`, {
  //       phone: data,
  //     });
  //     console.log(res);
  //     if (res) {
  //       setCandate(res);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  console.log(allCandidate);

  return (
    <>
      <div className="lg:mt-10 mt-2">
        <h2 className="font-bold text-[24px] text-[#4D4D4D] mb-[20px]">
          Medical Reports ({paginations?.total})
        </h2>
        <div className="flex justify-between ">
          <div>
            <SearchInput
              placeholder="Search Candidates "
              search={search}
              setSearch={setSearch}
              newSearchValue={newSearchValue}
              setNewSearchValue={setNewSearchValue}
            />
          </div>

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

            <Select data={agent_id} setData={setAgent_id} option={agent_list} />

            {csv_data?.length > 0 && (
              <div className="mt-2">
                <CSVBtn data={csv_data} filename={"Medical Reports List"} />
              </div>
            )}

            {/* <div>
              <input
                type="date"
                className=" px-2 p-[8px]  mb-5 rounded-md outline-none border-2 border-[#C5BFBF]"
              />
            </div> */}
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
                <th className="pb-5">Note</th>
                <th className="pb-5">Agent</th>
                <th className="pb-5">Medical Name</th>
                <th className="pb-5">Enroll date</th>
                <th className="pb-5">Submission date</th>
                <th className="pb-5">Status</th>
                <th className="pb-5 pl-5 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {!loading &&
                candidate?.length > 0 &&
                candidate?.map((item, i) => {
                  const index =
                    (currentPage - 1) * paginations.per_page + i + 1;
                  return (
                    <tr key={item.id} className="whitespace-nowrap">
                      <th>{index}</th>
                      <th>{item?.user?.name}</th>
                      <th>{item?.candidate?.passport || "Null"}</th>
                      <th>{item?.note || "-"}</th>
                      <th>{item?.user?.createdby?.name}</th>
                      <th>{item?.enrolled_by.name}</th>
                      <th>{item?.created_at.slice(0, 10)}</th>
                      <th>{item?.updated_at.slice(0, 10)}</th>
                      <th>{item?.result == null ? "pending" : item?.result}</th>

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

        {!loading && candidate?.length > 0 && (
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
