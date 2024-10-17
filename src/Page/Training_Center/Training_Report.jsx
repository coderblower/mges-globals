import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";

const Training_Report = () => {
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
      {/* Partner Registration filter */}
      <div className="mt-10">
        <h2 className="font-bold mb-6">Candidates</h2>
        <div className="flex justify-between items-center">
          <div className="lg:flex gap-4  ">
            <button className="rounded-md bg-[#EEE] px-4 py-1">
              All Candidates
            </button>
            <button className="rounded-md bg-[#EEE] px-4 py-1 lg:mt-0 mt-4">
              Tarined Candidate
            </button>
            <button className="rounded-md bg-[#EEE] px-4 py-1 lg:mt-0 mt-4">
              Currently Enrolled
            </button>
          </div>
          <select className="px-4 py-1  border-2  rounded-md outline-none">
            <option value="grapefruit">Filter by </option>
            <option value="lime">Filter by </option>
            <option value="mango">Filter by </option>
          </select>
        </div>
      </div>

      {/* table  */}
      <div className="overflow-x-auto mt-10">
        <table className="table ">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase">
              <th>ID</th>
              <th>Name</th>
              <th>Register date</th>
              <th>Status</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {datas &&
              datas.map((item) => (
                <tr>
                  <th>{item?.report}</th>
                  <th>{item?.status}</th>
                  <th>{item?.date}</th>
                  <th>{item?.name}</th>
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

export default Training_Report;
