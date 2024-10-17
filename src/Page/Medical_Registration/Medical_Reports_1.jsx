import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";

const Medical_Reports_1 = () => {
  const datas = [
    {
      id: "23",
      name: "Care Medical ",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      stuts: "Pass",
    },
    {
      id: "23",
      name: "Care Medical ",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      stuts: "Pass",
    },
    {
      id: "23",
      name: "Care Medical ",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      stuts: "Pass",
    },
    {
      id: "23",
      name: "Care Medical ",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      stuts: "Pass",
    },
    {
      id: "23",
      name: "Care Medical ",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      stuts: "Pass",
    },
    {
      id: "23",
      name: "Care Medical ",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      number: "X",
      stuts: "Pass",
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
      <div className="flex items-center  justify-between mt-8">
        <div>
          <h2 className="font-bold ">Reports</h2>
          <div className="lg:flex gap-4 mt-5">
            <button className="rounded-md bg-[#EEE] px-4 py-1">
              Registration
            </button>
            <button className="rounded-md bg-[#EEE] px-4 py-1 lg:mt-0 mt-4">
              Payment
            </button>
            <button className="rounded-md bg-[#EEE] px-4 py-1 lg:mt-0 mt-4">
              Medical
            </button>
          </div>
        </div>
        <select className=" px-2 p-[8px] border-2  rounded-md outline-none">
          <option value="grapefruit">Filter by </option>
          <option value="lime">Filter by </option>
          <option value="mango">Filter by </option>
        </select>
      </div>

      {/* table  */}
      <div className="overflow-x-auto mt-10">
        <table className="table ">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase">
              <th>ID</th>
              <th>Name</th>
              <th>CBC with ESR</th>
              <th>ECG</th>
              <th>Chest X-ray</th>
              <th>Serum IgE</th>
              <th>Blood Group</th>
              <th>TSH</th>
              <th>HBsAg</th>
              <th>Lipid Profile</th>
              <th>Serum Creatinine</th>
              <th>Medical History</th>
            </tr>
          </thead>
          <tbody>
            {datas &&
              datas.map((item) => (
                <tr>
                  <th>{item?.id}</th>
                  <th>{item?.name}</th>
                  <th>{item?.number}</th>
                  <th>{item?.number}</th>
                  <th>{item?.number}</th>
                  <th>{item?.number}</th>
                  <th>{item?.number}</th>
                  <th>{item?.number}</th>
                  <th>{item?.number}</th>
                  <th>{item?.number}</th>
                  <th>{item?.number}</th>
                  <th>Pass</th>
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

export default Medical_Reports_1;
