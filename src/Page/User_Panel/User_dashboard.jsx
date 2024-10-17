import user_img from "../../../public/images/Avater.png";
import download_img from "../../../public/images/download.svg";
import { useEffect, useState } from "react";
import { post } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import React from "react";
const API_URL = import.meta.env.VITE_BASE_URL;

const User_dashboard = () => {
  const [loading, setLoading] = useState("");

  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
  }, []);
  const [data, setData] = useState(null);
  // console.log(data);

  useEffect(() => {
    setLoading(true);
    post(`/api/candidate/get_candidate`)
      .then((res) => {
        setCandate(res.data?.candidate);
        window.localStorage.setItem(
          "candidate",
          JSON.stringify(res.data?.candidate)
        );
        const candidate = window.localStorage.getItem("candidate");
        const newCandidate = JSON.parse(candidate);
        setCandate(newCandidate);
        const address = JSON.parse(newCandidate?.address);
        setAddress(address);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const [candidate, setCandate] = useState(null);
  const [address, setAddress] = useState(null);

  const downloadImg = () => {
    const id = data?.candidate?.id;
    const fromData = { id: id };
    try {
      const res = post("api/candidate/candidate_qr_save", fromData);

      if (res) {
        console.log("====================>", res);
      } else {
        console.log("Failed");
      }
    } catch (error) {
      console.error("Failed to post/", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = () => {
    saveAs(`${API_URL}/${candidate?.qr_code}`, "image.jpg"); // Put your image URL here.
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* User profile */}
      <div className="flex items-center justify-between mt-[24px] ">
        <h2 className="text-[24px] text-[#4D4D4D]">Dashboard</h2>
        <button className=" py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md ">
          <div className="flex gap-4">
            <img src={download_img} alt="" />
            <h3>Download CV</h3>
          </div>
        </button>
      </div>
      {/* Dashboard */}
      <div className="bg-[#EEE] mt-8 rounded-md lg:flex lg:px-[46px] px-[10px] py-[27px] justify-between">
        <div className=" flex flex-col justify-center items-center">
          <div className="h-[150px] w-[150px] rounded-full overflow-hidden ">
            <img
              className="w-full h-full"
              src={
                candidate?.photo ? `${API_URL}/${candidate?.photo}` : user_img
              }
              alt=""
            />
          </div>
          <h2 className="mt-3 font-[600] text-center  mb-3 text-[24px] text-[#4D4D4D]">
            {data?.name}
          </h2>
        </div>

        <div className="border-2 border-[#545454] "></div>

        <div className="">
          <h2 className="font-[600] text-[18px] text-[#202020] mb-[22px] mt-5">
            Basic Info
          </h2>
          <div className="lg:flex justify-between gap-4 mb-[21px]">
            <div>
              <p className="text-[#4D4D4D] mb-[25px]">NAME: {data?.name}</p>
              <p className="text-[#4D4D4D]">PHONE: {data?.phone}</p>
            </div>
            <div className="">
              <p className="text-[#4D4D4D] mb-[25px]">EMAIL: {data?.email}</p>
              <h2 className="mt-3">
                Registration date:{" "}
                <small>{data?.created_at.slice(0, 10)}</small>
              </h2>
            </div>
          </div>

          <div className="border-2  mb-[15px] top-0 left-0 border-[#545454] rounded-lg "></div>

          <h2 className="text-[18px] font-[600] mb-2">Present Address</h2>
          <p>
            {`
              ${address?.address},
            ${address?.city}, ${address?.country}, 
          `}
          </p>
          <p> {`${address?.post_code}, ${address?.post_office} `}</p>
        </div>

        <div className="border-2  mb-[15px] top-0 left-0 border-[#545454] rounded-lg mt-[15px] lg:hidden"></div>

        <div className="text-center">
          <h2>
            Download QR For <br /> More Details
          </h2>
          <div className="flex justify-center mt-2">
            {candidate?.qr_code ? (
              <img
                className="w-[150px]"
                src={`${API_URL}/${candidate?.qr_code}`}
                alt=""
              />
            ) : (
              <h1 className="my-8 font-bold">Not Found</h1>
            )}
          </div>

          <button
            onClick={downloadImg}
            download
            className="bg-[#1E3767] py-2 px-8 rounded-md text-white mt-6 font-semibold"
          >
            Download QR
          </button>
        </div>
      </div>

      <div className="mt-[20px] bg-[#EEE] font-[600] w-full py-[10px] px-[12px] rounded-md">
        Medical Status
      </div>
      <div className="flex items-center justify-between my-[14px] font-[600] bg-[#EEE] w-full py-[6px] px-[12px] rounded-md">
        <h2 className="font-[600]">
          Selected Medical Center:
          <span className="font-[500] text-[#4D4D4D]">
            Uttara Medical Center, Uttara, Dhaka-1218
          </span>
        </h2>
        <button className=" text-white text-[14px] rounded-[8px] bg-[#1E3767] px-[24px] py-[6px]">
          Update
        </button>
      </div>
      {/* table  */}
      <div className="overflow-x-auto">
        <table className="table ">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase  bg-[#EEE] border-b-2 border-gray-500">
              <th className="rounded rounded-tl-md">ID</th>
              <th>Payment Status</th>
              <th>Test Report</th>
              <th>Further Training</th>
              <th className="rounded rounded-tr-md">Status</th>
            </tr>
          </thead>
          <tbody>{/* TOdo */}</tbody>
        </table>
      </div>
      <div className="flex items-center justify-between my-[14px] font-[600] bg-[#EEE] w-full py-[6px] px-[15px] rounded-md">
        <div className="">Training Status</div>
        <button className=" text-white text-[14px] rounded-[8px] bg-[#1E3767] px-[24px] py-[6px]">
          Update
        </button>
      </div>

      <div className="my-3 bg-[#EEE] w-full py-3 px-4 rounded-md flex items-center justify-between">
        <h1 className="font-[600]">
          Mirpur Training Center:{" "}
          <span className="font-[500] text-[#4D4D4D]">
            Mirpur-12, Dhaka-1216
          </span>
        </h1>
        <h3 className="font-[600]">
          Selected Skill:{" "}
          <small className="font-500] text-[#4D4D4D]">
            Brigadier (Foreman){" "}
          </small>
        </h3>
      </div>
      {/* table  */}
      <div className="overflow-x-auto mb-10">
        <table className="table ">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase bg-[#EEE] border-b-2 border-gray-500">
              <th className="rounded rounded-tl-md">ID</th>
              <th>Skilled</th>
              <th>Crash Training</th>
              <th>Payment Status</th>
              <th>Exam Result</th>
              <th>Further Training</th>
              <th className="rounded rounded-tr-md">Status</th>
            </tr>
          </thead>
          <tbody>{/* TODO */}</tbody>
        </table>
      </div>
    </div>
  );
};

export default User_dashboard;
