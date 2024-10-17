const User_Medical_Report = () => {
  return (
    <div className="mt-[32px]">
      <h2 className="text-[24px] font-[500] mb-[29px]">Medical Report</h2>

      {/* user Personal */}
      <div className="border border-black rounded-[4px] py-[40px] lg:px-[53px] px-[10px]">
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
            <h2 className="text-[18px] font-[500] mb-[10px]">Payment</h2>
            <p className="text-[18px] font-[400]">Success</p>
          </div>
        </div>
        <div className="grid lg:grid-cols-4   grid-cols-1 gap-4 mt-[36px]">
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">Test Report</h2>
            <p className="text-[18px] font-[400]">DhPass</p>
          </div>
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">
              Further Training
            </h2>
            <p className="text-[18px] font-[400]">N/A</p>
          </div>
          <div>
            <h2 className="text-[18px] font-[500] mb-[10px]">
              Eligible for Training
            </h2>
            <p className="text-[18px] font-[400]">Yes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User_Medical_Report;
