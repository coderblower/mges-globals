import { useRef, useState } from "react";
import upload from "../../../public/images/upload.png";
import Loading from "../../component/Loading";
import toast, { Toaster } from "react-hot-toast";
const API_URL = import.meta.env.VITE_BASE_URL;

const Registration_6 = ({
  setPage,
  next,
  photo,
  setPhoto,
  handleSubmit,
  loading,
}) => {
  const [img, setImg] = useState(null);
  const fileInputRef = useRef(null);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "png", "svg"];
      const extension = file.name.split(".").pop().toLowerCase();

      if (allowedExtensions.includes(extension)) {
        setPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImg(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // Show toast error message
        toast.error("Invalid file type. Please upload a valid image file.");
        // Optionally, you can clear the input value
        e.target.value = null;
        setImg(null);
        setPhoto(null);
      }
    } else {
      setImg(null);
      setPhoto(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // console.log(img);
  return (
    <div className="lg:mb-10">
      <div>
        <div className="lg:flex items-center justify-center mt-[80px] mb-[50px]">
          <div>
            {img || photo ? (
              <div className="h-[342px] lg:w-[318px]  flex items-center justify-center">
                <img
                  src={img || `${API_URL}/${photo}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <label htmlFor="file_uplod">
                <div className="h-[342px] lg:w-[318px] bg-[#D9D9D9] rounded-md flex items-center justify-center cursor-pointer">
                  <div className="flex flex-col items-center">
                    <img className="w-[90px] h-[90px]" src={upload} alt="" />
                    <h2 className="underline text-[20px] font-bold cursor-pointer">
                      Browse
                    </h2>
                  </div>
                </div>
              </label>
            )}
            <input
              type="file"
              onChange={handleFileChange}
              id="file_uplod"
              className="hidden"
              ref={fileInputRef}
            />
            <div className="lg:flex lg:items-center lg:gap-4 mt-4">
              {!img ? (
                <button
                  onClick={triggerFileInput}
                  className=" text-center transition-transform active:scale-95 py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md  w-full"
                >
                  <h3>Upload</h3>
                </button>
              ) : (
                <button
                  onClick={triggerFileInput}
                  className=" text-center transition-transform active:scale-95 py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md  w-full"
                >
                  <h3>Change</h3>
                </button>
              )}
            </div>
            {uploadError && (
              <p className="text-red-500 text-sm mt-1">{uploadError}</p>
            )}
          </div>
        </div>
      </div>
      <div className=" flex gap-4 items-center justify-end">
        <button
          onClick={() => setPage("/user_registration")}
          className="py-[12px] px-[40px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          Review
        </button>

        {/* // <button 
          onClick={() => {
            setPage("logout");
            next();
          }}
          onClick={handleSubmit}
          className="py-3 px-6 bg-[#FFC11D] text-white font-bold rounded-md mt-5 flex gap-2"
          type="button"
        >
          Submit
        </button> */}

        <button
          className={`py-[12px] px-[40px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2 ${
            loading ? "opacity-80" : ""
          }`}
          onClick={() => {
            if (!photo) {
              setUploadError("Photo upload is required.");
              return;
            }
            setUploadError("");
            handleSubmit();
          }}
          disabled={loading}
        >
          {loading ? <Loading /> : "Submit"}
        </button>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Registration_6;
