import { Outlet } from "react-router-dom";
import Navber from "../component/Navber";
import ProfileMenu from "../component/ProfileMenu/ProfileMenu";
import NotificationBell from "../component/Notification";
import menu_icon from "../../public/images/menu_1.svg";
import { useState } from "react";

const Admin_Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const listItems = [
    {
      path: "/admin",
      name: "Dashboard",
    },
    {
      path: "/admin/partner",
      name: "Partner Registration",
    },
    {
      path: "/admin/agent_list",
      name: "Agent List",
    },
    {
      path: "/admin/hiring_agency_res",
      name: "Hiring Agency",
    },
    {
      path: "/admin/pre_demand_letter",
      name: "Pre Demand Letter",
    },
    {
      path: "/admin/agreed_pre_demand_letter",
      name: "Agreed Pre Demand ",
    },
    {
      path: "/admin/demand_letter",
      name: "Demand Letter",
    },
    {
      path: "/admin/training_list",
      name: "Training center list",
    },
    {
      path: "/admin/medical_list",
      name: "Medical center list",
    },
    {
      path: "/admin/Candidate_Registration_from",
      name: "Candidate Registration",
    },
    {
      path: "/admin/Candidate_List",
      name: "Candidate List",
    },
    {
      path: "/admin/requested_Candidate",
      name: "Requested Candidate",
    },
  ];

  return (
    <div className="relative lg:flex lg:p-0 p-2">
      <div className={`w-[300px] fixed top-0 left-0 lg:block hidden `}>
        <Navber
          admin="Settings"
          listItems={listItems}
          show_report={true}
          report_path="admin"
          navList="/admin"
        />
      </div>

      {/* Mobile menu  */}
      <div
        className={`w-[300px] fixed top-0 z-10 ${
          menuOpen ? " left-0" : "-left-[300px]"
        } lg:hidden `}
      >
        <Navber
          admin="Settings"
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

export default Admin_Dashboard;
