import React, { useEffect, useState } from "react";
import { post } from "../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Test_By_Country = () => {
  const [loading, setLoading] = useState(false);
  const [selectCountry, setSelectCountry] = useState([]);
  const [selectTest, setSelectTest] = useState([]);
  const [countrys, setCountrys] = useState("");
  const [tests, setTests] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCountrys();
    fetchTest();
  }, []);

  // get all country
  const fetchCountrys = async () => {
    try {
      const response = await post(`api/country/all`);
      console.log(response);
      setCountrys(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  // Get all test
  const fetchTest = async () => {
    try {
      const response = await post(`api/medical_test_list/all`);
      console.log(response);
      setTests(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  const handelTest = (id) => {
    const numberId = parseInt(id);
    if (!selectTest.includes(numberId)) {
      setSelectTest([...selectTest, numberId]);
    } else if (selectTest.includes(numberId)) {
      setSelectTest(selectTest.filter((value) => value !== numberId));
    }
  };

  //  create country test
  const handelTestSubmit = async () => {
    const formData = {
      country_id: parseInt(selectCountry),
      test_id: selectTest,
    };

    console.log(formData);
    setLoading(true);
    try {
      const res = await post("api/test_by_country/create", formData);
      console.log(res);
      if (res.success) {
        setLoading(false);
        toast.success("Create Country successfully!");
        navigate("/admin/test_by_country_list");
      }
    } catch (error) {
      setLoading(false);
      toast.error("faild to Post");
      console.log("Failed to post/", error?.response.error);
    } finally {
      setLoading(false);
    }
  };

  // console.log(selectTest);
  return (
    <div className="mt-10">
      <h2 className="font-bold text-[24px] mb-[27px] ">Test By Country </h2>
      <div className="bg-[#F5F5F5] lg:p-[80px] px-[10px] py-[30px] rounde-[8px]">
        <p className="text-[17px] font-[500] mb-2 text-[#202020]">
          Select your Country
        </p>
        <select
          onChange={(e) => setSelectCountry(e.target.value)}
          value={selectCountry}
          className=" px-6 py-[13px] font-[500] lg:w-[40%] w-full text-gray-400 border-2 border-[#C5BFBF]  mb-5 rounded-md outline-none"
        >
          {countrys?.length > 0 &&
            countrys?.map((country, i) => (
              <option value={country?.id}>{country?.name}</option>
            ))}
        </select>

        <div className="">
          <h2 className="font-bold mb-3 text-[18px] text-[#202020]">
            Select your Test
          </h2>
          <div className="flex  ">
            <div className="gap-10 grid grid-cols-3 lg:grid-cols-7">
              {tests?.length > 0 &&
                tests?.map((test, i) => (
                  <div>
                    <input
                      onClick={(e) => handelTest(e.target.id)}
                      type="checkbox"
                      id={test?.id}
                      name="contact"
                    />
                    <label className="pl-2" htmlFor={test?.id}>
                      {test?.name}
                    </label>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-end lg:mt-4 mt-6">
          <button
            onClick={() => handelTestSubmit()}
            className="px-[40px] py-[12px] bg-[#1E3767] rounded-[8px] text-white "
          >
            Submit
          </button>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Test_By_Country;
