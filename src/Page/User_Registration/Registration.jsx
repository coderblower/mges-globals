import bottom_arow from "../../../public/images/bottom_arrow.svg";
import right_arow from "../../../public/images/right_arow.svg";
import menu_img from "../../../public/images/menu_1.svg";
import abater from "../../../public/images/Avater.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { post } from "../../api/axios";
import Registration_2 from "../../component/Registration/Registration_2";
import Registration_3 from "../../component/Registration/Registration_3";
import Registration_4 from "../../component/Registration/Registration_4";
import Registration_5 from "../../component/Registration/Registration_5";
import Registration_6 from "../../component/Registration/Registration_6";
import Registration_7 from "../../component/Registration/Success";
import Success from "../../component/Registration/Success";
import PersonalInformation from "../../component/Registration/PersonalInformation";

const Registration = () => {
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
  const [medical, setMedical] = useState("");
  const [medicalList, setMedicalList] = useState([]);
  const [designation_id, setDesignation_id] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const [passport_file, setPassport_file] = useState(null);
  const [academic_file, setAcademic_file] = useState(null);
  const [experience_file, setExperience_file] = useState(null);
  const [training_file, setTraining_file] = useState(null);

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

  console.log(data?.role.id);

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
      medical_center_id: medical,
      designation_id,
      passport_file,
      academic_file,
      experience_file,
      training_file,
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
        // navigate("/user_registration/registration_6");
        setPage("logout");
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

  useEffect(() => {
    fetchMedical();
  }, []);

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

  return (
    <div className="mt-10">
      {/* user profile */}
      <div className="flex gap-3 items-center  lg:justify-end justify-between">
        <div className="lg:hidden">
          <img className="w-[45px]" src={menu_img} alt="" />
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
      <div className="mt-12 ">
        <div className="whitespace-nowrap px-10">
          <div className="flex justify-center items-center mb-10">
            {formArray_new.map((v, i) => (
              <>
                <div
                  key={i}
                  className={`w-[35px] my-3 text-black rounded-full relative text-sm ${
                    i <= formNo - 1 ? "bg-[#FFC11D]" : "bg-[#D9D9D9]"
                  } h-[35px] flex justify-center items-center`}
                >
                  <span
                    className={`absolute -top-10 text font-[500] ${
                      i <= formNo - 1 ? "text-black" : "text-black/70"
                    }`}
                  >
                    {v.title}
                  </span>
                  <span className="text-white"> {v.id}</span>
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

        <h3 className="text-[24px] font-[500]  mb-[27px]">
          Please Fill up your information
        </h3>
        {/* Registion from */}

        {page === "Personal Information" ? (
          <PersonalInformation
            setPage={setPage}
            next={next}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            fullName={fullName}
            setFullName={setFullName}
            religion={religion}
            setReligion={setReligion}
            fathersName={fathersName}
            setFathersName={setFathersName}
            marital_status={marital_status}
            setMarital_status={setMarital_status}
            gender={gender}
            setGender={setGender}
            nid={nid}
            setNid={setNid}
            country={country}
            setCountry={setCountry}
            passport={passport}
            setPassport={setPassport}
            mothersName={mothersName}
            setMothersName={setMothersName}
            birth_date={birth_date}
            setBirth_date={setBirth_date}
            medical={medical}
            setMedical={setMedical}
            designation_id={designation_id}
            setDesignation_id={setDesignation_id}
            setPassport_file={setPassport_file}
            expireDate={expireDate}
            setExpireDate={setExpireDate}
          />
        ) : page === "Address" ? (
          <Registration_2
            next={next}
            pre={pre}
            setPage={setPage}
            address={address}
            setAddress={setAddress}
          />
        ) : page === "Education" ? (
          <Registration_3
            setPage={setPage}
            next={next}
            pre={pre}
            academic={academic}
            setAcademic={setAcademic}
            setAcademic_file={setAcademic_file}
          />
        ) : page === "Job Experience" ? (
          <Registration_4
            setPage={setPage}
            next={next}
            pre={pre}
            experience={experience}
            setExperience={setExperience}
            setExperience_file={setExperience_file}
          />
        ) : page === "Training & skills" ? (
          <Registration_5
            setPage={setPage}
            next={next}
            pre={pre}
            training={training}
            setTraining={setTraining}
            setTraining_file={setTraining_file}
          />
        ) : page === "Upload photo" ? (
          <Registration_6
            setPage={setPage}
            next={next}
            pre={pre}
            photo={photo}
            setPhoto={setPhoto}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        ) : page === "logout" ? (
          <div className="mt-24">
            <Success navList="/user_panel" />
          </div>
        ) : null}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Registration;
