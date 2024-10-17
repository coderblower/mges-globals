import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";

const Medical_Payment = () => {
  const datas = [
    {
      name: "Care Medical ",
      date: "12/09/23",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "12/09/23",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "12/09/23",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "12/09/23",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "12/09/23",
      report: "455",
      status: "388",
      documentation: "352",
    },
  ];
  return (
    <div className="lg:mt-10 mt-2">
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
      {/* Partner Registration filter */}

      <h2 className="font-bold mt-10 ">Payment Status</h2>

      {/* table  */}
      <div className="overflow-x-auto mt-10">
        <table className="table ">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase">
              <th>ID</th>
              <th>Name</th>
              <th>Register date</th>
              <th>Payment</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {datas &&
              datas.map((item) => (
                <tr className="">
                  <th>{item?.report}</th>
                  <th>{item?.status}</th>
                  <th>{item?.date}</th>
                  <th>{item?.name}</th>

                  <th>
                    <button className=" rounded-xl bg-[#EEE] px-4 py-1">
                      Update
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* pagition  */}
      <div className="flex mt-10 items-center justify-center mb-10">
        <div className="flex">
          <div className="px-4 py-3 border-2 bg-[#EEE] rounded-tl-md rounded-bl-md">
            1
          </div>
          <div className="px-4 py-3 border-2">2</div>
          <div className="px-4 py-3 border-2">3</div>
          <div className="px-4 py-3 border-2">...</div>
          <div className="px-4 py-3 border-2">6</div>
          <div className="px-4 py-3 border-2 rounded-tr-md rounded-br-md">
            7
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medical_Payment;
