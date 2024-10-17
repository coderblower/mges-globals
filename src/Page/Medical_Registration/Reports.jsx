import SearchInput from "../../component/SearchInput";
import { useEffect, useState } from "react";
import { post } from "../../api/axios";
const API_URL = import.meta.env.VITE_BASE_URL;
import { saveAs } from "file-saver";
import TableLoading from "../../component/TableLoading";
import CSVBtn from "../../component/CSVBtn";
import Pagination from "../../component/Pagination";

const Reports = () => {
  const [candidate, setCandate] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allCandidate, setAllCandate] = useState([]);
  const [csv_data, setCsv_data] = useState([]);
  const [search, setSearch] = useState("");
  const [newSearchValue, setNewSearchValue] = useState("");
  const [paginations, setPaginations] = useState({
    per_page: "",
    total: "",
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEnrollList(search);
    handleCSVData();
  }, [currentPage, search]);

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
      // const filterCandidate = response?.data?.data;
      // const newCandidate = filterCandidate.filter((candidate) => candidate?.result !== null);

      // setCandate(response?.data?.data);
      setCandate(response?.data_sub?.data);
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
      const res = await post(`api/candidate_medical_test/all`, {
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
          Name: item?.user?.name,
          Phone: item?.user?.phone,
          Passport: item?.candidate?.passport,
          Designation: item?.candidate?.designation?.name,
          Created_By: item?.user?.created_by?.name,
          Enroll_Date: item?.created_at.slice(0, 10),
          Submission_Date: item?.updated_at.slice(0, 10),
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
  //   const imageUrl = `${API_URL}/${data}`;
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

  const data = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: "Rakib",
    date: "12/09/23",
    status: "Success",
  }));

  return (
    <>
      <div className="lg:mt-10 mt-2">
        <div className="lg:flex justify-between items-center ">
          <h2 className="font-bold text-[24px] text-[#4D4D4D]">
            Reports ({allCandidate?.length}){" "}
          </h2>

          <div className="flex gap-4 mt-[20px] lg:mt-0">
            <SearchInput
              placeholder="Search Candidates "
              search={search}
              setSearch={setSearch}
              newSearchValue={newSearchValue}
              setNewSearchValue={setNewSearchValue}
            />
            {csv_data?.length > 0 && (
              <div className="mt-2">
                <CSVBtn data={csv_data} filename={"Reports"} />
              </div>
            )}
          </div>
        </div>

        {/* table  */}
        <div className="overflow-auto mt-6">
          <table className="table table-zebra overflow-x-auto">
            {/* head */}
            <thead className=" pb-5">
              <tr className="uppercase whitespace-nowrap border-b border-black text-[#4D4D4D] text-[14px]">
                <th className="pb-5">ID</th>
                <th className="pb-5">Name</th>
                <th className="pb-5">passport</th>
                <th className="pb-5">Note</th>
                <th className="pb-5">Enroll date</th>
                <th className="pb-5">Submission date</th>
                <th className="pb-5">Status</th>
                <th className="pb-5 pl-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                candidate?.length > 0 &&
                candidate?.map(
                  (item, i) =>
                    item?.result && (
                      <tr key={item.id} className="whitespace-nowrap">
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
                        <th>{item?.note}</th>
                        <th>{item?.created_at.slice(0, 10)}</th>
                        <th>{item?.updated_at.slice(0, 10)}</th>
                        <th>
                          {item?.result} {item?.max === 1 && "(Repeat)"}
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
                    )
                )}
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

export default Reports;
