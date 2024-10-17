import React, { useEffect, useState } from "react";
import logo_img from "../../../public/images/MGES_Logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { post } from "../../api/axios";
import login_img from "../../../public/images/banner.jpg";
import Loading from "../../component/Loading";
import InputError from "../../component/InputError";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
    setName(user_data.name);
  }, []);
  const [data, setData] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      const formData = {
        id: data.id,
        name: name,
        password: password ? password : null,
      };

      console.log(formData);
      setLoading(true);
      setError(null);
      try {
        const res = await post("api/user/profile_update", formData);
        console.log(res);
        if (res?.success) {
          setPassword("");
          setConfirmPassword("");
          toast.success(res.message);
        }
      } catch (error) {
        setLoading(false);
        setError(error.response.data);
        toast.error("Faild to Update");
        console.log("Failed to post/", error?.response?.data);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Password did not match.");
    }
  };

  return (
    <div className="w-full flex justify-center items-center ">
      <div className="max-w-3xl w-full mt-10">
        <h3 className="text-[22px] font-[600] mb-[48px] text-[#202020]">
          Profile Update
        </h3>
        <p className="font-[500] text-[15px] mb-2 text-[#202020]">Name </p>
        <div className="mb-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            className="border-[#C5BFBF] border-2 px-[24px] p-[12px] w-full outline-none   rounded-md"
            type="text"
          />
          <InputError messages={error?.name} className="ml-1 " />
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <p className="font-[500] text-[15px] mb-2 text-[#202020]">
              New Password
            </p>
            <div className="mb-3">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your New password"
                className="border-[#C5BFBF] border-2 px-[24px] p-[12px] w-full outline-none  rounded-md"
                type="password"
              />
              <InputError messages={error?.password} className="ml-1" />
            </div>
          </div>
          <div className="w-full">
            <p className="font-[500] text-[15px] mb-2 text-[#202020]">
              Confirm Password
            </p>
            <div className="mb-3">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Enter your Confirm password"
                className="border-[#C5BFBF] border-2 px-[24px] p-[12px] w-full outline-none  rounded-md"
                type="password"
              />
              <InputError messages={error?.password} className="ml-1" />
            </div>
          </div>
        </div>

        <button
          className={` rounded-md w-full bg-[#1E3767] text-white py-2 font-bold transition-transform active:scale-95 mt-5 ${
            loading ? "opacity-80" : ""
          }`}
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? <Loading /> : "Update"}
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ProfileUpdate;
