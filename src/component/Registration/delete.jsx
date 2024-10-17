import user_img from "../../../public/images/user.jpg";
import bottom_arow from "../../../public/images/bottom_arrow.svg";
import right_arow from "../../../public/images/right_arow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import abater from "../../../public/images/Avater.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Registration_1 from "./Registration_1";
import Registration_2 from "./Registration_2";
import Registration_3 from "./Registration_3";
import Registration_6 from "./Registration_6";
import Registration_5 from "./Registration_5";
import Registration_4 from "./Registration_4";
import toast, { Toaster } from "react-hot-toast";
import { post } from "../../api/axios";

const Registration_1 = () => {
  const navigate = useNavigate();
  const [religion, setReligion] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [gender, setGender] = useState("");
  const [nid, setNid] = useState("");
  const [country, setCountry] = useState("");
  const [passport, setPassport] = useState("");
  const [mothersName, setMothersName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const logout = () => {
    post("api/logout");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  const [academic, setAcademic] = useState({
    level_of_education: "",
    institute_name: "",
    result: "",
    exam_degree_title: "",
    year_of_passing: "",
    concentration_major: "",
  });
  const [experience, setExperience] = useState({
    company_name: "",
    company_business: "",
    designation: "",
    department: "",
    employment_period_from: "",
    employment_period_to: "",
    company_location: "",
    total_year_of_experience: "",
  });
  const [training, setTraining] = useState({
    training_title: "",
    country: "",
    topics_covered: "",
    training_year: "",
    institute: "",
    duration: "",
  });
  const [address, setAddress] = useState({
    country: "",
    city: "",
    post_code: "",
    post_office: "",
    street_address: "",
    address: "",
  });

  const formArray = [1, 2, 3, 4, 5, 6];
  const formArray_new = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Address " },
    { id: 3, title: "Education" },
    { id: 4, title: "Job Experience" },
    { id: 5, title: "Training & skills" },
    { id: 6, title: "Upload photo" },
  ];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [page, setPage] = useState("Personal Information");

  // useEffect(() => {
  //   const json_data = window.localStorage.getItem("user");
  //   const user_data = JSON.parse(json_data);
  //   setData(user_data);
  // }, []);
  const [data, setData] = useState(null);
  const [fullName, setFullName] = useState(``);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const json_data = window.localStorage.getItem("user");
        if (json_data) {
          const user_data = JSON.parse(json_data);
          setData(user_data);
          setFullName(user_data?.name);
          setPhoneNumber(user_data?.phone);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fullName, phoneNumber]);

  console.log(105, phoneNumber, fullName);

  const handleSubmit = async () => {
    const payload = {
      id: data?.candidate?.id,
      gender: gender,
      marital_status: marital_status,
      religion: religion,
      nid,
      passport,
      fullName,
      father_name: fathersName,
      mother_name: mothersName,
      birth_date,
      country,
      is_active: 1,
      address,
      city: "Dhaka",
      academic,
      experience,
      training,
      photo,
      training_status: true,
      medical_status: true,
    };

    console.log(payload, "============>");

    setLoading(true);
    try {
      const res = await post("api/candidate/update", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.success) {
        navigate("/user_registration/registration_6");
        toast.success(res.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("faild to Post");
      console.log("Failed to post/", error);
    } finally {
      setLoading(false);
    }
  };

  const next = () => {
    if (formNo === 1) {
      setFormNo(formNo + 1);
    } else if (formNo === 2) {
      setFormNo(formNo + 1);
    } else if (formNo === 3) {
      setFormNo(formNo + 1);
    } else if (formNo === 4) {
      setFormNo(formNo + 1);
    } else if (formNo === 5) {
      setFormNo(formNo + 1);
    } else if (formNo === 6) {
      setFormNo(formNo + 1);
    } else {
      toast.error("Please fillup all input field");
    }
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };

  return (
    <div className="lg:pt-10  pt-3">
      <div>
        {/* user profile */}
        <div className="flex gap-3 items-center  lg:justify-end justify-between">
          <div className="lg:hidden">
            <img src={menu_img} alt="" />
          </div>
          <div className="flex gap-3 items-center">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="m-1 flex items-center gap-2"
              >
                <img className="h-[50px] w-[50px]" src={abater} alt="" />
                <h1>{`${data?.name}`}</h1>
                <img src={bottom_arow} alt="" />
              </div>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-box w-52">
                <li className="">
                  <a>Update Profile</a>
                </li>
                <li>
                  <button onClick={logout} type="button">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="overflow-auto pb-6 whitespace-nowrap">
          {/* user progrese title*/}
          <div className="flex mt-10 pl-10 items-center justify-between ">
            <p>Personal Information</p>
            <p>Address </p>
            <p>Education</p>
            <p>Job Experience</p>
            <p>Training & skills</p>
            <p>Upload photo</p>
          </div>
          {/* progrese  */}
          <div className="mt-4 relative ">
            <div className="flex justify-center items-center">
              {formArray_new.map((v, i) => (
                <>
                  <div
                    key={i}
                    className={`w-[35px] my-3 text-white rounded-full relative ${
                      i <= formNo - 1 ? "bg-[#FFC11D]" : "bg-[#D9D9D9]"
                    } h-[35px] flex justify-center items-center`}
                  >
                    {v.id}
                  </div>

                  {i !== formArray_new.length - 1 && (
                    <div
                      className={`flex-1 h-[4px] ${
                        i + 1 <= formNo - 1 ? "bg-[#FFC11D]" : "bg-[#D9D9D9]"
                      }`}
                    ></div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold  mb-5">
          Please Fill up your information
        </h3>
        {/* Registion from */}

        {page === "Personal Information" ? (
          <div>
            <div className="bg-[#D9D9D9] rounded-md lg:p-14 p-3 ">
              {/* Input feald */}
              <div className="lg:flex gap-5">
                <div className="lg:w-1/2">
                  <label>
                    Full Name
                    <input
                      className={`px-2 p-[8px] w-full  mb-5 rounded-md outline-none `}
                      type="text"
                      name="name"
                      onChange={(e) => setFullName(e.target.value)}
                      value={fullName}
                      defaultValue={data?.name}
                    />
                  </label>
                  <label>
                    Father’s Name
                    <input
                      className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                      type="text"
                      name="name"
                      onChange={(e) => setFathersName(e.target.value)}
                      value={fathersName}
                    />
                  </label>
                  <div>
                    <p>Date of Birth</p>
                    <div className="flex gap-4">
                      <input
                        value={birth_date}
                        onChange={(e) => setBirth_date(e.target.value)}
                        type="date"
                        className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                      />
                    </div>
                  </div>
                  <label>
                    Passport Number
                    <input
                      className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                      type="number"
                      name="name"
                      onChange={(e) => setPassportNumber(e.target.value)}
                      value={passportNumber}
                    />
                  </label>
                </div>
                <div className="lg:w-1/2">
                  <label>
                    Phone Number
                    <input
                      className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                      type="number"
                      name="name"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      value={phoneNumber}
                      defaultValue={data?.phone}
                    />
                  </label>
                  <label>
                    Mother’s Name
                    <input
                      className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                      type="text"
                      name="name"
                      onChange={(e) => setMothersName(e.target.value)}
                      value={mothersName}
                    />
                  </label>
                  <label>
                    NID/Birth Certificate*
                    <input
                      className=" px-2 p-[8px] w-full  mb-5 rounded-md outline-none"
                      type="number"
                      name="name"
                      onChange={(e) => setNid(e.target.value)}
                      value={nid}
                    />
                  </label>
                  <p>Select Country for Medical Purpose:</p>
                  <select
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    className=" px-2 p-[8px] w-1/2  mb-5 rounded-md outline-none"
                  >
                    <option value="usa">Bangladesh</option>
                    <option value="india">Turusko</option>
                    <option value="nepal">Russia</option>
                    <option value="pakistan">Malaysia</option>
                    <option value="pakistan">Dubai</option>
                  </select>
                </div>
              </div>
              {/* Gender and Marital Status
               */}

              <div className=" mt-2 lg:flex gap-5">
                <div className="lg:w-1/2">
                  <h2 className="font-bold mb-3">Gender</h2>
                  <div className="flex gap-4">
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="Male"
                        required=""
                        className="mr-2"
                        onClick={() => setGender("Male")}
                        value={gender}
                      />
                      <label htmlFor="Male">Male</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        id="Female"
                        required=""
                        className="mr-2"
                        onClick={() => setGender("Female")}
                        value={gender}
                      />
                      <label htmlFor="Female">Female</label>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <h2 className="font-bold mb-3 lg:mt-0 mt-3">
                    Marital Status
                  </h2>
                  <div className="flex gap-4">
                    <div>
                      <input
                        type="radio"
                        name="maritalStatus"
                        id="Single"
                        required=""
                        className="mr-2"
                        onClick={() => setMarital_status("Single")}
                        value={marital_status}
                      />
                      <label htmlFor="Single">Single</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="maritalStatus"
                        id="Married"
                        required=""
                        className="mr-2"
                        onClick={() => setMarital_status("Married")}
                        value={marital_status}
                      />
                      <label htmlFor="Married">Married</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Religion */}
              <div>
                <h2 className="font-bold mb-3 mt-5">Religion</h2>
                <div className="lg:flex gap-4">
                  <div className="flex gap-4">
                    <div>
                      <input
                        type="radio"
                        name="religion"
                        id="Islam"
                        required=""
                        className="mr-2"
                        onClick={() => setReligion("Islam")}
                        value={religion}
                      />
                      <label htmlFor="Islam">Islam</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="religion"
                        id="Hindu"
                        required=""
                        className="mr-2"
                        onClick={() => setReligion("Hindu")}
                        value={religion}
                      />
                      <label htmlFor="Hindu">Hindu</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="religion"
                        id="Christian"
                        required=""
                        className="mr-2"
                        onClick={() => setReligion("Christian")}
                        value={religion}
                      />
                      <label htmlFor="Christian">Christian</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="religion"
                        id="Buddhist"
                        required=""
                        className="mr-2"
                        onClick={() => setReligion("Buddhist")}
                        value={religion}
                      />
                      <label htmlFor="Buddhist">Buddhist</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        name="religion"
                        id="Other"
                        required=""
                        className="mr-2"
                        onClick={() => setReligion("Other")}
                        value={religion}
                      />
                      <label htmlFor="Other">Other</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex items-center justify-end mb-10">
              <button
                onClick={() => {
                  setPage("Address");
                  next();
                  // handleSubmit();
                }}
                className="py-3 px-6 transition-transform active:scale-95 bg-[#FFC11D] text-white font-bold rounded-md mt-5 flex gap-2"
                type="button"
              >
                Next <img src={right_arow} />
              </button>
            </div>
          </div>
        ) : page === "Address" ? (
          <Registration_1
            next={next}
            pre={pre}
            setPage={setPage}
            address={address}
            setAddress={setAddress}
          />
        ) : page === "Education" ? (
          <Registration_2
            setPage={setPage}
            next={next}
            pre={pre}
            academic={academic}
            setAcademic={setAcademic}
          />
        ) : page === "Job Experience" ? (
          <Registration_3
            setPage={setPage}
            next={next}
            pre={pre}
            experience={experience}
            setExperience={setExperience}
          />
        ) : page === "Training & skills" ? (
          <Registration_4
            setPage={setPage}
            next={next}
            pre={pre}
            training={training}
            setTraining={setTraining}
          />
        ) : page === "Upload photo" ? (
          <Registration_5
            setPage={setPage}
            next={next}
            pre={pre}
            photo={photo}
            setPhoto={setPhoto}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        ) : page === "logout" ? (
          <Registration_6 setPage={setPage} />
        ) : null}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Registration_1;
