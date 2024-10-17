import download_img from "../../../public/images/download.svg";
import user_icon from "../../../public/images/user_icon.svg";
import cheart_img from "../../../public/images/dashboard.png";
import pan_img from "../../../public/images/pan.svg";
import check_img from "../../../public/images/check.svg";
import success3_img from "../../../public/images/success_3.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../api/axios";

const Training_Dashboard = () => {
  const [candidate, setCandate] = useState(null);
  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
  }, []);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const logout = () => {
    post("api/logout");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  const datas = [
    {
      id: "23",
      name: "Sadiq",
      date: "12/34/23",
      report: "pass",
      status: "Pass",
      documentation: "Clear",
      accotion: "panding",
    },
    {
      id: "23",
      name: "Sadiq",
      date: "12/34/23",
      report: "pass",
      status: "Pass",
      documentation: "Clear",
      accotion: "panding",
    },
    {
      id: "23",
      name: "Sadiq",
      date: "12/34/23",
      report: "pass",
      status: "Pass",
      documentation: "Clear",
      accotion: "panding",
    },
    {
      id: "23",
      name: "Sadiq",
      date: "12/34/23",
      report: "pass",
      status: "Pass",
      documentation: "Clear",
      accotion: "panding",
    },
    {
      id: "23",
      name: "Sadiq",
      date: "12/34/23",
      report: "pass",
      status: "Pass",
      documentation: "Clear",
      accotion: "panding",
    },
  ];

  return (
    <div className="lg:mt-10 mt-2">
      {/* Dashboard */}
      <div>
        <div className="flex items-center justify-between mt-10 ">
          <h2 className="text-[24px]">Dashboard</h2>
          <button className=" py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md ">
            <div className="flex gap-4">
              <img src={download_img} alt="" />
              <h3>Download PDF</h3>
            </div>
          </button>
        </div>
        {/* Dashboard main contant */}
        <div className="lg:flex gap-5 mt-4">
          <div className="lg:w-2/3">
            <div className=" lg:flex  gap-4">
              <div className="lg:w-1/2 py-10 px-8 rounded-xl bg-[#EEE]">
                <p>Registered Candidates</p>
                <div className="flex items-center justify-between mt-5">
                  <h2 className="text-4xl text-[#1E3767] font-bold ">255</h2>
                  <img src={user_icon} alt="" />
                </div>
              </div>
              <div className="lg:w-1/2 bg-[#EEE] py-10 px-8 rounded-xl lg:mt-0 mt-4">
                <p>Registered Candidates</p>
                <div className="flex items-center justify-between mt-5">
                  <h2 className="text-4xl text-[#1E3767] font-bold ">255</h2>
                  <img src={pan_img} alt="" />
                </div>
              </div>
            </div>
            <div className=" lg:flex  gap-4 mt-5">
              <div className="lg:w-1/2 py-10 px-8 rounded-xl bg-[#EEE]">
                <p>Registered Candidates</p>
                <div className="flex items-center justify-between mt-5">
                  <h2 className="text-4xl text-[#1E3767] font-bold ">255</h2>
                  <img src={check_img} alt="" />
                </div>
              </div>
              <div className="lg:w-1/2 bg-[#EEE] py-10 px-8 rounded-xl lg:mt-0 mt-4">
                <p>Registered Candidates</p>
                <div className="flex items-center justify-between mt-5  ">
                  <h2 className="text-4xl text-[#1E3767] font-bold ">255</h2>
                  <img src={success3_img} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/3 w-full rounded-xl lg:mt-0 mt-4">
            <img
              className="h-[350px] w-full rounded-xl"
              src={cheart_img}
              alt=""
            />
          </div>
        </div>
        {/* All Candidates  */}
        <div className="mt-6">
          <input
            className="bg-[#EEE] outline-none w-full py-2 px-3 rounded-md"
            placeholder="All Candidates"
            type="Email"
          />
          {/* Table */}
          <div className="overflow-x-auto mt-6 mb-10">
            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-[#EEE]">
                <tr className="uppercase">
                  <th>ID</th>
                  <th>Name</th>
                  <th>Register date</th>
                  <th>Medical Test Report</th>
                  <th>Training Status</th>
                  <th>Documentation</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{/* Todo */}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training_Dashboard;
