import { Outlet } from "react-router-dom";
import Navber from "../component/Navber";
import ProfileMenu from "../component/ProfileMenu/ProfileMenu";
import menu_icon from "../../public/images/menu_1.svg";
import { useState } from "react";

const Training_Center = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const listItems = [
    {
      path: "/training",
      name: "Dashboard",
    },
    // {
    //   path: "/training/registration",
    //   name: "Candidate Registration",
    // },
    {
      path: "/training/candidates_list",
      name: "Candidate List",
    },
    {
      path: "/training/pre_skill_test",
      name: "Pre Skilled Test",
    },
    {
      path: "/training/skill_test",
      name: "Skill Test",
    },
    {
      path: "/training/crash_training",
      name: "Crash Training",
    },
    {
      path: "/training/final_test",
      name: "Final Test",
    },
    {
      path: "/training/qualified-candidates",
      name: "Qualified Candidates",
    },
  ];

  return (
    <div className=" relative lg:flex lg:p-0 p-2">
      <div
        className={`w-[300px] fixed top-0 left-0 min-h-screen hidden lg:block `}
      >
        <Navber menuValue="training" listItems={listItems} navList="" />
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
          menuValue="training"
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

export default Training_Center;
