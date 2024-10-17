import user_img from "../../../public/images/Avater.png";
import download_img from "../../../public/images/download.svg";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import React from "react";
const API_URL = import.meta.env.VITE_BASE_URL;

const Hiring_dashboard = () => {
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
  }, []);
  const [data, setData] = useState(null);
  // console.log(data);


  return (
    <div className="lg:mt-10 mt-2">
      {/* User profile */}
      <div className="flex items-center justify-between mt-[24px] ">
        <h2 className="text-[24px] text-[#4D4D4D]">Dashboard</h2>
      </div>
      {/* Dashboard */}
      <div className="bg-[#EEE] mt-8 rounded-md lg:flex lg:px-[46px] px-[10px] py-[27px] justify-between">
        <h1>Hiring country Dasboard</h1>
      </div>
    </div>
  );
};

export default Hiring_dashboard;
