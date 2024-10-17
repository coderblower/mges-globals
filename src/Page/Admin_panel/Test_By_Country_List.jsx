import React, { useEffect, useState } from "react";
import delete_icon from "../../../public/images/delete_icon.svg";
import pen_icon from "../../../public/images/pen_icon.svg";
import { post } from "../../api/axios";

const Test_By_Country_List = () => {
  const [testCountry, setTestCountry] = useState([]);

  useEffect(() => {
    fetchTestCountry();
  }, []);

  const fetchTestCountry = async () => {
    try {
      const response = await post(`api/test_by_country/all`);
      console.log(response);
      setTestCountry(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  console.log(testCountry[0]?.test.name);

  return (
    <div className="lg:mt-10 mt-2 w-full">
      <h3 className="font-bold  mb-5 text-[24px] ">Test By Country List</h3>
      <table className="table table-zebra  overflow-x-auto">
        {/* head */}
        <thead className=" border-b-2">
          <tr className="uppercase bg-[#f2f2f2]">
            <th>Name</th>
            <th>Test</th>
            <th className="text-end pr-8">Action</th>
          </tr>
        </thead>
        <tbody>
          {testCountry?.length > 0 &&
            testCountry?.map((data) => (
              <tr key={data.id}>
                <td>{data.country.name}</td>
                <td>{data.test?.name}</td>
                <td className="flex justify-end">
                  <div className="flex items-center gap-7">
                    <button onClick={() => cuntryUpdate()}>
                      <img src={pen_icon} alt="" />
                    </button>
                    {/* <button onClick={() => hadelDelete()}>
                      <img src={delete_icon} alt="" />
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Test_By_Country_List;
