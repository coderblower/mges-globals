import { Outlet } from "react-router-dom";
import Navber from "../component/Navber";
import ProfileMenu from "../component/ProfileMenu/ProfileMenu";
import { useState } from "react";
import menu_icon from "../../public/images/menu_1.svg";

const Medical_Registration = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const listItems = [
    {
      path: "/medical",
      name: "Dashboard",
    },
    // {
    //   path: "/medical/registration_1",
    //   name: "Candidate Registration",
    // },
    // {
    //   path: "/medical/candidate_list",
    //   name: "Candidates List",
    // },
    {
      path: "/medical/enrolled_list",
      name: "Enrolled List",
    },

    {
      path: "/medical/reports",
      name: "Reports",
    },
  ];

  return (
    <div className=" relative lg:flex lg:p-0 p-2">
      <div
        className={`w-[300px] fixed top-0 left-0 min-h-screen hidden lg:block `}
      >
        <Navber listItems={listItems} navList="" />
      </div>

      {/* Mobile menu  */}
      <div
        className={`w-[300px] fixed top-0 z-10 ${
          menuOpen ? " left-0" : "-left-[300px]"
        } lg:hidden `}
      >
        <Navber
          listItems={listItems}
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          navList=""
        />
      </div>

      {/* Main contant */}
      <div className=" lg:ml-[300px] w-full lg:px-[80px] pb-[50px] overflow-hidden">
        <div className="flex items-center justify-between lg:justify-end lg:mt-10">
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
            <img src={menu_icon} alt="" />
          </button>
          <ProfileMenu />
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Medical_Registration;
