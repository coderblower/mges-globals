import React, { useState } from "react";
import search_icon from "../assets/search_icon.svg";

const SearchInput = ({
  newSearchValue,
  setNewSearchValue,
  setSearch,
  placeholder,
}) => {
  return (
    <div className="flex bg-[#D9D9D9] rounded-full ">
      <input
        value={newSearchValue}
        onChange={(e) => setNewSearchValue(e.target.value)}
        className={` bg-transparent px-5 py-2 outline-none input_aprarnce_none w-full`}
        // className={` bg-transparent px-5 py-2 ${
        //   medicalReports ? "w-[205px]" : "w-[300px]"
        // } outline-none input_aprarnce_none`}
        type="text"
        placeholder={placeholder}
      />
      {/* <img src={search_icon} /> */}
      <button
        onClick={() => setSearch(newSearchValue)}
        className="bg-[#1E3767] text-white px-4 py-2 rounded-r-full"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
