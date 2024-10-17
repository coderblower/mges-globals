import React, { useEffect, useState } from "react";
import delete_icon from "../../../public/images/delete_icon.svg";
import pen_icon from "../../../public/images/pen_icon.svg";
import { post } from "../../api/axios";
import toast, { Toaster } from "react-hot-toast";

const Medical_Test = () => {
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [minimum, setMinimum] = useState("");
  const [maximum, setMaximum] = useState("");
  const [statusValue, setStatusValue] = useState(1);
  const [allTest, setAllTest] = useState([]);

  // Get all test report
  useEffect(() => {
    fetchMedical();
  }, []);

  const fetchMedical = async () => {
    try {
      const response = await post(`api/medical_test_list/all`);
      console.log(response);
      setAllTest(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  const handelAddMedical = async () => {
    const formData = {
      name,
      min: minimum,
      max: maximum,
      status: statusValue,
    };
    console.log(formData);

    setLoading(true);
    try {
      const res = await post("api/medical_test_list/create", formData);
      console.log(res);
      if (res.success) {
        setName("");
        setMinimum("");
        setMaximum("");
        setStatusValue("");
        setLoading(false);
        fetchMedical();
        toast.success("Create Medical Test successfully!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("faild to Post");
      console.log("Failed to post/", error?.response.error);
    } finally {
      setLoading(false);
    }
  };

  const cuntryUpdate = () => {
    setUpdate(!update);
  };

  const medicalUpdate = () => {
    setUpdate(!update);
  };

  console.log(allTest);
  return (
    <div className="lg:mt-10 mt-2 ">
      <div>
        <div>
          <h2 className="font-bold text-[24px] ">
            {!update ? "Medical Test List" : "Medical Test List Update"}
          </h2>
          <div className="mt-10">
            <div className="lg:flex gap-5 mb-6">
              <div className="lg:w-2/5">
                <p className="font-semibold mb-2">Test name </p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your test name "
                  className="border-[#C5BFBF] border-2 px-2 p-[12px] w-full outline-none    rounded-md"
                  type="text"
                />
              </div>
              <div className="lg:w-3/5 lg:flex gap-5">
                <div className="lg:flex lg:w-2/4 gap-5">
                  <div className="lg:w-1/2">
                    <p className="font-semibold mb-2">Minimum </p>
                    <input
                      value={minimum}
                      onChange={(e) => setMinimum(e.target.value)}
                      placeholder="Enter your ninimum number"
                      className="border-[#C5BFBF] border-2 px-2 p-[12px] w-full outline-none    rounded-md"
                      type="number"
                    />
                  </div>
                  <div className="lg:w-1/2">
                    <p className="font-semibold mb-2">Maximum </p>
                    <input
                      value={maximum}
                      onChange={(e) => setMaximum(e.target.value)}
                      placeholder="Enter your maximum number"
                      className="border-[#C5BFBF] border-2 px-2 p-[12px] w-full outline-none    rounded-md"
                      type="number"
                    />
                  </div>
                </div>
                <div className="flex lg:w-2/4 gap-5">
                  <div className="w-1/2">
                    <p className="font-semibold mb-2">Status</p>
                    <select
                      value={statusValue}
                      onChange={(e) => setStatusValue(e.target.value)}
                      className="border-[#C5BFBF] border-2  px-2 p-[12px] w-full outline-none   rounded-md"
                    >
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    {!update ? (
                      <>
                        <button
                          onClick={() => handelAddMedical()}
                          className="px-[40px] py-[12px] mt-8 w-full  bg-[#1E3767] rounded-[8px] text-white  "
                        >
                          Submit
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => medicalUpdate()}
                          className="px-[40px] py-[12px] mt-8 w-full  bg-[#1E3767] rounded-[8px] text-white  "
                        >
                          update
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!update ? (
          <>
            {/* table  */}
            <div className="overflow-auto">
              <table className="table table-zebra  overflow-x-auto">
                {/* head */}
                <thead className=" border-b-2">
                  <tr className="uppercase bg-[#f2f2f2]">
                    <th>Test name </th>
                    <th className="text-center">Minimum</th>
                    <th className="text-center">Maximum</th>
                    <th className="text-center">Status</th>
                    <th className="text-end pr-8">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allTest?.length > 0 &&
                    allTest.map((data) => (
                      <tr key={data.id}>
                        <td>{data.name}</td>
                        <td className="text-center">{data.min}</td>
                        <td className="text-center">{data.max}</td>
                        <td className="text-center">{data.status}</td>
                        <td className="flex justify-end">
                          <div className="flex items-center gap-7">
                            <button onClick={() => cuntryUpdate()}>
                              <img src={pen_icon} alt="" />
                            </button>
                            {/* <button onClick={() => hadelDelete()}>
                              <img src={delete_icon} alt="" />
                            </button> */}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* pagition  */}
            <div className="flex mt-10 items-center justify-center mb-10">
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
            </div>
          </>
        ) : null}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Medical_Test;
