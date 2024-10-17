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
import Registration from "../../component/Registration/Registration";
import Success from "../../component/Registration/Success";
import PersonalInformation from "../../component/Registration/PersonalInformation";

const Medical_Candidate_Registration = () => {
  const navigate = useNavigate();
  const [religion, setReligion] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [gender, setGender] = useState("");
  const [nid, setNid] = useState("");
  const [country, setCountry] = useState("");
  const [passport, setPassport] = useState("");
  const [mothersName, setMothersName] = useState("");
  // const [passportNumber, setPassportNumber] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [medical, setMedical] = useState("");
  const [medicalList, setMedicalList] = useState([]);

  const [designation_id, setDesignation_id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const [passport_file, setPassport_file] = useState(null);
  const [academic_file, setAcademic_file] = useState(null);
  const [experience_file, setExperience_file] = useState(null);
  const [training_file, setTraining_file] = useState(null);

  // console.log(39, userInfo);

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
  const [page, setPage] = useState("Registration");

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
          // setFullName(user_data?.name);
          // setPhoneNumber(user_data?.phone);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [fullName, phoneNumber]);

  console.log(fullName, passport, country);

  const handleSubmit = async () => {
    const payload = {
      name: fullName,
      email,
      phone,
      password,
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

    console.log(138, payload);

    setLoading(true);
    try {
      const res = await post("api/user/create", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.success) {
        setPage("success");
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
        {page === "Registration" || page === "success" ? null : (
          <div>
            <div className="overflow-auto pb-9 whitespace-nowrap">
              {/* user progrese title*/}
              <div className="flex  pl-10 items-center justify-between ">
                <p className="font-semibold">Personal Information</p>
                <p className="font-semibold">Address </p>
                <p className="font-semibold">Education</p>
                <p className="font-semibold">Job Experience</p>
                <p className="font-semibold">Training & skills</p>
                <p className="font-semibold">Upload photo</p>
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
                            i + 1 <= formNo - 1
                              ? "bg-[#FFC11D]"
                              : "bg-[#D9D9D9]"
                          }`}
                        ></div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold  mb-7">
              Please Fill up your information
            </h3>
          </div>
        )}
        {/* Registion from */}

        {page === "Registration" ? (
          <Registration
            setPage={setPage}
            setname={setname}
            setEmail={setEmail}
            setPhone={setPhone}
            setPassword={setPassword}
            setFullName={setFullName}
            setPhoneNumber={setPhoneNumber}
          />
        ) : page === "Personal Information" ? (
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
          <Registration_7 setPage={setPage} />
        ) : page === "success" ? (
          <Success navList="/medical" />
        ) : null}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Medical_Candidate_Registration;
