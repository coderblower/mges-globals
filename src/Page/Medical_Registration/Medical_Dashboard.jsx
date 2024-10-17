import qr_code from "../../../public/images/Qr_code.svg";
import download_img from "../../../public/images/download.svg";
import user_icon from "../../../public/images/user_icon.svg";
import cheart_img from "../../../public/images/dashboard.png";
import pan_img from "../../../public/images/pan.svg";
import check_img from "../../../public/images/check.svg";
import success3_img from "../../../public/images/success_3.svg";
import { useContext, useEffect, useState } from "react";
import { post } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Medical_Dashboard = () => {
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

  const [count, setCount] = useState({});
  useEffect(() => {
    post(`/api/candidate_medical_test/count`)
      .then((res) => {
        console.log(res);
        setCount(res);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(data);

  return (
    <div className="lg:mt-10 mt-2">
      {/* Dashboard */}
      <div>
        <div className="flex items-center justify-between mt-[32px]  mb-[16px]">
          <h2 className="text-[24px] font-[500] text-[#4D4D4D]">Dashboard</h2>
          <button className=" py-[12px] px-[36px] bg-[#1E3767] text-white  rounded-md ">
            <div className="flex gap-4">
              <img src={download_img} alt="" />
              <h3 className="font-[600]">Download PDF</h3>
            </div>
          </button>
        </div>
        {/* Dashboard main contant */}
        <div className="lg:flex gap-[28px] mt-[30px] lg:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] w-full">
            <div className="py-[34px] px-[34px]  rounded-[12px] bg-[#EEE]">
              <p className="font-[500]">Total Enrolled</p>
              <div className="flex items-center justify-between mt-[22px]">
                <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                  {count.enrolled}
                </h2>
                <img src={user_icon} alt="" />
              </div>
            </div>
            <div className="py-[34px] px-[34px] lg:mt-0  rounded-[12px] bg-[#EEE]">
              <p className="font-[500]">Submited Report</p>
              <div className="flex items-center justify-between mt-[22px]">
                <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                  {count.submitted}
                </h2>
                <img src={pan_img} alt="" />
              </div>
            </div>
            <div className="py-[34px] px-[34px] rounded-[12px] bg-[#EEE]">
              <p className="font-[500]">Fit Candidates</p>
              <div className="flex items-center justify-between mt-[22px]">
                <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                  {count.fit}
                </h2>
                <img src={check_img} alt="" />
              </div>
            </div>
            <div className="py-[34px] px-[34px] lg:mt-0  rounded-[12px] bg-[#EEE]">
              <p className="font-[500]">Unfit Candidates</p>
              <div className="flex items-center justify-between mt-[22px]  ">
                <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                  {count.unfit}
                </h2>
                <img src={success3_img} alt="" />
              </div>
            </div>
            <div className="py-[34px] px-[34px] lg:mt-0 rounded-[12px] bg-[#EEE]">
              <p className="font-[500]">Repeated Candidates</p>
              <div className="flex items-center justify-between mt-[22px]">
                <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                  {count.repeat}
                </h2>
                <img src={pan_img} alt="" />
              </div>
            </div>
            <div className="py-[34px] px-[34px] lg:mt-0  rounded-[12px] bg-[#EEE]">
              <p className="font-[500]">Pending Candidates</p>
              <div className="flex items-center justify-between mt-[22px]">
                <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                  {count.pending}
                </h2>
                <img src={pan_img} alt="" />
              </div>
            </div>
            <div className="py-[34px] px-[34px] lg:mt-0  rounded-[12px] bg-[#EEE]">
              <p className="font-[500]"> Quota</p>
              <div className="flex items-center justify-between mt-[22px]">
                <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                  {count?.partner?.quota_used} /
                  {count?.partner?.quota >= 1000000 ? (
                    <small>Infinite</small>
                  ) : (
                    count?.partner?.quota
                  )}
                </h2>
                <img src={pan_img} alt="" />
              </div>
            </div>
          </div>

          {/* <div className="lg:w-2/3">
            <div className=" lg:flex  gap-[28px]">
              <div className="lg:w-1/2 py-[34px] px-[34px]  rounded-[12px] bg-[#EEE]">
                <p className="font-[500]">Total Enrolled</p>
                <div className="flex items-center justify-between mt-[22px]">
                  <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                    {count.enrolled}
                  </h2>
                  <img src={user_icon} alt="" />
                </div>
              </div>
              <div className="lg:w-1/2 py-[34px] px-[34px] lg:mt-0 mt-[28px] rounded-[12px] bg-[#EEE]">
                <p className="font-[500]">Submited Report</p>
                <div className="flex items-center justify-between mt-[22px]">
                  <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                    {count.submitted}
                  </h2>
                  <img src={pan_img} alt="" />
                </div>
              </div>
              <div className="lg:w-1/2 py-[34px] px-[34px] lg:mt-0 mt-[28px] rounded-[12px] bg-[#EEE]">
                <p className="font-[500]">Submited Report</p>
                <div className="flex items-center justify-between mt-[22px]">
                  <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                    {count.submitted}
                  </h2>
                  <img src={pan_img} alt="" />
                </div>
              </div>
            </div>

            <div className=" lg:flex  gap-[28px] mt-[28px]">
              <div className="lg:w-1/2 py-[34px] px-[34px] rounded-[12px] bg-[#EEE]">
                <p className="font-[500]">Fit Candidates</p>
                <div className="flex items-center justify-between mt-[22px]">
                  <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                    {count.fit}
                  </h2>
                  <img src={check_img} alt="" />
                </div>
              </div>
              <div className="lg:w-1/2 py-[34px] px-[34px] lg:mt-0 mt-[28px] rounded-[12px] bg-[#EEE]">
                <p className="font-[500]">Unfit Candidates</p>
                <div className="flex items-center justify-between mt-[22px]  ">
                  <h2 className="text-[48px] text-[#1E3767] font-[600] ">
                    {count.unfit}
                  </h2>
                  <img src={success3_img} alt="" />
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="lg:w-1/3 w-full rounded-xl lg:mt-0 mt-[28px]">
            <img
              className="h-[400px] w-full rounded-xl"
              src={cheart_img}
              alt=""
            />
          </div> */}
        </div>
        {/* All Candidates  */}
        <div className="mt-[36px]">
          <div className="py-[12px] px-[29px]  bg-[#EEE] rounded-[12px] flex items-center justify-between ">
            <h2 className="text-[#4D4D4D] font-[600] "> All Candidates</h2>
            <div className="flex gap-[11px]">
              <h2 className="text-[#4D4D4D] font-[600] ">Scan for details:</h2>
              <img src={qr_code} alt="" />
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto mt-6 mb-10">
            <table className="table table-zebra">
              {/* head */}
              <thead className="bg-[#EEE]">
                <tr className="uppercase">
                  <th className="text-center">ID</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Register date</th>
                  <th className="text-center">Medical Test Report</th>
                  <th className="text-center">Training Status</th>
                  <th className="text-center">Documentation</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="text-center">245</th>
                  <th className="text-center">Rakib</th>
                  <th className="text-center">12/09/23</th>
                  <th className="text-center">Pass</th>
                  <th className="text-center">Pass</th>
                  <th className="text-center">Clear</th>
                  <th className="text-center">Ready for Visa Process</th>
                </tr>
                <tr>
                  <th className="text-center">245</th>
                  <th className="text-center">Rakib</th>
                  <th className="text-center">12/09/23</th>
                  <th className="text-center">Pass</th>
                  <th className="text-center">Pass</th>
                  <th className="text-center">Clear</th>
                  <th className="text-center">Ready for Visa Process</th>
                </tr>
                <tr>
                  <th className="text-center">245</th>
                  <th className="text-center">Rakib</th>
                  <th className="text-center">12/09/23</th>
                  <th className="text-center">Pass</th>
                  <th className="text-center">Pass</th>
                  <th className="text-center">Clear</th>
                  <th className="text-center">Ready for Visa Process</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medical_Dashboard;
