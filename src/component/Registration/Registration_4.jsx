import right_arow from "../../../public/images/right_arow.svg";
import { useState } from "react";
import FileUplod from "../FileUplod";

const Registration_4 = ({
  setPage,
  next,
  experience,
  setExperience,
  pre,
  experience_file,
  setExperience_file,
}) => {
  const [uploadError, setUploadError] = useState("");

  return (
    <div className="lg:mb-10">
      <div>
        <div className="bg-[#D9D9D9] rounded-md lg:px-[100px] px-[10px] lg:py-[75px] py-[40px] ">
          <h3 className="text-[20px] font-bold mb-5">Experience-1</h3>
          <form>
            <div className="lg:flex gap-5">
              <div className="lg:w-1/2">
                <label>
                  <p className="text-[17px] font-[500] mb-2"> Conpany Name</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        company_name: e.target.value,
                      })
                    }
                    value={experience?.company_name}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2"> Designation</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="designation"
                    name="name"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        designation: e.target.value,
                      })
                    }
                    value={experience?.designation}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2">
                    Employment Period
                  </p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="date"
                    name="name"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        employment_period_from: e.target.value,
                      })
                    }
                    value={experience?.employment_period_from}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2">
                    {" "}
                    Company Location
                  </p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        company_location: e.target.value,
                      })
                    }
                    value={experience?.company_location}
                  />
                </label>
              </div>
              <div className="lg:w-1/2">
                <label>
                  <p className="text-[17px] font-[500] mb-2">
                    {" "}
                    Company Business{" "}
                  </p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        company_business: e.target.value,
                      })
                    }
                    value={experience?.company_business}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2"> Department </p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        department: e.target.value,
                      })
                    }
                    value={experience?.department}
                  />
                </label>
                <label>
                  <input
                    className=" px-2 p-[8px] w-full mt-8  mb-5 rounded-md outline-none "
                    type="date"
                    name="name"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        employment_period_to: e.target.value,
                      })
                    }
                    value={experience?.employment_period_to}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2">
                    {" "}
                    Total Year of Experience
                  </p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="number"
                    name="name"
                    onChange={(e) =>
                      setExperience({
                        ...experience,
                        total_year_of_experience: e.target.value,
                      })
                    }
                    value={experience?.total_year_of_experience}
                  />
                </label>
              </div>
            </div>
          </form>
          <div className="flex items-center gap-4 w-full  rounded-[8px] outline-none border-2 bg-white mt-4">
            <div className="w-[90px]  bg-[#1e3767] rounded-l-[8px]">
              <FileUplod setFile={setExperience_file} />
            </div>
            <h2>
              {(experience_file && experience_file?.name) ||
                experience_file?.slice(27, experience_file?.length)}
            </h2>
          </div>
          {uploadError && (
            <p className="text-red-500 text-sm mt-1">{uploadError}</p>
          )}
        </div>
      </div>

      <div className=" flex gap-4 items-center justify-end">
        <button
          onClick={() => {
            setPage("Training & skills");
            next();
          }}
          className="py-[12px] px-[40px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          Skip
        </button>
        <button
          onClick={() => {
            setPage("Education");
            pre();
          }}
          className="py-[12px] px-[40px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          <img src={right_arow} className="rotate-180" /> Back
        </button>

        <button
          onClick={() => {
            // if (!experience_file) {
            //   setUploadError("Experience file is required.");
            //   return;
            // }
            // setUploadError("");
            setPage("Training & skills");
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

export default Registration_4;
