import React from "react";
import { CSVLink } from "react-csv";

const CSVBtn = ({ data, filename }) => {
  return (
    <CSVLink
      data={data}
      className="bg-[#1E3767] text-white px-4 py-2 rounded-lg"
      filename={filename}
    >
      CSV
    </CSVLink>
  );
};

export default CSVBtn;
