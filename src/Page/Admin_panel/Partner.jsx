import user_img from "../../../public/images/user.jpg";
import toast, { Toaster } from "react-hot-toast";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { post } from "../../api/axios";
import Loading from "../../component/Loading";
import { useNavigate } from "react-router-dom";
import FileUplod from "../../component/FileUplod";

const Partner = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [license_file, setLicense_file] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [roleID, setRoleID] = useState();

  const onSubmit = async (data) => {
    console.log(data);
    setRoleID(data?.role_id);
    setLoading(true);
    const payload = { ...data, license_file };
    console.log(payload, "======>28");
    try {
      const res = await post("api/partner/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res?.success) {
        reset();
        navigate("/admin");
        toast.success(res.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("faild to Post");
      console.log("Failed to post/", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };

  console.log(roleID);

  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <h2 className="text-[24px] font-bold mt-8">Partner Registration</h2>
      <div className="flex items-center gap-4 mt-[30px]">
        <h2 className="font-bold  text-[18px]">Partner Type:</h2>
        <select
          {...register("role_id")}
          onChange={(e) => setRoleID(e.target.value)}
          className=" px-2 p-[8px] border-2  rounded-md outline-none"
        >
          <option value="4">Agent</option>
          <option value="2">Training Center</option>
          <option value="3">Medical Center</option>
        </select>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-9 mb-10">
        {/* Input feald */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label>
            <p className="text-[17px] font-[500] mb-2">Organisation Name*</p>
            <input
              className={`px-2 p-[8px] w-full rounded-md outline-none border-2 ${
                errors.name?.message ? " mb-0 " : "mb-2"
              }`}
              type="text"
              name="name"
              placeholder="Enter name"
              {...register("full_name", {
                required: "Name field is required",
              })}
            />
            <p className="mb-4 pl-2 text-red-500 text-[13px]">
              {errors.full_name?.message}
            </p>
          </label>
          <label>
            <p className="text-[17px] font-[500] mb-2">Authorize Person</p>
            <input
              className={`px-2 p-[8px] w-full rounded-md outline-none border-2`}
              type="text"
              name="name"
              placeholder="Enter name"
              {...register("authorize_person")}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <label>
            <p className="text-[17px] font-[500] mb-2">Phone Number*</p>
            <input
              className={`px-2 p-[8px] w-full rounded-md outline-none border-2 ${
                errors.name?.message ? " mb-0 " : "mb-2"
              }`}
              type="number"
              name="name"
              placeholder="Enter number"
              {...register("phone", {
                required: "Number field is required",
                minLength: { value: 11, message: "Min Length 11 " },
              })}
            />
            <p className="mb-4 pl-2 text-red-500 text-[13px]">
              {errors.phone?.message}
            </p>
          </label>
          <label>
            <p className="text-[17px] font-[500] mb-2">Email Address*</p>
            <input
              className={`px-2 p-[8px] w-full rounded-md outline-none border-2 ${
                errors.name?.message ? " mb-0 " : "mb-2"
              }`}
              type="email"
              name="name"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email field is required",
              })}
            />
            <p className="mb-4 pl-2 text-red-500 text-[13px]">
              {errors.email?.message}
            </p>
          </label>
          <label>
            <p className="text-[17px] font-[500] mb-2 ">Password*</p>
            <input
              className={`px-2 p-[8px] w-full rounded-md outline-none border-2 ${
                errors.password?.message ? " mb-0 " : "mb-2"
              }`}
              type="text"
              name="name"
              placeholder="Enter your password"
              {...register("password", {
                required: " Password is required",
              })}
            />
            <p className="mb-4 pl-2 mt-1 text-red-500 text-[13px]">
              {errors.password?.message}
            </p>
          </label>
        </div>

        <div
          className={`${
            roleID === "3" ? "grid grid-cols-1 lg:grid-cols-2 gap-4" : "w-full"
          }`}
        >
          <label>
            <p className="text-[17px] font-[500] mb-2"> Address/Location</p>
            <input
              className={`px-2 mb-6 p-[8px] w-full rounded-md outline-none border-2`}
              type="text"
              name="name"
              placeholder="Enter your address"
              {...register("address")}
            />
          </label>

          {roleID === "3" && (
            <label>
              <p className="text-[17px] font-[500] mb-2">Medical ID</p>
              <input
                className={`px-2 mb-6 p-[8px] w-full rounded-md outline-none border-2`}
                type="text"
                name="name"
                placeholder="Enter your Medical ID"
                {...register("unique_id")}
              />
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <label>
            <p className="text-[17px] font-[500] mb-2">License Number</p>
            <div className="mb-6 flex gap-4">
              <input
                className={`px-2  p-[8px] w-full rounded-md outline-none border-2`}
                type="text"
                name="name"
                placeholder="Enter your account number"
                {...register("license_no")}
              />
            </div>
          </label>
          {/* <label>
          
            <div className="flex items-center gap-4 w-full  rounded-[8px] outline-none border-2">
              <div className="w-[90px]  bg-[#1e3767] rounded-l-[8px]">
              
              </div>
              <h2>{license_file && license_file?.name}</h2>
            </div>
          </label> */}

          <div>
            <p className="text-[17px] font-[500] mb-2">License File</p>
            <div
              className={`flex items-center gap-4  border-2  text-gray-700 font-[500]  w-full  rounded-md outline-none bg-white cursor-pointer`}
            >
              <div className="bg-[#1e3767] rounded-l-[5px]">
                <FileUplod setFile={setLicense_file} />
              </div>
              <h2>{license_file && license_file?.name}</h2>
            </div>
          </div>

          <label>
            <p className="text-[17px] font-[500] mb-2">Trade License Number</p>
            <input
              className={`px-2 mb-6 p-[8px] w-full rounded-md outline-none border-2`}
              type="text"
              name="name"
              placeholder="Enter your account number"
              {...register("trade_license_no")}
            />
          </label>
          <label>
            <p className="text-[17px] font-[500] mb-2">Routing Number</p>
            <input
              className={`px-2 p-[8px] w-full rounded-md outline-none border-2`}
              type="number"
              name="name"
              placeholder="Enter your account number"
              {...register("routing_number")}
            />
          </label>
          <label>
            <p className="text-[17px] font-[500] mb-2">Account Name</p>
            <input
              className={`px-2 mb-6 p-[8px] w-full rounded-md outline-none border-2 `}
              type="text"
              name="name"
              placeholder="Enter your account name"
              {...register("bank_account_name")}
            />
          </label>
          <label>
            <p className="text-[17px] font-[500] mb-2">Account Number</p>
            <input
              className={`px-2 mb-6 p-[8px] w-full rounded-md outline-none border-2`}
              type="number"
              name="name"
              placeholder="Enter your account number"
              {...register("bank_account_number")}
            />
          </label>
          <label>
            <p className="text-[17px] font-[500] mb-2">Bank Name</p>
            <input
              className={`px-2 mb-6 p-[8px] w-full rounded-md outline-none border-2`}
              type="text"
              name="name"
              placeholder="Enter your name"
              {...register("bank_name")}
            />
          </label>
          <label>
            <p className="text-[17px] font-[500] mb-2">Branch Name</p>
            <input
              className={`px-2 mb-6 p-[8px] w-full rounded-md outline-none border-2 `}
              type="text"
              name="name"
              placeholder="Enter your name"
              {...register("branch_name")}
            />
          </label>
        </div>
        <div className="flex justify-end  ">
          {/* <input
            className=" px-[40px] py-[12px] text-[18px] bg-[#FFC11D] cursor-pointer text-white font-bold rounded-md"
            type="submit"
            value="Submit"
          /> */}
          <button
            className={` px-[40px] py-[12px] text-[18px] bg-[#1E3767] cursor-pointer text-white font-bold rounded-md ${
              loading ? "opacity-80" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? <Loading /> : "Submit"}
          </button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Partner;
