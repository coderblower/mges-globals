import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";

const Training = () => {
  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex items-center  justify-between mt-8">
        <h2 className="font-bold ">Training Centers </h2>
        <select className=" px-2 p-[8px] border-2  rounded-md outline-none">
          <option value="grapefruit">Select partner</option>
          <option value="lime">Select partner</option>
          <option value="mango">Select partner</option>
        </select>
      </div>

      {/* table  */}
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-[#EEE]">
            <tr className="uppercase">
              <th>medical Name</th>
              <th>Location</th>
              <th>Registered candidates</th>
              <th>passed candidates</th>
              <th>Failed Candidates</th>
            </tr>
          </thead>
          <tbody>{/* Todo */}</tbody>
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

export default Training;
