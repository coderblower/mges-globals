import React, { useEffect, useState } from "react";
import logo_img from "../../public/images/MGES_Logo.png";
import close_icon from "../../public/images/close_icon.svg";
import button_icon from "../../public/images/icons-down-arrow.png";
import down_icon from "../../public/images/down_white_arrow.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  let location = useLocation();
  const [drop, setDrop] = useState(false);
  const [drop_2, setDrop_2] = useState(false);
  const [active, setActive] = useState("");
  const logout = () => {
    post("api/logout");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  const handleList = (active) => {
    setActive(active);
    setMenuOpen(!open);
  };

  return (
    <div className="">
      {/* Side menu */}
      <div className="flex min-h-screen">
        <div className=" w-14 bg-[#1E3767] "></div>

        <div
          className={`w-full max-h-screen ${
            admin || training == training ? "overflow-y-scroll" : ""
          } ${menuOpen ? "bg-[#AEAEBF]" : "bg-[#AEAEBF]"}`}
        >
          <div className="flex justify-end">
            <img
              onClick={() => setMenuOpen(!menuOpen)}
              className="pr-5 pt-4 cursor-pointer lg:hidden"
              src={close_icon}
              alt=""
            />
          </div>
          <div className="mt-10  px-6 mb-[100px]">
            <NavLink to={`${navList}`}>
              <img className=" h-[64px] w-[133px]" src={logo_img} alt="" />
            </NavLink>
            {/* <img className="cursor-pointer" src={menu_img} alt="" /> */}
          </div>
          {/*List Item  */}
          <div className="">
            <ul className=" text-white navberUl">
              {listItems &&
                listItems.map((item, i) => (
                  <li
                    key={i}
                    onClick={() => handleList(item?.name)}
                    className="mb-3"
                  >
                    <NavLink
                      className={`px-6 py-3 text-[#000] font-[600]  ${
                        location?.pathname === item?.path
                          ? "bg-[#464646] text-[#fff] "
                          : ""
                      }`}
                      to={item?.path}
                    >
                      {item?.name}
                    </NavLink>
                  </li>
                ))}

              {admin && (
                <>
                  <li
                    onClick={() => {
                      setDrop(!drop);
                    }}
                    className={`px-6 py-3 text-black font-[600]`}
                  >
                    <div className="flex items-center justify-between mb-2  cursor-pointer">
                      <h2>{admin}</h2>
                      <img
                        className={`${
                          drop
                            ? "rotate-180 transition-transform duration-500 ease"
                            : "rotate-0 transition-transform duration-500 ease"
                        }`}
                        src={down_icon}
                        alt=""
                      />
                    </div>
                  </li>
                  {drop && (
                    <>
                      <li className="mb-2">
                        <NavLink
                          className={`pl-8 py-3 font-[600]  ${
                            location?.pathname == "/admin/country_list"
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to="/admin/country_list"
                        >
                          Country List
                        </NavLink>
                      </li>
                      <li className="mb-3">
                        <NavLink
                          className={`pl-8 py-3 font-[600] ${
                            location?.pathname == "/admin/designation"
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to="/admin/designation"
                        >
                          Designation
                        </NavLink>
                      </li>
                      <li className="mb-3">
                        <NavLink
                          className={`pl-8 py-3 font-[600] ${
                            location?.pathname == "/admin/quota_set"
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to="/admin/quota_set"
                        >
                          Quota Set
                        </NavLink>
                      </li>
                      <li className="mb-2">
                        <NavLink
                          className={`pl-8 py-3 font-[600]   ${
                            location?.pathname == "/admin/medical_test"
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to="/admin/medical_test"
                        >
                          Medical Test List
                        </NavLink>
                      </li>
                      <li className="mb-3">
                        <NavLink
                          className={`pl-8 py-3 font-[600]   ${
                            location?.pathname == "/admin/test_by_country"
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to="/admin/test_by_country"
                        >
                          Test By Country
                        </NavLink>
                      </li>
                      <li className="mb-3">
                        <NavLink
                          className={`pl-8 py-3 font-[600] ${
                            location?.pathname == "/admin/test_by_country_list"
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to="/admin/test_by_country_list"
                        >
                          Test By Country List
                        </NavLink>
                      </li>
                    </>
                  )}
                </>
              )}

              {show_report && (
                <>
                  <li
                    onClick={() => {
                      setDrop_2(!drop_2);
                      setActive("Reports");
                    }}
                    className={`px-6 py-3 text-black font-[600] cursor-pointer`}
                  >
                    <div className="flex items-center justify-between mb-2 ">
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
                    </div>
                  </li>
                  {drop_2 && (
                    <>
                      <li className="mb-2">
                        <NavLink
                          className={`pl-8 py-3 font-[600]  ${
                            location?.pathname ==
                            `/${report_path}/medical-reports`
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to={`/${report_path}/medical-reports`}
                        >
                          Medical Reports
                        </NavLink>
                      </li>
                      <li className="mb-3">
                        <NavLink
                          className={`pl-8 py-3 font-[600] ${
                            location?.pathname ==
                            `/${report_path}/training-reports`
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
                          className={`pl-8 py-3 font-[600]   ${
                            location?.pathname ==
                            `/${report_path}/final-reports`
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
                          className={`pl-8 py-3 font-[600]   ${
                            location?.pathname ==
                            `/${report_path}/document_Summary`
                              ? "bg-[#464646] text-[#fff]"
                              : "text-black"
                          }`}
                          to={`/${report_path}/document_Summary`}
                        >
                          Document Summary
                        </NavLink>
                      </li>
                    </>
                  )}
                </>
              )}

              <li className="mb-[50px]">
                <button
                  className="w-full px-6 py-3 text-left text-black font-[600] transition-transform active:scale-95"
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
