import React, { useRef } from "react";

const FileUplod = ({ setFile, isPIF }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <div
        onClick={handleButtonClick}
        className={`bg-[#1E3767] font-[500] px-[20px] py-[10px] text-white text-[14px] rounded-[8px] cursor-pointer`}
      >
        {isPIF ? (
          <h1 className="py-[7px] text-[17px] font-[600] ">Upload PIF File</h1>
        ) : (
          <>Upload</>
        )}
      </div>

      <input
        className="hidden"
        id="Images"
        type="file"
        name="images"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileUplod;
