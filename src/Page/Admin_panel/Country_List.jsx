import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import pen_icon from "../../../public/images/pen_icon.svg";
import { post } from "../../api/axios";
import TableLoading from "../../component/TableLoading";

const Country_List = () => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchloading, setFetchLoading] = useState(true);

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    try {
      const response = await post(`api/country/all`);
      console.log(response);
      setCountry(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  const handelAddCuntry = async () => {
    const formData = {
      name,
      active: true,
    };
    console.log(formData);
    setLoading(true);
    try {
      const res = await post("api/country/create", formData);
      console.log(res);
      if (res.success) {
        setName("");
        fetchCountry();
        setLoading(false);
        toast.success("Create Country successfully!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("faild to Post");
      console.log("Failed to post/", error?.response.error.error);
    } finally {
      setLoading(false);
    }
  };

  const cuntryUpdate = () => {
    setUpdate(!update);
  };

  const handelUpdate = () => {
    setUpdate(false);
  };

  const hadelDelete = () => {};

  return (
    <div className="lg:mt-10 mt-2 w-full ">
      <div className=" ">
        <div className="lg:flex justify-between items-center ">
          <h2 className="font-bold lg:mb-0 mb-5 text-[24px] ">
            {!update ? "Add Country" : "Update Country"}
          </h2>
          <div className="flex gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your cuntry name"
              className="border-[#C5BFBF] border-2 px-5 p-[12px] w-[400px]  outline-none   rounded-md"
              type="Email"
            />
            <div>
              {!update ? (
                <button
                  onClick={() => handelAddCuntry()}
                  className="px-[40px] py-[12px] bg-[#1E3767] rounded-[8px] text-white "
                >
                  Add
                </button>
              ) : (
                <button
                  onClick={() => handelUpdate()}
                  className="px-[40px] py-[12px] bg-[#1E3767] rounded-[8px] text-white "
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>

        {!update ? (
          <>
            {/* table  */}
            <div className="overflow-auto mt-6">
              <table className="table table-zebra  overflow-x-auto">
                {/* head */}
                <thead className=" border-b-2">
                  <tr className="uppercase bg-[#f2f2f2]">
                    <th>Name</th>
                    <th className="text-end pr-8">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading &&
                    country?.length > 0 &&
                    country.map((data) => (
                      <tr key={data.id}>
                        <td>{data.name}</td>
                        <td className="flex justify-end">
                          <div className="flex items-center gap-7">
                            <button onClick={() => cuntryUpdate()}>
                              <img src={pen_icon} alt="" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
      {fetchloading && (
        <div className="flex justify-center min-w-full mt-20 ">
          <TableLoading />
        </div>
      )}
      {!fetchloading && country?.length === 0 && (
        <div className="flex justify-center min-w-full mt-20 ">
          <h4 className="text-black font-bold text-xl">No Data found!</h4>
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Country_List;
