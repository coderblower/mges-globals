import React from "react";

const SelectInput = ({ data, setData, firstOption = "Filter by " }) => {
  return (
    <div className="relative my-3 w-[120px]">
      <select
        className="appearance-none bg-transparent border border-black  sm:text-sm rounded-lg outline-none w-full px-4 py-3 mb-3 inner_shadow placeholder:text-white/30"
        id="influencer_country"
        value={data}
        onChange={(e) => setData(e.target.value)}
      >
        <option value="" className="text-black">
          {firstOption}
        </option>
        <option value="fit" className="text-black">
          Fit
        </option>
        <option value="unfit" className="text-black">
          Unfit
        </option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mb-2">
        <svg
          fill="#333"
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 52 52"
          xmlSpace="preserve"
        >
          <path d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z" />
        </svg>
      </div>
    </div>
  );
};

export default SelectInput;
