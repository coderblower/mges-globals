import React from "react";
import right_arow from "../../../public/images/right_arow.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { post } from "../../api/axios";
import FileUplod from "../FileUplod";
import InputField from "../InputField";
import SelectField from "../SelectField";

const PersonalInformation = ({
  setPage,
  next,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumber,
  setPhoneNumber,
  religion,
  setReligion,
  fathersName,
  setFathersName,
  marital_status,
  spousesName,
  setSpousesName,
  spouses_birth_date,
  setSpouses_birth_date,
  setMarital_status,
  gender,
  setGender,
  nid,
  setNid,
  country,
  setCountry,
  passport,
  setPassport,
  mothersName,
  setMothersName,
  birth_date,
  setBirth_date,
  medical,
  setMedical,
  designation_id,
  setDesignation_id,
  passport_file,
  setPassport_file,
  expireDate,
  setExpireDate,
  nid_file,
  setNid_file,
  visitRussiaNumber,
  setVisitRussiaNumber,
  russia_trip_date,
  setRussia_trip_date,
  hostOrganization,
  setHostOrganization,
  route_Journey,
  setRoute_Journey,
  relativesStaying,
  setRelativesStaying,
  refusedRussian,
  setRefusedRussian,
  deportedRussia,
  setDeportedRussia,
  dateOfIssue,
  setDateOfIssue,
  referred_by,
  setreferenceBy,
  isVisitOpen,
  setIsVisitOpen,
  relativeStaying,
  setRelativeStaying,
  isUpdateCandidate,
}) => {
  const location = useLocation();
  const [medicalList, setMedicalList] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [country_list, setCountry_list] = useState([]);
  const [quota, setAllQuota] = useState();
  const [quotaError, setQuotaError] = useState("");
  const [formErrors, setFormErrors] = useState({
    // firstName: "",
    fathersName: "",
    mothersName: "",
    phoneNumber: "",
    birth_date: "",
    nid: "",
    passport: "",
    passport_file: "",
    nid_file: "",
  });

  // get current user
  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setData(user_data);
  }, []);
  const [data, setData] = useState(null);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      // firstName: "",
      fathersName: "",
      mothersName: "",
      phoneNumber: "",
      birth_date: "",
      passport: "",
      nid: "",
      passport_file: "",
      nid_file: "",
    };

    // if (country === "1") {
    //   if (!firstName) {
    //     isValid = false;
    //     errors.firstName = "FirstName Name is required.";
    //   }
    // }

    if (!fathersName) {
      isValid = false;
      errors.fathersName = "Father’s Name is required.";
    }
    if (!mothersName) {
      isValid = false;
      errors.mothersName = "Mother’s Name is required.";
    }
    if (!phoneNumber) {
      isValid = false;
      errors.phoneNumber = "Phone Number is required.";
    }
    if (!birth_date) {
      isValid = false;
      errors.birth_date = "Date of Birth is required.";
    }
    if (!nid) {
      isValid = false;
      errors.nid = "NID/Birth Certificate is required.";
    }
    if (!passport) {
      isValid = false;
      errors.passport = "Passport Number  is required.";
    }
    if (!passport_file) {
      isValid = false;
      errors.passport_file = "Passport file  is required.";
    }

    if (!nid_file) {
      isValid = false;
      errors.nid_file = "NID file file  is required.";
    }
    // toast.error("Please Fill up all the Requird field");
    setFormErrors(errors);
    return isValid;
  };

  const handleQuotaCheck = () => {
    const filteredQuota = quota.filter(
      (item) =>
        item?.country_id == country &&
        item?.agent?.name === data?.name &&
        item?.designation_id == designation_id &&
        item?.quota > item?.quota_used
    );

    const filteredQuota2 = quota.filter(
      (item) =>
        item?.country_id == country &&
        item?.agent?.name === data?.name &&
        item?.designation_id == designation_id
    );

    if (filteredQuota?.length > 0 || filteredQuota2) {
      console.log(filteredQuota);
      console.log(filteredQuota2);

      if (filteredQuota2) {
        const filteredQuota3 = quota.filter(
          (item) =>
            item?.country_id == country &&
            item?.agent?.name === data?.name &&
            item?.designation_id == designation_id &&
            item?.quota === 0
        );
        return filteredQuota3 && true;
      } else {
        return true;
      }
    } else {
      console.log(filteredQuota);
      setQuotaError("Your Designation quota limit is over !");
      return false;
    }
  };

  const handleNextPage = () => {
    // if (data?.role_id === 4 && !handleQuotaCheck()) {
    //   console.log("Not get data");
    //   return;
    // }

    // if (handleQuotaCheck()) {
    //   console.log("Get Data Success");
    //   return;
    // }

    if (!validateForm()) {
      return;
    }

    if (
      expireDate ||
      location.pathname.includes("/admin/user_update") ||
      location.pathname.includes("/agent_panel/user_update")
    ) {
      const currentDate = new Date();
      const expireDateObject = new Date(expireDate);
      const timeDifference = expireDateObject.getTime() - currentDate.getTime();
      const yearsDifference = timeDifference / (1000 * 60 * 60 * 24 * 365);

      if (country === "1") {
        if (
          yearsDifference >= 1.5 ||
          location.pathname.includes("/admin/user_update") ||
          location.pathname.includes("/agent_panel/user_update")
        ) {
          setPage("Address");
          next();
        } else {
          toast.error("Your passport needs at least 1.5 year of validity");
        }
      } else {
        if (
          yearsDifference >= 1 ||
          location.pathname.includes("/admin/user_update") ||
          location.pathname.includes("/agent_panel/user_update")
        ) {
          setPage("Address");
          next();
        } else {
          toast.error("Your passport needs at least 1 year of validity");
        }
      }
    } else {
      toast.error("Invalid expiration date");
    }
  };

  // console.log(designation_id);

  useEffect(() => {
    fetchMedical();
    fetchDesignation();
    fetchCountry();
    fetchAllQuota();
  }, []);

  const fetchCountry = async () => {
    try {
      const response = await post(`api/country/all`);
      console.log(response);
      setCountry_list(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  const fetchDesignation = async () => {
    try {
      const response = await post(`api/designation/all`);
      console.log(response);
      setDesignation(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  const fetchMedical = async () => {
    try {
      const res = await post(`api/user/group_by`, {
        role_id: 3,
      });
      if (res.success) {
        setMedicalList(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Get all Quota
  const fetchAllQuota = async () => {
    try {
      const response = await post(`api/agent/quota_all`);
      console.log(response);
      setAllQuota(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  return (
    <div>
      <div className="bg-[#F5F5F5] rounded-md lg:p-14 p-3 ">
        {/* Input feald */}

        <div className="flex justify-center mb-[40px]">
          <div className="lg:w-[50%]">
            <SelectField
              title="Select Country for Medical Purpose"
              value={country}
              setValue={setCountry}
              options={country_list}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8">
          <div>
            {/* <InputField
              title="Frist Name* (as in Passport)"
              value={firstName}
              setValue={setFirstName}
              placeholder="Enter your First Name"
            /> */}

            <div className="flex-1">
              <p className="text-[17px] font-[500] mb-2 text-[#202020]">
                Frist Name
              </p>
              <input
                className={`px-6 py-[13px] border-2 border-[#C5BFBF] text-gray-700 font-[500]  w-full  rounded-md outline-none`}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                // placeholder={placeholder}
                readOnly={isUpdateCandidate ? false : true}
              />
            </div>

            {/* {formErrors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.firstName}
              </p>
            )} */}
          </div>
          <div>
            {/* <InputField
              title="Last Name (as in Passport)"
              value={lastName}
              setValue={setLastName}
              placeholder="Enter your last Name"
            /> */}

            <div className="flex-1">
              <p className="text-[17px] font-[500] mb-2 text-[#202020]">
                Last Name
              </p>
              <input
                className={`px-6 py-[13px] border-2 border-[#C5BFBF] text-gray-700 font-[500]  w-full  rounded-md outline-none`}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                // placeholder={placeholder}
                readOnly={isUpdateCandidate ? false : true}
              />
            </div>
          </div>

          <div>
            <InputField
              title="Father’s Name*"
              value={fathersName}
              setValue={setFathersName}
              placeholder="Enter your Father’s Name"
            />
            {formErrors.fathersName && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.fathersName}
              </p>
            )}
          </div>
          <div>
            <InputField
              title="Mother’s Name*"
              value={mothersName}
              setValue={setMothersName}
              placeholder="Enter your  Mother’s Name"
            />
            {formErrors.mothersName && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.mothersName}
              </p>
            )}
          </div>
          <div>
            <InputField
              title="Phone Number*"
              value={phoneNumber}
              setValue={setPhoneNumber}
              placeholder="Enter your Phone Number"
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.phoneNumber}
              </p>
            )}
          </div>

          {country === "1" && (
            <InputField
              title="Date of Issue"
              value={dateOfIssue}
              setValue={setDateOfIssue}
              placeholder="Enter your Date of Issue"
            />
          )}
          <div>
            <InputField
              type="date"
              title="Date of Birth*"
              value={birth_date}
              setValue={setBirth_date}
              placeholder="Enter your Date of Birth"
            />
            {formErrors.birth_date && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.birth_date}
              </p>
            )}
          </div>
          <div>
            <div className="flex items-end gap-4 ">
              <div className="w-[100%] ">
                <InputField
                  title="NID/Birth Certificate*"
                  value={nid}
                  setValue={setNid}
                  placeholder="Enter your NID/Birth Certificate"
                />
              </div>
            </div>
            {formErrors.nid && (
              <p className="text-red-500 text-sm mt-1">{formErrors.nid}</p>
            )}
          </div>
          {/* <div className="mb-2">
            <p className="text-[17px] font-[500] mb-2 text-[#202020]">
              NID/Birth Certificate File
            </p>
            <FileUplod setFile={setNid_file} />
          </div> */}

          <div>
            <p className="text-[17px] font-[500] mb-2">
              NID/Birth Certificate File*
            </p>
            <div
              className={`flex items-center gap-4  border-2 border-[#C5BFBF] text-gray-700 font-[500]  w-full  rounded-md outline-none bg-white cursor-pointer`}
            >
              <div className="w-[90px] py-[5px]  bg-[#1e3767] rounded-l-[5px]">
                <FileUplod setFile={setNid_file} />
              </div>
              <h2>
                {(nid_file && nid_file?.name) ||
                  nid_file?.slice(27, nid_file?.length)}
              </h2>
            </div>
            {formErrors.nid_file && (
              <p className="text-red-500 text-sm mt-1">{formErrors.nid_file}</p>
            )}
          </div>

          <div>
            <div className="flex items-end gap-4 ">
              <div className="w-[100%]">
                <InputField
                  title="Passport Number*"
                  value={passport}
                  setValue={setPassport}
                  placeholder="Enter your Passport Number"
                />
              </div>
              {/* <div className="mb-2">
                <FileUplod setFile={setPassport_file} />
              </div> */}
            </div>
            {formErrors.passport && (
              <p className="text-red-500 text-sm mt-1">{formErrors.passport}</p>
            )}
          </div>

          <div>
            <p className="text-[17px] font-[500] mb-2">Passport File*</p>
            <div
              className={`flex items-center gap-4  border-2 border-[#C5BFBF] text-gray-700 font-[500]  w-full  rounded-md outline-none bg-white cursor-pointer`}
            >
              <div className="w-[90px] py-[5px]  bg-[#1e3767] rounded-l-[5px]">
                <FileUplod setFile={setPassport_file} />
              </div>
              <h2>
                {(passport_file && passport_file?.name) ||
                  passport_file?.slice(27, passport_file?.length)}
              </h2>
            </div>
            {formErrors.passport_file && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.passport_file}
              </p>
            )}
          </div>

          <InputField
            type="date"
            title="Passport Expiry Date"
            value={expireDate}
            setValue={setExpireDate}
            placeholder="Enter your Expiry Date"
          />
          <SelectField
            title="Select Medical Center"
            value={medical}
            setValue={setMedical}
            options={medicalList}
          />

          <div>
            <SelectField
              title="Designation"
              value={designation_id}
              setValue={setDesignation_id}
              options={designation}
            />
            {quotaError && (
              <p className="text-red-500 text-sm mt-1">{quotaError}</p>
            )}
          </div>
        </div>

        <div className="mt-8 mb-7">
          <InputField
            title="Reference By"
            value={referred_by}
            setValue={setreferenceBy}
            placeholder="Enter your Reference Name"
          />
        </div>

        {/* Visite Russia */}
        {country === "1" && (
          <div className="mt-3 mb-7">
            <div className="mb-3 ">
              <h2 className="font-bold text-[18px] text-[#202020]">
                Have you ever traveled to Russia?
              </h2>

              {/* <input
                onClick={() => setIsVisitOpen(!isVisitOpen)}
                type="checkbox"
                name=""
                id=""
              /> */}

              <div className="flex gap-9 mt-3">
                <div>
                  <input
                    type="radio"
                    name="traveledyes"
                    id="traveledyes"
                    required=""
                    className="mr-2"
                    onClick={() => setIsVisitOpen(true)}
                    checked={isVisitOpen === true} // Set checked attribute based on the current value of gender
                  />
                  <label className="text-[#202020]" htmlFor="traveledyes">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="traveledNo"
                    id="traveledNo"
                    required=""
                    className="mr-2"
                    onClick={() => setIsVisitOpen(false)}
                    checked={isVisitOpen === false} // Set checked attribute based on the current value of marital_status
                  />
                  <label className="text-[#202020]" htmlFor="traveledNo">
                    No
                  </label>
                </div>
              </div>
            </div>

            {isVisitOpen ? (
              <div className="flex gap-4 mb-7">
                <InputField
                  title="How many times have you been to Russia"
                  value={visitRussiaNumber}
                  setValue={setVisitRussiaNumber}
                  placeholder="Enter your Number"
                />
                <InputField
                  type="date"
                  title=" Date of last trip to Russia"
                  value={russia_trip_date}
                  setValue={setRussia_trip_date}
                  placeholder="Enter your Organization Name"
                />
              </div>
            ) : null}

            <div className="flex gap-4 ">
              <InputField
                title="Name of host organization you intend to visit"
                value={hostOrganization}
                setValue={setHostOrganization}
                placeholder="Enter your Organization Name"
              />
              <InputField
                title="Route of Journey"
                value={route_Journey}
                setValue={setRoute_Journey}
                placeholder="Enter your Route Name"
              />
            </div>

            <div className="mt-7 ">
              <h2 className="font-bold text-[18px] text-[#202020]">
                Have you got relatives staying in Russia now ?
              </h2>
              {/* <input
                onClick={() => setRelativeStaying(!relativeStaying)}
                type="checkbox"
                name=""
                id=""
              /> */}
              <div className="flex gap-9 mt-3">
                <div>
                  <input
                    type="radio"
                    name="relativesyes"
                    id="relativesyes"
                    required=""
                    className="mr-2"
                    onClick={() => setRelativeStaying(true)}
                    checked={relativeStaying === true} // Set checked attribute based on the current value of gender
                  />
                  <label className="text-[#202020]" htmlFor="relativesyes">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="relativesRefused"
                    id="relativesRefused"
                    required=""
                    className="mr-2"
                    onClick={() => setRelativeStaying(false)}
                    checked={relativeStaying === false} // Set checked attribute based on the current value of marital_status
                  />
                  <label className="text-[#202020]" htmlFor="relativesRefused">
                    No
                  </label>
                </div>
              </div>
            </div>

            {relativeStaying && (
              <div className="mt-4">
                <InputField
                  title=""
                  value={relativesStaying}
                  setValue={setRelativesStaying}
                  placeholder="Enter Your Relatives  Name"
                />
              </div>
            )}

            <div className=" mt-7 lg:flex gap-5">
              <div className="lg:w-1/2">
                <h2 className="font-bold mb-3 text-[18px] text-[#202020]">
                  Have you ever been refused a Russian Visa ?
                </h2>
                <div className="flex gap-9">
                  <div>
                    <input
                      type="radio"
                      name="yes"
                      id="yes"
                      required=""
                      className="mr-2"
                      onClick={() => setRefusedRussian("yes")}
                      checked={refusedRussian === "yes"} // Set checked attribute based on the current value of gender
                    />
                    <label className="text-[#202020]" htmlFor="yes">
                      Yes
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="Refused"
                      id="Refused"
                      required=""
                      className="mr-2"
                      onClick={() => setRefusedRussian("no")}
                      checked={refusedRussian === "no"} // Set checked attribute based on the current value of marital_status
                    />
                    <label className="text-[#202020]" htmlFor="Refused">
                      No
                    </label>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2">
                <h2 className="font-bold text-[18px] mb-3 lg:mt-0 mt-3 text-[#202020]">
                  Have you ever been deported from Russia ?
                </h2>

                <div className="flex gap-9">
                  <div>
                    <input
                      type="radio"
                      name="deported"
                      id="deported"
                      required=""
                      className="mr-2"
                      onClick={() => setDeportedRussia("yes")}
                      checked={deportedRussia === "yes"} // Set checked attribute based on the current value of marital_status
                    />
                    <label className="text-[#202020]" htmlFor="deported">
                      Yes
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="deported"
                      id="deportedNo"
                      required=""
                      className="mr-2"
                      onClick={() => setDeportedRussia("no")}
                      checked={deportedRussia === "no"} // Set checked attribute based on the current value of marital_status
                    />
                    <label className="text-[#202020]" htmlFor="deportedNo">
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Gender and Marital Status
         */}
        <div className=" mt-[40px] lg:flex gap-5">
          <div className="lg:w-1/2">
            <h2 className="font-bold mb-3 text-[18px] text-[#202020]">
              Gender
            </h2>
            <div className="flex gap-9">
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="Male"
                  required=""
                  className="mr-2"
                  onClick={() => setGender("Male")}
                  checked={gender === "Male"} // Set checked attribute based on the current value of gender
                />
                <label className="text-[#202020]" htmlFor="Male">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  id="Female"
                  required=""
                  className="mr-2"
                  onClick={() => setGender("Female")}
                  checked={gender === "Female"} // Set checked attribute based on the current value of gender
                />
                <label className="text-[#202020]" htmlFor="Female">
                  Female
                </label>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="font-bold text-[18px] mb-3 lg:mt-0 mt-3 text-[#202020]">
              Marital Status
            </h2>

            <div className="flex gap-9">
              <div>
                <input
                  type="radio"
                  name="maritalStatus"
                  id="Single"
                  required=""
                  className="mr-2"
                  onClick={() => {
                    setMarital_status("Single");
                    setSpousesName("");
                    setSpouses_birth_date("");
                  }}
                  checked={marital_status === "Single"} // Set checked attribute based on the current value of marital_status
                />
                <label className="text-[#202020]" htmlFor="Single">
                  Single
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="maritalStatus"
                  id="Married"
                  required=""
                  className="mr-2"
                  onClick={() => setMarital_status("Married")}
                  checked={marital_status === "Married"} // Set checked attribute based on the current value of marital_status
                />
                <label className="text-[#202020]" htmlFor="Married">
                  Married
                </label>
              </div>
            </div>
            {country === "1" && marital_status === "Married" && (
              <div className="mt-6">
                <InputField
                  type="text"
                  title="Spouse's Full Name"
                  value={spousesName}
                  setValue={setSpousesName}
                  placeholder="Enter your Spouse's Full Name"
                />
                <div className="mt-6">
                  <InputField
                    type="date"
                    title="Spouse's Date Of Birth"
                    value={spouses_birth_date}
                    setValue={setSpouses_birth_date}
                    placeholder="Enter your Spouse's Date Of Birth"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Religion */}
        <div>
          <h2 className="font-bold mb-3 text-[18px] mt-7 text-[#202020]">
            Religion
          </h2>

          <div className="flex flex-wrap gap-4">
            <div className="flex gap-9">
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="Islam"
                  required=""
                  className="mr-2"
                  onClick={() => setReligion("Islam")}
                  checked={religion === "Islam"} // Set checked attribute based on the current value of religion
                />
                <label className="text-[#202020]" htmlFor="Islam">
                  Islam
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="Hindu"
                  required=""
                  className="mr-2"
                  onClick={() => setReligion("Hindu")}
                  checked={religion === "Hindu"} // Set checked attribute based on the current value of religion
                />
                <label className="text-[#202020]" htmlFor="Hindu">
                  Hindu
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="Christian"
                  required=""
                  className="mr-2"
                  onClick={() => setReligion("Christian")}
                  checked={religion === "Christian"}
                />
                <label className="text-[#202020]" htmlFor="Christian">
                  Christian
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="Buddhist"
                  required=""
                  className="mr-2"
                  onClick={() => setReligion("Buddhist")}
                  checked={religion === "Buddhist"}
                />
                <label className="text-[#202020]" htmlFor="Buddhist">
                  Buddhist
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="religion"
                  id="Other"
                  required=""
                  className="mr-2"
                  onClick={() => setReligion("Other")}
                  checked={religion === "Other"}
                />
                <label className="text-[#202020]" htmlFor="Other">
                  Other
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex items-center justify-end lg:mb-10">
        <button
          onClick={handleNextPage}
          className="py-[12px] px-[40px]  bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2 transition-transform active:scale-95"
          type="button"
        >
          Next <img src={right_arow} />
        </button>
      </div>
    </div>
  );
};

export default PersonalInformation;
