import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SelectField from "../../component/SelectField";
import { post } from "../../api/axios";
import pen_icon from "../../../public/images/pen_icon.svg";
import InputField from "../../component/InputField";

const QuotaSet = () => {
  const [loading, setLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [paginations, setPaginations] = useState({
  //   per_page: "",
  //   total: "",
  // });
  const [country, setCountry] = useState("");
  const [countryName, setCountryName] = useState("");
  const [agents, setAgents] = useState([]);
  const [agentName, setagentName] = useState("");
  const [designationName, setDesignationName] = useState("");
  const [designation, setDesignation] = useState([]);
  const [quotaNumber, setQuotaNumber] = useState("");
  const [quota, setAllQuota] = useState();

  // Call on tha all function
  useEffect(() => {
    fetchCountry();
    fetchAgent();
    fetchDesignation();
    fetchAllQuota();
  }, []);

  const handelQuotaSet = async () => {
    const payload = {
      country_id: countryName,
      designation_id: designationName,
      agent: agentName,
      quota: quotaNumber,
    };
    console.log(payload);

    setLoading(true);
    try {
      const res = await post("api/agent/quota_create", payload);
      console.log(res);
      if (res.success) {
        setCountryName("");
        setDesignationName("");
        setagentName("");
        setQuotaNumber("");
        setLoading(false);
        fetchAllQuota();
        toast.success("Quota Set successfully!");
      }
    } catch (error) {
      setLoading(false);
      // toast.error("faild to Post");
      // console.log("Failed to post/", error?.response.error);
    } finally {
      setLoading(false);
    }
  };

  const QuotaUpdate = () => {
    setUpdate(!update);
  };

  const handelQuotaUpdate = () => {
    setUpdate(!update);
  };

  // Get All Country name
  const fetchCountry = async () => {
    try {
      const response = await post(`api/country/all`);
      console.log(response);
      setCountry(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  // Get all Agent
  const fetchAgent = async () => {
    setLoading(true);
    try {
      const res = await post(`/api/partner/get_partners?page=${currentPage}`, {
        role_id: 4,
        pg: "a",
      });
      console.log(res);
      if (res) {
        setAgents(res?.data?.data);
        // setPaginations({
        //   per_page: res.data_p.per_page,
        //   total: res.data_p.total,
        // });
      }
    } catch (error) {
      setLoading(false);
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get all  Descigation name
  const fetchDesignation = async () => {
    try {
      const response = await post(`api/designation/all`);
      console.log(response);
      setDesignation(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  // Get all Quota
  const fetchAllQuota = async () => {
    try {
      const response = await post(`api/agent/quota_all`);
      console.log(response);
      setAllQuota(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  return (
    <div className="lg:mt-10 mt-2 ">
      <div>
        <div>
          <h2 className="font-bold text-[24px] ">
            {!update ? "Quota Set" : "Quota Update"}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mt-[20px] mb-[20px]">
            <SelectField
              title="Country"
              value={countryName}
              setValue={setCountryName}
              options={country}
            />
            <SelectField
              title="Agent"
              value={agentName}
              setValue={setagentName}
              options={agents}
            />
            <SelectField
              title="Designation"
              value={designationName}
              setValue={setDesignationName}
              options={designation}
            />
            <InputField
              title="Quota Set"
              value={quotaNumber}
              setValue={setQuotaNumber}
              placeholder="Enter Quota Number"
            />
            <div className="">
              {!update ? (
                <>
                  <button
                    onClick={() => handelQuotaSet()}
                    className="px-[40px] py-[15px] mt-8 w-full  bg-[#1E3767] rounded-[8px] text-white  "
                  >
                    Submit
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handelQuotaUpdate()}
                    className="px-[40px] py-[15px] mt-8 w-full  bg-[#1E3767] rounded-[8px] text-white  "
                  >
                    update
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {!update ? (
          <>
            {/* table  */}
            <div className="overflow-auto mt-[20px]">
              <table className="table table-zebra  overflow-x-auto">
                {/* head */}
                <thead className=" border-b-2">
                  <tr className="uppercase bg-[#f2f2f2]">
                    <th>Country Name </th>
                    <th className="text-center">Agetn Name</th>
                    <th className="text-center">Designation Name</th>
                    <th className="text-center">Total Quota</th>
                    <th className="text-center">Used Quota</th>
                    {/* <th className="text-end pr-8">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {quota?.length > 0 &&
                    quota.map((data) => (
                      <tr key={data.id}>
                        <td>{data?.country?.name}</td>
                        <td className="text-center">{data?.agent?.name}</td>
                        <td className="text-center">
                          {data?.designation?.name}
                        </td>
                        <td className="text-center">{data?.quota}</td>
                        <td className="text-center">{data?.quota_used}</td>
                        {/* <td className="flex justify-end">
                          <div className="flex items-center gap-7">
                            <button onClick={() => QuotaUpdate()}>
                              <img src={pen_icon} alt="" />
                            </button>
                          </div>
                        </td> */}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
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
          </>
        ) : null}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default QuotaSet;
