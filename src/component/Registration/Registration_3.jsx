import right_arow from "../../../public/images/right_arow.svg";
import { useState } from "react";
import FileUplod from "../FileUplod";

const Registration_3 = ({
  setPage,
  next,
  academic,
  setAcademic,
  pre,
  academic_file,
  setAcademic_file,
}) => {
  const [uploadError, setUploadError] = useState("");

  const handleNextPage = () => {
    // if (!academic_file) {
    //   setUploadError("Academic file is required.");
    //   return;
    // }
    setUploadError("");
    setPage("Job Experience");
    next();
  };

  return (
    <div className="lg:mb-10">
      <div className="bg-[#D9D9D9] rounded-md lg:px-[100px] px-[10px] lg:py-[75px] py-[40px]">
        <h3 className="text-[20px] font-bold mb-5">Academic-1</h3>
        <form>
          <div className="lg:flex gap-5">
            <div className="lg:w-1/2">
              <label>
                <p className="text-[17px] font-[500] mb-2">
                  Level of Education
                </p>
                <input
                  className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setAcademic({
                      ...academic,
                      level_of_education: e.target.value,
                    })
                  }
                  value={academic?.level_of_education}
                />
              </label>
              <label>
                <p className="text-[17px] font-[500] mb-2"> Institute Name </p>
                <input
                  className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setAcademic({
                      ...academic,
                      institute_name: e.target.value,
                    })
                  }
                  value={academic?.institute_name}
                />
              </label>
              <label>
                <p className="text-[17px] font-[500] mb-2"> Result</p>
                <input
                  className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setAcademic({
                      ...academic,
                      result: e.target.value,
                    })
                  }
                  value={academic?.result}
                />
              </label>
            </div>
            <div className="lg:w-1/2">
              <label>
                <p className="text-[17px] font-[500] mb-2">
                  {" "}
                  Exam/Degree Title
                </p>
                <input
                  className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setAcademic({
                      ...academic,
                      exam_degree_title: e.target.value,
                    })
                  }
                  value={academic?.exam_degree_title}
                />
              </label>
              <label>
                <p className="text-[17px] font-[500] mb-2">
                  {" "}
                  Concentration/ Major/Group
                </p>
                <input
                  className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setAcademic({
                      ...academic,
                      concentration_major: e.target.value,
                    })
                  }
                  value={academic?.concentration_major}
                />
              </label>
              <label>
                <p className="text-[17px] font-[500] mb-2"> Year of Passing</p>
                <input
                  className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                  type="text"
                  name="name"
                  onChange={(e) =>
                    setAcademic({
                      ...academic,
                      year_of_passing: e.target.value,
                    })
                  }
                  value={academic?.year_of_passing}
                />
              </label>
            </div>
          </div>
        </form>

        <div className="flex items-center gap-4 w-full  rounded-[8px] outline-none border-2 bg-white mt-4">
          <div className="w-[90px]  bg-[#1e3767] rounded-l-[8px]">
            <FileUplod setFile={setAcademic_file} />
          </div>
          <h2>
            {(academic_file && academic_file?.name) ||
              academic_file?.slice(27, academic_file?.length)}
          </h2>
        </div>
        {uploadError && (
          <p className="text-red-500 text-sm mt-1">{uploadError}</p>
        )}
      </div>

      <div className=" flex gap-4 items-center justify-end">
        <button
          onClick={() => {
            setPage("Job Experience");
            next();
          }}
          className="py-[12px] lg:px-[40px] px-[30px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          Skip
        </button>
        <button
          onClick={() => {
            setPage("Address");
            pre();
          }}
          className="py-[12px] lg:px-[40px] px-[30px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          <img src={right_arow} className="rotate-180" /> Back
        </button>

        <button
          onClick={handleNextPage}
          className="py-[12px] lg:px-[40px] px-[30px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          Next <img src={right_arow} />
        </button>
      </div>
    </div>
  );
};

export default Registration_3;
