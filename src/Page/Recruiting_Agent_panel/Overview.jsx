import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";

const Overview = () => {
  const datas = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex ite justify-between mt-12">
        <h2 className="font-bold text-2xl ">Overview</h2>
        <select className="py-1 px-3  border-2  rounded-md outline-none">
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
              <th>Register date</th>
              <th>Medical Test Report</th>
              <th>Training Status</th>
              <th>Documentation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {datas &&
              datas?.map((item) => (
                <tr className="">
                  <th>245</th>
                  <th>Sadiq</th>
                  <th>12/01/23</th>
                  <th>pass</th>
                  <th>Value</th>
                  <th>Clear</th>
                  <th>Ready for Visa Process</th>
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

export default Overview;
