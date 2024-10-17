import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";
import schen from "../../../public/images/schren.svg";
import { NavLink } from "react-router-dom";

const User_Details = () => {
  return (
    <div className="lg:mt-10 mt-2 ">
      {/* User profile */}
      <div className="flex items-center justify-between">
        <div className="lg:hidden">
          <img src={menu_img} alt="" />
        </div>
        <div className="lg:block hidden">
          <div className=" flex items-center justify-between bg-[#EEE] px-5 p-[12px] py-2 rounded-[30px] w-[420px] text-black ">
            <input
              className="bg-[#EEE] outline-none"
              placeholder="Enter your email"
              type="Email"
            />
            <img src={search} alt="" />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <img src={user_img} alt="" />
          <h1>John Smith</h1>
          <img src={bottom_arow} alt="" />
        </div>
      </div>
      {/* user details */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold">User Details</h2>
        <p className="font-semibold">Please scan QR Code for the details</p>
        <div className="flex iteems-center gap-6 mt-2">
          <p>
            ID:
            <small>323</small>
          </p>
          <p>
            Name:
            <small> Sadiqur Rahaman</small>
          </p>
        </div>
      </div>
      {/* Schen  */}
      <div className="flex items-center justify-center lg:mt-14 mt-10">
        <div className="text-center">
          <img src={schen} alt="" />
          <NavLink to="/medical/user_details_1">
            <button className="bg-[#FFC11D] py-2 px-14 rounded-md text-white mt-10">
              Scan
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default User_Details;
