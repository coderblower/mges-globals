import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";

const Payment = () => {
  const datas = [
    {
      name: "Care Medical ",
      date: "Rampura",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "Rampura",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "Rampura",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "Rampura",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "Rampura",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "Rampura",
      report: "455",
      status: "388",
      documentation: "352",
    },
    {
      name: "Care Medical ",
      date: "Rampura",
      report: "455",
      status: "388",
      documentation: "352",
    },
  ];

  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex items-center  justify-between mt-8">
        <div>
          <h2 className="font-bold ">Payment Reports</h2>
          <div className="lg:flex gap-4 mt-5">
            <button className="rounded-md bg-[#EEE] px-4 py-1">
              Medical Center
            </button>
            <button className="rounded-md bg-[#EEE] px-4 py-1 lg:mt-0 mt-4">
              Training Center
            </button>
          </div>
        </div>
        <select className=" px-2 p-[8px] border-2  rounded-md outline-none">
          <option value="grapefruit">Select partner</option>
          <option value="lime">Select partner</option>
          <option value="mango">Select partner</option>
        </select>
      </div>

      {/* table  */}
      <div className="overflow-x-auto mt-10">
        <table className="table ">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase">
              <th>medical Name</th>
              <th>Location</th>
              <th>Registered candidates</th>
              <th>passed candidates</th>
              <th>Failed Candidates</th>
            </tr>
          </thead>
          <tbody>
            {datas &&
              datas.map((item) => (
                <tr className="text-center">
                  <th>{item?.name}</th>
                  <th>{item?.date}</th>
                  <th>{item?.report}</th>
                  <th>{item?.status}</th>
                  <th>
                    <button className=" rounded-xl bg-[#EEE] px-4 py-1">
                      Download
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

export default Payment;
