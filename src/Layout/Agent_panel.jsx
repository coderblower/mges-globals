import { Outlet } from "react-router-dom";
import Navber from "../component/Navber";
import ProfileMenu from "../component/ProfileMenu/ProfileMenu";
import menu_icon from "../../public/images/menu_1.svg";
import { useState } from "react";
import NotificationBell from "../component/Notification";

const Agent_panel = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const listItems = [
    {
      path: "/agent_panel",
      name: "Dashboard",
    },
    {
      path: "/agent_panel/registration",
      name: "Candidate Registration",
    },

    {
      path: "/agent_panel/demand_Letter",
      name: "Demand Letter",
    },

    {
      path: "/agent_panel/list",
      name: "Candidate List",
    },
    {
      path: "/agent_panel/pre_demand",
      name: "Pre Demand Letter",
    },

  ];

  return (
    <div className=" relative lg:flex lg:p-0 p-2">
      <div
        className={`w-[300px] fixed top-0 left-0 min-h-screen hidden lg:block `}
      >
        <Navber
          listItems={listItems}
          show_report={true}
          report_path="agent_panel"
        />
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
          <NotificationBell />
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

export default Agent_panel;
