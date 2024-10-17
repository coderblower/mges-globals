import React from "react";

const Select = ({ data, setData, option }) => {
  return (
    <select
      value={data}
      onChange={(e) => setData(e.target.value)}
      className=" px-2 p-[8px]  mb-5 rounded-md outline-none border-2 border-[#C5BFBF]"
    >
      <option value="">--select--</option>
      {option &&
        option.map((data) => (
          <option key={data.id} value={data?.id}>
            {data?.name}
          </option>
        ))}
    </select>
  );
};

export default Select;
