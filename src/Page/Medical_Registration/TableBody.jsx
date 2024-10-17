import React, { useRef, useState } from "react";
import Loading from "../../component/Loading";
// import useFileUpload from "../../hook/useFileUpload";

const TableBody = ({ data, setNewData }) => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  //   setNewData((pre) => [
  //     ...pre,
  //     {
  //       id: data.id,
  //       test_name: data.test[0].name,
  //       status: status,
  //       file: url,
  //     },
  //   ]);

  const onSelectFile = async (e) => {
    handleFileChange(e);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <tr key={data.id} className="whitespace-nowrap text-[#4D4D4D] font-[500]">
      <th className="text-center">{data?.id}</th>
      <th className="text-center">{data?.test[0].name}</th>
      {/* <th className="text-center">
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="fit">Fit</option>
          <option value="unfit">UnFit</option>
        </select>
      </th>
      <th className="text-center">
        <button
          disabled={loading}
          onClick={handleButtonClick}
          className={`bg-[#1E3767] font-[500] px-[20px] py-[6px] text-white text-[14px] rounded-[8px] ${
            loading ? "opacity-80" : ""
          }`}
        >
          {loading ? <Loading /> : "  Upload"}
        </button>

        <input
          className="hidden"
          id="Images"
          type="file"
          name="images"
          onChange={onSelectFile}
          ref={fileInputRef}
        />
      </th> */}
    </tr>
  );
};

export default TableBody;
