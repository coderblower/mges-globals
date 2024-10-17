const Candidates = () => {
  return (
    <div className="lg:mt-10 mt-2">
      {/* Partner Registration filter */}
      <div className="flex items-center  justify-between mt-8">
        <h2 className="font-bold ">Candidates </h2>
        <select className=" px-2 p-[8px] border-2  rounded-md outline-none">
          <option value="grapefruit">Agent Center</option>
          <option value="lime">Training Center</option>
          <option value="mango">Medical Center</option>
        </select>
      </div>

      {/* table  */}
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-[#EEE]">
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
          {/* Todo */}
          <tbody></tbody>
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

export default Candidates;
