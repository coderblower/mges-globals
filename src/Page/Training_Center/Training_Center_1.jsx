import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import search from "../../../public/images/search.svg";

const Training_Candidates_1 = () => {
  const datas = [1, 2, 3, 4, 5, 6, 7];
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
      <div className="overflow-hidden mt-10 ">
        <table className="table  overflow-x-auto">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase">
              <th>ID</th>
              <th>Name</th>
              <th>Register date</th>
              <th>Exam Result</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {datas &&
              datas.map((item) => (
                <tr>
                  <th>245</th>
                  <th>Rakib</th>
                  <th>12/09/23</th>
                  <th>Yes</th>
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

export default Training_Candidates_1;
