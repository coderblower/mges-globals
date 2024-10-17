import download_img from "../../../public/images/download.svg";
import user_icon from "../../../public/images/user_icon.svg";
import cheart_img from "../../../public/images/dashboard.png";
import pan_img from "../../../public/images/pan.svg";
import check_img from "../../../public/images/check.svg";
import success3_img from "../../../public/images/success_3.svg";
import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Agent_Dashboard = () => {
  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
  }, []);
  const [data, setData] = useState(null);
  const [count, setCount] = useState(0);
  const [candidate, setCandidate] = useState(0);

  const navigate = useNavigate();
  const logout = () => {
    post("api/logout");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    post(`api/candidate/candidate_by_creator_count`)
      .then((res) => {
        setCandidate(res.count);
        console.log(res.count);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    post(`/api/candidate_medical_test/count`)
      .then((res) => {
        console.log(res);
        setCount(res.count);
      })
      .catch((err) => console.log(err));
  }, []);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
            <div className=" w-full py-10 px-8 rounded-xl bg-[#EEE]">
              <p>Registered Candidates</p>
              <div className="flex items-center justify-between mt-5">
                <h2 className="text-4xl text-[#1E3767] font-bold ">
                  {candidate || 0}
                </h2>
                <img src={user_icon} alt="" />
              </div>
            </div>
            <div className=" w-full py-10 px-8 rounded-xl bg-[#EEE]">
              <p>Fit Candidates</p>
              <div className="flex items-center justify-between mt-5">
                <h2 className="text-4xl text-[#1E3767] font-bold ">
                  {count?.fit || 0}
                </h2>
                <img src={user_icon} alt="" />
              </div>
            </div>
            <div className=" w-full py-10 px-8 rounded-xl bg-[#EEE]">
              <p>Unfit Candidates</p>
              <div className="flex items-center justify-between mt-5">
                <h2 className="text-4xl text-[#1E3767] font-bold ">
                  {count?.unfit || 0}
                </h2>
                <img src={user_icon} alt="" />
              </div>
            </div>
            <div className=" w-full py-10 px-8 rounded-xl bg-[#EEE]">
              <p>Repeated Candidates</p>
              <div className="flex items-center justify-between mt-5">
                <h2 className="text-4xl text-[#1E3767] font-bold ">
                  {count?.repeat || 0}
                </h2>
                <img src={user_icon} alt="" />
              </div>
            </div>
            <div className=" w-full py-10 px-8 rounded-xl bg-[#EEE]">
              <p>Pending Candidates</p>
              <div className="flex items-center justify-between mt-5">
                <h2 className="text-4xl text-[#1E3767] font-bold ">
                  {count?.pending || 0}
                </h2>
                <img src={user_icon} alt="" />
              </div>
            </div>
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

export default Agent_Dashboard;
