import React, { useEffect, useState } from "react";
import logo_img from "../../public/images/MGES_Logo.png";
import close_icon from "../../public/images/close_icon.svg";
import down_icon from "../../public/images/down_white_arrow.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { post } from "../api/axios";
import { useLocation } from "react-router-dom";

const Navber = ({
  report_path,
  show_report,
  listItems,
  navList,
  setMenuOpen,
  menuOpen,
  admin,
  training,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeParent, setActiveParent] = useState(null); // Tracks the active parent menu
  const [drop_2, setDrop_2] = useState(false); // State for reports submenu visibility

  useEffect(() => {
    // Check if the current location path matches any of the sub-items
    let foundActive = false;

    listItems.forEach((item, i) => {
      // Check for direct URL match with subItems
      if (item.subItems && item.subItems.some(subItem => `/${subItem.path}` === location.pathname)) {
        setActiveParent(i); // Set parent as active if a sub-item matches the current path
        foundActive = true;
      } else if (`/${item.path}` === location.pathname) {
        setActiveParent(null); // Reset activeParent if the parent itself is active
      }
    });

    // If no active submenu found, set activeParent to null
    if (!foundActive) {
      setActiveParent(null);
    }
  }, [location.pathname, listItems]);

  const logout = () => {
    post("api/logout");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle parent menu item click to toggle submenu
  const toggleSubmenu = (index) => {
    setActiveParent(activeParent === index ? null : index); // Toggle submenu visibility
  };

  return (
    <div className="">
      {/* Side menu */}
      <div className="flex min-h-screen">
        <div className="w-14 bg-[#1E3767]"></div>

        <div className={`w-full max-h-screen ${menuOpen ? "bg-[#AEAEBF]" : "bg-[#AEAEBF]"}`}>
          <div className="flex justify-end">
            <img
              onClick={() => setMenuOpen(!menuOpen)}
              className="pr-5 pt-4 cursor-pointer lg:hidden"
              src={close_icon}
              alt=""
            />
          </div>
          <div className="mt-10 px-6 mb-[100px]">
            <NavLink to={`${navList}`}>
              <img className="h-[64px] w-[133px]" src={logo_img} alt="" />
            </NavLink>
          </div>

          {/* List Item */}
          <div className="overflow-y-auto max-h-screen"> {/* Added overflow styles */}
            <ul className="text-white navberUl">
              {listItems.map((item, i) => (
                <li key={i} className="mb-3">
                  {item.subItems ? (
                    <>
                      {/* Parent with submenu */}
                      <div
                        className={`px-6 py-3 text-[#000] font-[600] cursor-pointer flex justify-between items-center ${
                          activeParent === i ? "bg-[#464646] text-[#fff]" : ""
                        }`}
                        onClick={() => toggleSubmenu(i)} // Toggle submenu on click
                      >
                        {item.name}
                        <img
                          className={`${
                            activeParent === i ? "rotate-180" : "rotate-0"
                          } transition-transform duration-300`}
                          src={down_icon}
                          alt=""
                        />
                      </div>

                      {/* Submenu */}
                      {activeParent === i && (
                        <ul className="ml-4">
                          {item.subItems.map((subItem, index) => (
                            <li key={index} className="mb-2">
                              <NavLink
                                className={`pl-8 py-2 font-[600] ${
                                  location.pathname === `/${subItem.path}`
                                    ? "bg-[#464646] text-[#fff]" // Active style for submenu
                                    : "text-black"
                                }`}
                                to={`/${subItem.path}`} // Ensure to prepend '/' for correct routing
                              >
                                {subItem.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    /* Normal item */
                    <NavLink
                      className={`px-6 py-3 text-[#000] font-[600] ${
                        location.pathname === item.path ? "bg-[#464646] text-[#fff]" : ""
                      }`}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  )}
                </li>
              ))}

              {/* Additional report section or other items */}
              {show_report && (
                <>
                  <li
                    onClick={() => setDrop_2(!drop_2)}
                    className={`px-6 py-3 text-black font-[600] cursor-pointer flex justify-between items-center`}
                  >
                    <h2>Reports</h2>
                    <img
                      className={`${
                        drop_2
                          ? "rotate-180 transition-transform duration-500 ease"
                          : "rotate-0 transition-transform duration-500 ease"
                      }`}
                      src={down_icon}
                      alt=""
                    />
                  </li>
                  {drop_2 && (
                    <ul className="ml-4">
                      <li className="mb-2">
                        <NavLink
                          className={`pl-8 py-3 font-[600] ${
                            location.pathname === `/${report_path}/medical-reports`
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to={`/${report_path}/medical-reports`}
                        >
                          Medical Reports
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink
                          className={`pl-8 py-3 font-[600] ${
                            location.pathname === `/${report_path}/training-reports`
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to={`/${report_path}/training-reports`}
                        >
                          Training Reports
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink
                          className={`pl-8 py-3 font-[600] ${
                            location.pathname === `/${report_path}/final-reports`
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to={`/${report_path}/final-reports`}
                        >
                          Final Reports
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink
                          className={`pl-8 py-3 font-[600] ${
                            location.pathname === `/${report_path}/document_Summary`
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to={`/${report_path}/document_Summary`}
                        >
                          Document Summary
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </>
              )}

              <li className="mb-[50px]">
                <button
                  className="w-full px-6 py-3 text-left text-black font-[600]"
                  onClick={logout}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navber;
