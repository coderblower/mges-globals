import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { post } from "../../api/axios";
import LoadingBtn from "../../component/LoadingBtn";
import TableLoading from "../../component/TableLoading";

const Designation = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchloading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchDesignation();
  }, []);

  const fetchDesignation = async () => {
    try {
      const response = await post(`api/designation/all`);
      console.log(response);
      setCountry(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handelAddDesignation = async () => {
    const formData = {
      name,
      active: 1,
    };
    console.log(formData);
    setLoading(true);
    try {
      const res = await post("api/designation/create", formData);
      console.log(res);
      if (res.success) {
        setName("");
        fetchDesignation();
        setLoading(false);
        toast.success("Create Designation successfully!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("faild to Create");
      console.log("Failed to post/", error?.response.error.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:mt-10 mt-2 w-full ">
      <div className=" ">
        <div className="lg:flex justify-between items-center ">
          <h2 className="font-bold lg:mb-0 mb-5 text-[24px] ">Designation</h2>
          <div className="flex gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Designation"
              className="border-[#C5BFBF] border-2 px-5 p-[12px] w-[400px]  outline-none   rounded-md"
              type="Email"
            />
            <div>
              <LoadingBtn handleSubmit={handelAddDesignation} loading={loading}>
                Add
              </LoadingBtn>
            </div>
          </div>
        </div>

        <div className="overflow-auto mt-6">
          <table className="table table-zebra  overflow-x-auto">
            <thead className=" border-b-2">
              <tr className="uppercase bg-[#f2f2f2]">
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                country.length > 0 &&
                country.map((data) => (
                  <tr key={data.id}>
                    <td>{data.name}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {fetchloading && (
        <div className="flex justify-center min-w-full mt-20 ">
          <TableLoading />
        </div>
      )}
      {!fetchloading && country.length === 0 && (
        <div className="flex justify-center min-w-full mt-20 ">
          <h4 className="text-black font-bold text-xl">No Data found!</h4>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Designation;
