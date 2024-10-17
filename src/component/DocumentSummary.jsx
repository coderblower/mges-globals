import React, { useEffect, useState } from "react";
import { post } from "../api/axios";
import Loading from "./Loading";

const DocumentSummary = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAgent();
  }, []);

  const fetchAgent = async () => {
    setLoading(true);
    try {
      const response = await post("api/agent/percentages");
      console.log(response);
      setData(response);
    } catch (error) {
      console.log("Error creating app:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(data);

  let num = 12.3456;
  return (
    <div className="lg:mt-10 mt-2">
      <h2 className="font-bold text-[24px] ">Document Summary</h2>
      <div className="overflow-auto mt-6">
        <table className="table table-zebra  overflow-x-auto">
          {/* head */}
          <thead className=" border-b-2">
            <tr className="uppercase bg-[#f2f2f2] whitespace-nowrap border-2 border-gray-300">
              <th className="border-r-[1px] border-gray-300">Agent</th>
              <th className="border-r-[1px] border-gray-300 text-center">
                Total
              </th>
              <th
                className="border-r-[1px] border-gray-300 text-center font-bold"
                colspan="2"
              >
                photo
              </th>
              <th
                className="border-r-[1px] border-gray-300 text-center"
                colspan="2"
              >
                NID File
              </th>
              <th
                className="border-r-[1px] border-gray-300 text-center"
                colspan="2"
              >
                Passport File
              </th>
              <th
                className="border-r-[1px] border-gray-300 text-center"
                colspan="2"
              >
                Academic File
              </th>
              <th
                className="border-r-[1px] border-gray-300 text-center"
                colspan="2"
              >
                Experience File
              </th>
              <th
                className="border-r-[1px] border-gray-300 text-center"
                colspan="2"
              >
                Training File
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data?.length > 0 &&
              data?.map((item) => {
                console.log(typeof item?.percentage_with_training);
                return (
                  <tr className="border-2 border-gray-300 whitespace-nowrap">
                    <td className="border-r-[1px] border-gray-300 ">
                      <h1 className="">{item?.user_name}</h1>
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.can_count}
                    </td>

                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.can_with_photo_count}
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.percentage_with_photo.toFixed(1)}%
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.can_with_nid_count}
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.percentage_with_nid.toFixed(1)}%
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.can_with_passport_count}
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.percentage_with_passport.toFixed(1)}%
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.can_with_academic_count}
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.percentage_with_academic.toFixed(1)}%
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.can_with_experience_count}
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.percentage_with_experience.toFixed(1)}%
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.can_with_training_count}
                    </td>
                    <td className="border-r-[1px] border-gray-300 text-center">
                      {item?.percentage_with_training.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DocumentSummary;
