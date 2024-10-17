import React from "react";

const TextTitle = ({ title, data }) => {
  return (
    <div>
      <h2 className="font-bold text-[15px] mt-2">
        {title} <span className="font-normal">{data || "Not found"}</span>
      </h2>
    </div>
  );
};

export default TextTitle;
