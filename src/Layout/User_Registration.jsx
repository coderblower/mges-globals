import { Outlet } from "react-router-dom";
import Navber from "../component/Navber";

const User_Registration = () => {
  const listItems = [
    {
      path: "/user_registration",
      name: "Registration",
    },
  ];
  return (
    <div className=" relative lg:flex lg:p-0 p-2">
      <div className="  w-[300px] fixed hidden lg:block">
        <Navber listItems={listItems} navList="" />
      </div>

      {/* Main contant */}
      <div className=" lg:ml-[300px] w-full lg:px-[80px] pb-[50px] overflow-hidden">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default User_Registration;
