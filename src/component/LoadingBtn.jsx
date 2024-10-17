import React from "react";
import Loading from "./Loading";

const LoadingBtn = ({ loading, handleSubmit, children }) => {
  return (
    <button
      disabled={loading}
      onClick={handleSubmit}
      type="button"
      className={`px-[40px] py-[12px] bg-[#1E3767] rounded-[8px] text-white  transition-transform active:scale-95 ${
        loading ? "opacity-80" : ""
      }`}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};

export default LoadingBtn;
