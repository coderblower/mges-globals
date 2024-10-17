import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";

const User_Details_1 = () => {
  return (
    <div className="lg:mt-10 mt-2 ">
      {/* User profile */}
      <div className="flex items-center lg:justify-end justify-between">
        <div className="lg:hidden">
          <img src={menu_img} alt="" />
        </div>
        <div className="flex gap-3 items-center">
          <img src={user_img} alt="" />
          <h1>John Smith</h1>
          <img src={bottom_arow} alt="" />
        </div>
      </div>
      {/* user details */}
      <h1 className="text-2xl font-bold mt-10 mb-5">User Details</h1>
      {/* user Personal */}
      <p>Personal Information</p>
      <div className="border border-black rounded-md p-8 mt-5">
        <div className="grid lg:grid-cols-4  grid-cols-1 gap-4 ">
          <div>
            <h2 className="text-[18px] font-semibold">Name</h2>
            <p>Rakib Hossain</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Phone</h2>
            <p>01876543892</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Father’s Name</h2>
            <p>Ismail Hossain</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Mother’s Name</h2>
            <p>Halima Aktar</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4   grid-cols-1 gap-4 mt-6">
          <div>
            <h2 className="text-[18px] font-semibold ">Date of Birth</h2>
            <p>24/04/1999</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">NID</h2>
            <p>01876543892</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">NID</h2>
            <p>Ismail </p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Marital Status</h2>
            <p>Halima Aktar</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4  grid-cols-1 gap-4  mt-6">
          <div>
            <h2 className="text-[18px] font-semibold">Name</h2>
            <p>Rakib Hossain</p>
          </div>
        </div>
      </div>
      {/* user Address */}
      <p className="mt-10">Address</p>
      <div className="border border-black rounded-md p-8 mt-5">
        <div>
          <h2 className="text-[18px] font-semibold">Present Address</h2>
          <p>House No:19, Road: 14, Block-B, Mirpur 14, Dhaka-1216</p>
        </div>
        <div className="mt-6">
          <h2 className="text-[18px] font-semibold">Permanent Address</h2>
          <p>House:12, Road:01, Fatheabad, Chakbazar, Chattogram 4331</p>
        </div>
      </div>
      {/* user Education */}
      <p className="mt-10">Education</p>
      <div className="border border-black rounded-md p-8 mt-5">
        <h2 className="text-[18px] font-semibold mb-2">Academic-1</h2>
        <div className="grid lg:grid-cols-4  grid-cols-1 gap-4 ">
          <div>
            <h2 className="text-[18px] font-semibold">Name</h2>
            <p>Rakib Hossain</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Phone</h2>
            <p>01876543892</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Father’s Name</h2>
            <p>Ismail Hossain</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Mother’s Name</h2>
            <p>Halima Aktar</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4  grid-cols-1 gap-4 mt-6">
          <div>
            <h2 className="text-[18px] font-semibold ">Date of Birth</h2>
            <p>24/04/1999</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">NID</h2>
            <p>01876543892</p>
          </div>
        </div>
      </div>
      {/* user Education */}
      <p className="mt-10">Job Experience</p>
      <div className="border border-black rounded-md p-8 mt-5">
        <h2 className="text-[18px] font-semibold mb-2">Experience-1</h2>
        <div className="grid lg:grid-cols-3  grid-cols-1 gap-4 ">
          <div>
            <h2 className="text-[18px] font-semibold">Designation</h2>
            <p>UI/UX Designer</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Department</h2>
            <p>UI/UX Design</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Employment Period</h2>
            <p>12/02/2021 to 28/06/2023</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3  grid-cols-1 gap-4 mt-6">
          <div>
            <h2 className="text-[18px] font-semibold ">Company Name</h2>
            <p>Digital IT Solution</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Company Location</h2>
            <p>Mirpur, Dhaka</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Years of Experience</h2>
            <p>2 years</p>
          </div>
        </div>
      </div>
      {/* user Training & skills */}
      <p className="mt-10">Training & skills</p>
      <div className="border border-black rounded-md p-8 mt-5 mb-10">
        <h2 className="text-[18px] font-semibold mb-2">Training-1</h2>
        <div className="grid lg:grid-cols-3   grid-cols-1 gap-4 ">
          <div>
            <h2 className="text-[18px] font-semibold">Designation</h2>
            <p>UI/UX Designer</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Department</h2>
            <p>UI/UX Design</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Employment Period</h2>
            <p>12/02/2021 to 28/06/2023</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-3  grid-cols-1 gap-4 mt-6">
          <div>
            <h2 className="text-[18px] font-semibold ">Company Name</h2>
            <p>Digital IT Solution</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Company Location</h2>
            <p>Mirpur, Dhaka</p>
          </div>
          <div>
            <h2 className="text-[18px] font-semibold">Years of Experience</h2>
            <p>2 years</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Details_1;
