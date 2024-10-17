const User_Training_Report = () => {
  return (
    <div className="mt-[32px]">
      <h2 className="text-[24px] font-[500] mb-[26px]">Training Report</h2>

      {/* user Personal */}
      <div className="border border-black rounded-[4px] py-[40px] px-[10px] lg:px-[53px]">
        <div className="grid lg:grid-cols-4  grid-cols-1 gap-4 ">
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">ID</h2>
            <p className="text-[18px] font-[400]">234</p>
          </div>
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">Name</h2>
            <p className="text-[18px] font-[400]">Rakib Hossain</p>
          </div>
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">
              Registered Date
            </h2>
            <p className="text-[18px] font-[400]">20/08/23</p>
          </div>
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">Skilled</h2>
            <p className="text-[18px] font-[400]">No</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4   grid-cols-1 gap-4 mt-[36px]">
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">Crash Training</h2>
            <p className="text-[18px] font-[400]">Required</p>
          </div>
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">
              Payment (Training)
            </h2>
            <p className="text-[18px] font-[400]">Success</p>
          </div>
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">Payment (Exam)</h2>
            <p className="text-[18px] font-[400]">Success</p>
          </div>
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">Exam Result</h2>
            <p className="text-[18px] font-[400]">Pass</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4   grid-cols-1 gap-4 mt-[36px]">
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">
              Further Training
            </h2>
            <p className="text-[18px] font-[400]">N/A</p>
          </div>
          <div className="col-span-2">
            <h2 className="text-[18px] font-[500] mb-[10px]">Status</h2>
            <p className="text-[18px] font-[400]">Ready for Visa Process</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Training_Report;
