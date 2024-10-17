import success_img from "../../../public/images/success_2.svg";
import { NavLink } from "react-router-dom";

const Success = ({ navList }) => {
  return (
    <div className="mb-10">
      {/* Contant */}
      <div className="flex justify-center mt-14">
        <div>
          <div className="py-[50px] border-2 lg:w-[650px]  border-black rounded-md flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-7">
                <img className="w-[53px]" src={success_img} alt="" />
              </div>
              <h2 className=" font-bold text-[37px] mb-3">Thank You!</h2>
              <p className="text-[24px]">
                Your form has been submitted successfully
              </p>
            </div>
          </div>
          <div className=" flex items-center justify-center mt-[50px]">
            <NavLink to={navList}>
              <button className=" py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md mr-5">
                <div className="flex gap-3">
                  <h3>Dashboard</h3>
                </div>
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
