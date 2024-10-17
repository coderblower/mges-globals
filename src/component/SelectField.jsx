import React from "react";

const SelectField = ({ value, setValue, options = [], title }) => {
  return (
    <div className="flex-1">
      <p className="text-[17px] font-[500] mb-2 text-[#202020]">{title}</p>
      <select
        onChange={(e) => setValue(e.target.value)}
        value={value}
        className="px-6 py-[13px] w-full  rounded-md outline-none border-2 border-[#C5BFBF]"
      >
        <option value="">--select--</option>
        {options &&
          options.map((data) => (
            <option key={data?.name} value={data?.id}>
              {data?.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectField;
