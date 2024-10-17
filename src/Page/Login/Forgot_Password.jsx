import logo_img from "../../../public/images/MGES_Logo.png";
import { Link, useNavigate } from "react-router-dom";
import login_img from "../../../public/images/banner.jpg";
import Loading from "../../component/Loading";
import InputError from "../../component/InputError";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Forgot_Password = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newPass, setNewPassword] = useState("");
  const [confirmPass, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
  }, []);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: email,
      password: password,
    };

    console.log(formData);
    setLoading(true);
    setError(null);
    try {
      const res = await post("api/login", formData);
      console.log(res);
      if (res?.authorization?.token) {
        setError(null);
        window.localStorage.setItem("token", res?.authorization?.token);
        window.localStorage.setItem("user", JSON.stringify(res?.user));
        toast.success(res.message);
        setNewPassword("");
        setConfirmPassword("");
        if (res?.user.role?.roleName === "Admin") {
          navigate("/admin");
        } else if (res?.user.role?.roleName === "Training Center") {
          navigate("/training");
        } else if (res?.user.role?.roleName === "Medical Center") {
          navigate("/medical");
        } else if (res?.user.role?.roleName === "Agent") {
          navigate("/agent_panel");
        } else if (res?.user.role?.roleName === "User") {
          console.log(res?.user?.candidate, "========>");
          if (
            res?.user?.candidate?.gender === null &&
            res?.user?.candidate?.full_name === null &&
            res?.user?.candidate?.father_name === null &&
            res?.user?.candidate?.mother_name === null &&
            res?.user?.candidate?.nid === null &&
            res?.user?.candidate?.birth_date === null
          ) {
            // navigate("/user_panel");
            navigate("/user_registration");
          } else {
            // navigate("/user_registration");
            navigate("/user_panel");
          }
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      toast.error("Faild to Login");
      console.log("Failed to post/", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };
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
      <div className="lg:w-1/2  lg:min-h-screen lg:px-20 px-[8px] lg:py-0 py-14 flex items-center">
        <div className="w-full">
          <h3 className="text-[32px] font-[600] mb-[48px] text-[#202020] ">
            Reset Password
          </h3>
          <p className="font-[500] text-[20px] mb-2 text-[#202020]">
            Enter New Password{" "}
          </p>
          <input
            value={newPass}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="border-[#C5BFBF] border-2 px-[24px] p-[12px] w-full outline-none  mb-6 rounded-md"
            type="password"
          />
          <InputError messages={error?.email} className="ml-1" />
          <br />
          <p className="font-[500] text-[20px] mb-2 text-[#202020]">
            Confirm Password{" "}
          </p>
          <input
            value={confirmPass}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your confirm password"
            className="border-[#C5BFBF] border-2 px-[24px] p-[12px] w-full  mb-3 outline-none rounded-md"
            type="password"
          />
          <InputError messages={error?.password} className="ml-1" />
          <br />
          <button
            className={`mt-8 rounded-md w-full bg-[#1E3767] text-white py-2 font-bold ${
              loading ? "opacity-80" : ""
            }`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <Loading /> : "Reset Password"}
          </button>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Forgot_Password;
