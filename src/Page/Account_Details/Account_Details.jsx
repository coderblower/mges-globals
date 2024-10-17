import React, { useEffect, useState } from "react";
import logo_img from "../../../public/images/logo.png";
import login_img from "../../../public/images/login.png";

const Account_Details = () => {
  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
  }, []);
  const [data, setData] = useState(null);
  console.log(data);
  return (
    <div className="w-full flex">
      <div className="w-1/2  min-h-screen  bg-[url('./public/images/login.png')] bg-no-repeat bg-cover">
        <div className="text-white p-10">
          <img className=" w-[120px]" src={logo_img} alt="" />
          <h2 className="text-[36px] mt-5 font-[700]">
            Welcome to Versatilo HR Solution
          </h2>
          <p className="text-[20px] mt-2 font-[500]">
            We provide services all over United <br /> Arab Emirates
          </p>
        </div>
      </div>
      <div className="w-1/2  min-h-screen px-20 flex items-center">
        <div className="w-full  lg:px-24">
          <h3 className="text-2xl font-semibold mb-3">Account details</h3>
          <p className="mb-3">
            <span className="font-bold ">Name:</span>{" "}
            {data?.name || "Not Found"}
          </p>
          <p className="mb-3">
            <span className="font-bold">Email:</span>{" "}
            {data?.email || "Not Found"}
          </p>
          <p className="mb-3">
            <span className="font-bold">Phone No:</span>{" "}
            {data?.phone || "Not Found"}
          </p>

          <button className=" mt-5 rounded-md w-full bg-[#FFC11D] text-white py-2 font-bold">
            Registration
          </button>
          <button className=" mt-4 rounded-md w-full bg-[#FFC11D] text-white py-2 font-bold">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account_Details;
