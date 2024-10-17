import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";

const User_Details = () => {
  const datas = [
    {
      id: "23",
      name: "Sadiq",
      date: "12/34/23",
      report: "pass",
      status: "Pass",
      documentation: "Clear",
      accotion: "panding",
    },
  ];
  return (
    <div className="lg:mt-10 mt-2 ">
      {/* user details */}
      <h1 className="text-2xl font-bold mt-10 mb-5">User Details</h1>
      {/* user Personal */}
      <p className="font-bold">Personal Information</p>
      <div className="border bg-[#EEE]  rounded-md p-8 mt-5">
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
      <p className="mt-10 font-bold">Address</p>
      <div className="border lg:flex justify-between bg-[#EEE] rounded-md p-8 mt-5">
        <div className="lg:border-r-2 border-gray-500  lg:pr-10 lg:w-1/2">
          <h2 className="text-[18px] font-semibold">Present Address</h2>
          <p>House No:19, Road: 14, Block-B, Mirpur 14, Dhaka-1216</p>
        </div>
        <div className="lg:w-1/2 lg:pl-10 lg:mt-0 mt-4">
          <h2 className="text-[18px] font-semibold">Permanent Address</h2>
          <p>House:12, Road:01, Fatheabad, Chakbazar, Chattogram 4331</p>
        </div>
      </div>
      {/* All Candidates  */}
      <div className="mt-6">
        <input
          className="bg-[#EEE] outline-none w-full py-2 px-3 rounded-md"
          placeholder="All Candidates"
          type="Email"
        />
        {/* Table */}
        <div className="overflow-x-auto mt-5 mb-10">
          <table className="table ">
            {/* head */}
            <thead className="bg-[#EEE]">
              <tr className="uppercase">
                <th className="rounded-tl-md ">ID</th>
                <th>Name</th>
                <th>Register date</th>
                <th>Medical Test Report</th>
                <th>Training Status</th>
                <th>Documentation</th>
                <th className="rounded-tr-md ">Status</th>
              </tr>
            </thead>
            <tbody className="bg-[#EEE] border-t-2 border-gray-500">
              {datas &&
                datas?.map((item) => (
                  <tr className="text-center ">
                    <th className="rounded-bl-md ">{item?.id}</th>
                    <th>{item?.name}</th>
                    <th>{item?.date}</th>
                    <th>{item?.report}</th>
                    <th>{item?.status}</th>
                    <th>{item?.documentation}</th>
                    <th className="rounded-br-md ">{item?.accotion}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-6">
        <input
          className="bg-[#EEE] outline-none w-full py-2 px-3 rounded-md"
          placeholder="All Candidates"
          type="Email"
        />
        {/* Table */}
        <div className="overflow-x-auto mt-5 mb-10">
          <table className="table ">
            {/* head */}
            <thead className="bg-[#EEE]">
              <tr className="uppercase">
                <th className="rounded-tl-md ">ID</th>
                <th>Name</th>
                <th>Register date</th>
                <th>Medical Test Report</th>
                <th>Training Status</th>
                <th>Documentation</th>
                <th className="rounded-tr-md ">Status</th>
              </tr>
            </thead>
            <tbody className="bg-[#EEE] border-t-2 border-gray-500">
              {datas &&
                datas?.map((item) => (
                  <tr className="text-center ">
                    <th className="rounded-bl-md ">{item?.id}</th>
                    <th>{item?.name}</th>
                    <th>{item?.date}</th>
                    <th>{item?.report}</th>
                    <th>{item?.status}</th>
                    <th>{item?.documentation}</th>
                    <th className="rounded-br-md ">{item?.accotion}</th>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User_Details;
