import { Outlet } from "react-router-dom";
import Navber from "../component/Navber";
import ProfileMenu from "../component/ProfileMenu/ProfileMenu";
import menu_icon from "../../public/images/menu_1.svg";
import { useState } from "react";
import NotificationBell from "../component/Notification";

const HiringCountryAgency = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const listItems = [
    {
      path: "/hiring_country_recruting_agency",
      name: "Dashboard",
    },
    {
      path: "/hiring_country_recruting_agency/pre_demand_letter",
      name: "Pre-Demand Letter",
    },
    {
      path: "/hiring_country_recruting_agency/demand_letter",
      name: "Demand Letter",
    },
    {
      
      name: "Contract Letter",
      subItems: [
        {
          path: "hiring_country_recruting_agency/contract_letter/admin_request",
          name: " Create Letters ",
        },
      
        {
          path: "hiring_country_recruting_agency/contract_letter/send_list",
          name: " Demand Letter List ",
        },
      ],
    }, 
    {
      path: "/hiring_country_recruting_agency/power_of_attorney",
      name: "Power of Attorney",
    }, 
    {
      path: "/hiring_country_recruting_agency/employee_details",
      name: "Employee Details",
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
        className={`w-[300px] fixed top-0 z-10 ${menuOpen ? " left-0" : "-left-[300px]"
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

export default HiringCountryAgency;
