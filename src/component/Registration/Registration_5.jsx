import right_arow from "../../../public/images/right_arow.svg";
import { useState } from "react";
import FileUplod from "../FileUplod";

const Registration_5 = ({
  setPage,
  next,
  training,
  setTraining,
  pre,
  training_file,
  setTraining_file,
}) => {
  const [uploadError, setUploadError] = useState("");

  return (
    <div className="lg:mb-10">
      <div>
        <div className="bg-[#D9D9D9] rounded-md lg:px-[100px] px-[10px] lg:py-[75px] py-[40px]">
          <h3 className="text-[20px] font-bold mb-5">Training-1</h3>
          <form>
            <div className="lg:flex gap-5">
              <div className="lg:w-1/2">
                <label>
                  <p className="text-[17px] font-[500] mb-2">Training Title</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        training_title: e.target.value,
                      })
                    }
                    value={training?.training_title}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2">Topics Covered</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        topics_covered: e.target.value,
                      })
                    }
                    value={training?.topics_covered}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2"> Institute </p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        institute: e.target.value,
                      })
                    }
                    value={training?.institute}
                  />
                </label>
              </div>
              <div className="lg:w-1/2">
                <label>
                  <p className="text-[17px] font-[500] mb-2">Country </p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="text"
                    name="name"
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        country: e.target.value,
                      })
                    }
                    value={training?.country}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2"> Training Year</p>
                  <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="number"
                    name="name"
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        training_year: e.target.value,
                      })
                    }
                    value={training?.training_year}
                  />
                </label>
                <label>
                  <p className="text-[17px] font-[500] mb-2"> Duration </p>
                  {/* <input
                    className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                    type="number"
                    name="name"
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        duration: e.target.value,
                      })
                    }
                    value={training?.duration}
                  /> */}

                  <select
                    value={training?.duration}
                    onChange={(e) =>
                      setTraining({
                        ...training,
                        duration: e.target.value,
                      })
                    }
                    className=" px-2 p-[10px] w-full  mb-5 rounded-md outline-none"
                  >
                    <option value="">-- Set Duration --</option>
                    <option value="1 Month">1 Month</option>
                    <option value="3 Month">3 Month</option>
                    <option value="6 Month">6 Month</option>
                    <option value="1 Year">1 Year</option>
                  </select>
                </label>
              </div>
            </div>
          </form>

          <div className="flex items-center gap-4 w-full  rounded-[8px] outline-none border-2 bg-white mt-4">
            <div className="w-[90px]  bg-[#1e3767] rounded-l-[8px]">
              <FileUplod setFile={setTraining_file} />
            </div>
            <h2>
              {(training_file && training_file?.name) ||
                training_file?.slice(27, training_file?.length)}
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
            setPage("Upload photo");
            next();
          }}
          className="py-[12px] px-[40px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          Skip
        </button>
        <button
          onClick={() => {
            setPage("Job Experience");
            pre();
          }}
          className="py-[12px] px-[40px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          <img src={right_arow} className="rotate-180" /> Back
        </button>

        <button
          onClick={() => {
            if (!training_file) {
              setUploadError("Training file is required.");
              return;
            }
            setUploadError("");
            setPage("Upload photo");
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

export default Registration_5;
