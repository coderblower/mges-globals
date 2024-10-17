import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { post } from "../../api/axios";
import TableLoading from "../../component/TableLoading";

const RequestedCandidate = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    handleGetAllCandidate();
  }, []);

  const handleGetAllCandidate = async () => {
    setLoading(true);
    try {
      const res = await post(`/api/candidate/all`, {
        pg: "",
      });
      console.log(res.data);
      if (res) {
        const filterData = res?.data.filter(
          (user) => user?.candidate?.approval_status === "pending"
        );
        setData(filterData);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex items-center  justify-between mt-8">
        <h2 className="font-bold text-[24px] ">
          Requested Candidate ({data?.length})
        </h2>
      </div>

      {/* table  */}
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-[#EEE]">
            <tr className="uppercase">
              <th>ID</th>
              <th>Name</th>
              <th>Passport</th>
              <th>Created By</th>
              <th>Register date</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          {/* Todo */}
          <tbody>
            {!loading &&
              data?.length > 0 &&
              data?.map((item, i) => (
                <tr key={i}>
                  <td>{(i += 1)}</td>
                  <td>{item?.name}</td>
                  <th className="whitespace-nowrap">
                    {item?.candidate?.passport || "Null"}
                  </th>
                  <th>{item?.created_by?.name}</th>
                  <th>{item?.created_at.slice(0, 10)}</th>

                  <td>{item?.candidate?.approval_status}</td>
                  <td className="text-center">
                    <Link to={`/admin/document_view/${item?.id}`}>
                      <button
                        // onClick={handlePrint}
                        className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md transition-transform active:scale-95"
                      >
                        <h2 className="whitespace-nowrap">Document View </h2>
                      </button>
                    </Link>
                  </td>
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
      {!loading && data?.length === 0 && (
        <div className="flex justify-center min-w-full mt-20 ">
          <h4 className="text-black font-bold text-xl">No Data found!</h4>
        </div>
      )}

      {/* pagition  */}
      {/* <div className="flex mt-10 items-center justify-center mb-10">
        <div className="flex">
          <div className="px-4 py-3 border-2 bg-[#EEE] rounded-tl-md rounded-bl-md">
            1
          </div>
          <div className="px-4 py-3 border-2">2</div>
          <div className="px-4 py-3 border-2">3</div>
          <div className="px-4 py-3 border-2">...</div>
          <div className="px-4 py-3 border-2">6</div>
          <div className="px-4 py-3 border-2 rounded-tr-md rounded-br-md">
            7
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default RequestedCandidate;
