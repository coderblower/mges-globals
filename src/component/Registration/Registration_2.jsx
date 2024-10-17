import right_arow from "../../../public/images/right_arow.svg";
import { useState } from "react";

const Registration_2 = ({
  setPage,
  country,
  address,
  setAddress,
  next,
  pre,
}) => {
  // console.log(country);

  return (
    <div className="lg:mb-10">
      <div>
        <div className="bg-[#D9D9D9] rounded-md lg:px-[100px] px-[10px] lg:py-[75px] py-[40px]">
          <form>
            {country === "1" ? (
              <div className="lg:flex gap-5 mt-5">
                <div className="w-1/2">
                  <label>
                    <p className="text-[18px] font-[500] mb-2">
                      Permanent Address
                    </p>
                    <input
                      className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                      type="text"
                      name="name"
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          permanent_address: e.target.value,
                        })
                      }
                      value={address?.permanent_address}
                    />
                  </label>
                </div>
                <div className="w-1/2">
                  <label>
                    <p className="text-[18px] font-[500] mb-2">
                      Present Address
                    </p>
                    <input
                      className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                      type="text"
                      name="name"
                      onChange={(e) =>
                        setAddress({
                          ...address,
                          present_address: e.target.value,
                        })
                      }
                      value={address?.present_address}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <>
                <label>
                  <p className="text-[18px] font-[500] mb-2"> Address</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setAddress({ ...address, address: e.target.value })
                    }
                    value={address?.address}
                  />
                </label>
              </>
            )}

            <label>
              <p className="text-[18px] font-[500] mb-2"> Street Address</p>
              <input
                className=" px-2 p-[8px] w-full   rounded-md outline-none"
                type="text"
                name="name"
                onChange={(e) =>
                  setAddress({ ...address, street_address: e.target.value })
                }
                value={address?.street_address}
              />
            </label>
            <div className="lg:flex gap-5 mt-5">
              <div className="lg:w-1/2">
                <label>
                  <p className="text-[18px] font-[500] mb-2"> Post Office</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setAddress({ ...address, post_office: e.target.value })
                    }
                    value={address?.post_office}
                  />
                </label>
                <label>
                  <p className="text-[18px] font-[500] mb-2"> Post Code</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setAddress({ ...address, post_code: e.target.value })
                    }
                    value={address?.post_code}
                  />
                </label>
              </div>
              <div className="lg:w-1/2">
                <label>
                  <p className="text-[18px] font-[500] mb-2">City</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    value={address?.city}
                  />
                </label>
                <label>
                  <p className="text-[18px] font-[500] mb-2"> Country</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setAddress({ ...address, country: e.target.value })
                    }
                    value={address?.country}
                  />
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=" flex gap-4 items-center justify-end">
        <button
          onClick={() => {
            setPage("Personal Information");
            pre();
          }}
          className="py-[12px] transition-transform active:scale-95 px-[40px] bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          <img src={right_arow} className="rotate-180" /> Back
        </button>

        <button
          onClick={() => {
            setPage("Education");
            next();
          }}
          className="py-[12px] px-[40px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          Next <img src={right_arow} />
        </button>
      </div>
    </div>
  );
};

export default Registration_2;
