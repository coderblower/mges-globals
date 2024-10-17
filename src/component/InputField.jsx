import React from "react";

const InputField = ({ value, setValue, type = "text", placeholder, title }) => {
  return (
    <div className="flex-1">
     {title? (<p className="text-[17px] font-[500] mb-2 text-[#202020]">{title}</p>): '' }
      <input
        className={` px-6 py-[13px] border-2 border-[#C5BFBF] text-gray-700 font-[500] w-full rounded-md outline-none 
        transition-all duration-300 ease-in-out transform hover:border-[#1E3767] hover:scale-105   active:scale-95 relative overflow-hidden cursor-pointer `}
        type={type}
        onChange={(e) => setValue? setValue(e.target.value):''}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
