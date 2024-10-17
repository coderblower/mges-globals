import React, { useState } from "react";
import logo_img from "../../../public/images/MGES_Logo.png";
import login_img from "../../../public/images/banner.jpg";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../api/axios";
import Loading from "../../component/Loading";
import InputError from "../../component/InputError";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: fullName,
      email: email,
      phone: phoneNumber,
      password: password,
    };

    console.log(formData);
    setLoading(true);
    setError(null);
    try {
      const res = await post("api/user/create", formData);
      console.log(res);
      if (res?.success) {
        setError(null);
        toast.success(res.message);
        setFullName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      toast.error("Faild to Register User");
      console.log("Failed to post/", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  console.log(error);

  return (
    <div className="w-full lg:flex">
      <div
        className="lg:w-1/2  lg:min-h-screen   bg-no-repeat bg-cover "
        style={{
          backgroundImage: ` linear-gradient(0deg, rgb(0 0 0 / 54%) 0px, rgb(0 0 0 / 49%) 38%, transparent), url(${login_img})`,
        }}
      >
        <div className="lg:p-10 p-[10px] lg:py-[40px] py-[50px] text-white text-center lg:text-left">
          <div className="lg:block flex justify-center">
            <img className=" w-[160px]" src={logo_img} alt="" />
          </div>
          <h2 className="text-[30px] mt-5 font-[700]">
            MGES- Migration governance Eco-System
          </h2>
          <p className="text-[20px] mt-2 font-[500]">
            HR Recruitment for TSM Energy
          </p>
          <p className="text-[20px]  font-[500]">By Versatilo HR Bangladesh</p>
          <p className="text-[18px]  font-[500]">@maestrosoft</p>
        </div>
      </div>
      <div className="lg:w-1/2  min-h-screen lg:px-20 px-[8px] flex items-center py-16">
        <div className="w-full">
          <h3 className="text-[32px] font-[600] mb-[36px] text-[#202020]">
            Create your account
          </h3>
          <div className="mb-6">
            <p className="font-[500] text-[18px] mb-2 text-[#202020]">
              Full Name{" "}
            </p>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your name"
              className="border-[#C5BFBF] border-2 px-[24px] p-[8px] w-full   rounded-md outline-none"
              type="name"
            />
            <InputError messages={error?.name} className="ml-1 mt-1" />
          </div>

          <div className="mb-6">
            <p className="font-[500] text-[18px] mb-2 text-[#202020]">Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-[#C5BFBF] border-2 px-[24px] p-[8px] w-full   rounded-md outline-none"
              type="Email"
            />
            <InputError messages={error?.email} className="ml-1 mt-1" />
          </div>

          <div className="mb-6">
            <p className="font-[500] text-[18px] mb-2 text-[#202020]">
              Phone number{" "}
            </p>
            <input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your number"
              className="border-[#C5BFBF] border-2 px-[24px] p-[8px] w-full rounded-md outline-none"
              type="number"
            />
            <InputError messages={error?.phone} className="ml-1 mt-1" />
          </div>

          <div className="mb-3">
            <p className="font-[500] text-[18px] mb-2 text-[#202020]">
              Password{" "}
            </p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-[#C5BFBF] border-2 px-[24px] p-[8px] w-full   rounded-md outline-none"
              type="password"
            />
            <small>Must be at least 8 characters</small>
            <InputError messages={error?.phone} className="ml-1 " />
          </div>

          <div className="mb-6">
            <p className="font-[500] text-[18px] mb-2 text-[#202020]">
              Confirm Password{" "}
            </p>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-[#C5BFBF] border-2 px-[24px] p-[8px] w-full  rounded-md outline-none"
              type="password"
            />
            <InputError messages={error?.password} className="ml-1" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <input type="checkbox" name="" id="" />
              <h2>
                I agree to all
                <a className="underline font-bold ml-[3px]" href="#">
                  Terms & Conditions
                </a>
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-8 rounded-md w-full bg-[#1E3767] text-white py-2 font-bold ${
              loading ? "opacity-80" : ""
            }`}
          >
            {loading ? <Loading /> : "Create Account"}
          </button>
          <p className=" font-[400] lg:text-[18px] mt-2">
            Already have an account?
            <span className="text-[#1E3767] font-[700]">
              <Link to="/login"> Candidate Sign In</Link>
            </span>
          </p>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Register;
