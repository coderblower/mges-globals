import { useParams } from "react-router-dom";
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
import PersonalInformation from "../Registration/PersonalInformation";

const UpdateCadidate = () => {
  const { id } = useParams("");
  const [data, setData] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [religion, setReligion] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [marital_status, setMarital_status] = useState("");
  const [gender, setGender] = useState("");
  const [nid, setNid] = useState("");
  const [country, setCountry] = useState("");
  const [passport, setPassport] = useState("");
  const [mothersName, setMothersName] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [medical, setMedical] = useState("");
  const [designation_id, setDesignation_id] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const [passport_file, setPassport_file] = useState(null);
  const [academic_file, setAcademic_file] = useState(null);
  const [experience_file, setExperience_file] = useState(null);
  const [training_file, setTraining_file] = useState(null);
  const [nid_file, setNid_file] = useState(null);
  const [referred_by, setreferenceBy] = useState("");

  const [candidate_id, setCandidate_id] = useState(null);

  //

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [visitRussiaNumber, setVisitRussiaNumber] = useState("");
  const [russia_trip_date, setRussia_trip_date] = useState("");
  const [hostOrganization, setHostOrganization] = useState("");
  const [route_Journey, setRoute_Journey] = useState("");
  const [relativesStaying, setRelativesStaying] = useState("");
  const [refusedRussian, setRefusedRussian] = useState("");
  const [deportedRussia, setDeportedRussia] = useState("");
  const [spousesName, setSpousesName] = useState("");
  const [spouses_birth_date, setSpouses_birth_date] = useState("");
  const [isVisitOpen, setIsVisitOpen] = useState();
  const [relativeStaying, setRelativeStaying] = useState();

  //

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
    permanent_address: "",
    present_address: "",
  });

  useEffect(() => {
    fetchSingleUser();
  }, [id]);

  useEffect(() => {
    if (data) {
      setFullName(data?.name);
      setPhoto(data?.candidate?.photo);
      setFirstName(data?.candidate?.firstName);
      setLastName(data?.candidate?.lastName);
      setDateOfIssue(data?.candidate?.dateOfIssue);
      setPhoneNumber(data?.phone);
      setReligion(data?.candidate?.religion);
      setFathersName(data?.candidate?.father_name);
      setMarital_status(data?.candidate?.marital_status);
      setExpireDate(data?.candidate?.expiry_date);
      setGender(data?.candidate?.gender);
      setNid(data?.candidate?.nid);
      setCountry(data?.candidate?.country);
      setPassport(data?.candidate?.passport);
      setMothersName(data?.candidate?.mother_name);
      setBirth_date(data?.candidate?.birth_date);
      setMedical(data?.candidate?.medical_center_id);
      setDesignation_id(data?.candidate?.designation_id);
      setCandidate_id(data?.candidate?.id);
      setNid_file(data?.candidate?.nid_file);
      setPassport_file(data?.candidate?.passport_file);
      setreferenceBy(data?.candidate?.referred_by);
      setAcademic_file(data?.candidate?.academic_file);
      setExperience_file(data?.candidate?.experience_file);
      setTraining_file(data?.candidate?.training_file);
      setPhoto(data?.candidate?.photo);

      setHostOrganization(data?.candidate?.hostOrganization);
      setRoute_Journey(data?.candidate?.route_Journey);
      setRelativesStaying(data?.candidate?.relativesStaying);
      setRefusedRussian(data?.candidate?.refusedRussian);
      setDeportedRussia(data?.candidate?.deportedRussia);
      setVisitRussiaNumber(data?.candidate?.visitRussiaNumber);
      setRussia_trip_date(data?.candidate?.russia_trip_date);
      setSpousesName(data?.candidate?.spousesName);
      setSpouses_birth_date(data?.candidate?.spouses_birth_date);

      if (
        data?.candidate?.visitRussiaNumber ||
        data?.candidate?.russia_trip_date
      ) {
        setIsVisitOpen(true);
      }
      if (data?.candidate?.relativesStaying) {
        setRelativeStaying(true);
      }

      // setPhoto(data?.candidate?.photo);

      if (data?.candidate?.academic) {
        const academic_data = JSON.parse(data?.candidate?.academic);
        setAcademic(academic_data);
      }
      if (data?.candidate?.experience) {
        const experience_data = JSON.parse(data?.candidate?.experience);
        setExperience(experience_data || {});
      }
      if (data?.candidate?.experience) {
        const address_data = JSON.parse(data?.candidate?.address);
        setAddress(address_data || {});
      }
      if (data?.candidate?.training) {
        const training_data = JSON.parse(data?.candidate?.training);
        setTraining(training_data || {});
      }
    }
  }, [data]);

  const fetchSingleUser = async () => {
    try {
      const response = await post(`api/user/get_user`, { id: id });
      console.log(response.data, "user ====>");
      setData(response.data);
    } catch (error) {
      console.error("Error creating app:", error);
    }
  };

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

  const handleSubmit = async () => {
    const payload = {
      id: candidate_id,
      gender: gender,
      marital_status: marital_status,
      religion: religion,
      nid,
      nid_file,
      passport,
      fullName: firstName + " " + lastName,
      firstName,
      lastName,
      dateOfIssue,
      visitRussiaNumber,
      russia_trip_date,
      hostOrganization,
      route_Journey,
      relativesStaying,
      refusedRussian,
      deportedRussia,
      spousesName,
      spouses_birth_date,
      expiry_date: expireDate,
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
      training_status: 1,
      medical_status: 1,
      medical_center_id: medical,
      designation_id,
      passport_file,
      academic_file,
      experience_file,
      training_file,
    };
    console.log(payload);
    setLoading(true);
    try {
      const res = await post("api/candidate/update", payload, {
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

  // console.log(nid_file);

  return (
    <div className="mt-[38px]">
      <div>
        {page === "Registration" || page === "success" ? null : (
          <div>
            <div className="whitespace-nowrap px-10">
              <div className="flex justify-center items-center mb-10">
                {formArray_new.map((v, i) => (
                  <>
                    <div
                      key={i}
                      className={`w-[35px] my-3 text-black rounded-full relative text-sm ${
                        i <= formNo - 1 ? "bg-[#1E3767]" : "bg-[#D9D9D9]"
                      } h-[35px] flex justify-center items-center`}
                    >
                      <span
                        className={`absolute -top-10 text font-[500] hidden sm:block ${
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
                          i + 1 <= formNo - 1 ? "bg-[#1E3767]" : "bg-[#D9D9D9]"
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
          </div>
        )}
        {/* Registion from */}

        {page === "Personal Information" ? (
          // <PersonalInformation
          //   setPage={setPage}
          //   next={next}
          //   phoneNumber={phoneNumber}
          //   setPhoneNumber={setPhoneNumber}
          //   fullName={fullName}
          //   setFullName={setFullName}
          //   religion={religion}
          //   setReligion={setReligion}
          //   fathersName={fathersName}
          //   setFathersName={setFathersName}
          //   marital_status={marital_status}
          //   setMarital_status={setMarital_status}
          //   gender={gender}
          //   setGender={setGender}
          //   nid={nid}
          //   setNid={setNid}
          //   country={country}
          //   setCountry={setCountry}
          //   passport={passport}
          //   setPassport={setPassport}
          //   mothersName={mothersName}
          //   setMothersName={setMothersName}
          //   birth_date={birth_date}
          //   setBirth_date={setBirth_date}
          //   medical={medical}
          //   setMedical={setMedical}
          //   designation_id={designation_id}
          //   setDesignation_id={setDesignation_id}
          //   passport_file={passport_file}
          //   setPassport_file={setPassport_file}
          //   expireDate={expireDate}
          //   setExpireDate={setExpireDate}
          //   nid_file={nid_file}
          //   setNid_file={setNid_file}
          //   referred_by={referred_by}
          //   setreferenceBy={setreferenceBy}
          // />
          <PersonalInformation
            setPage={setPage}
            next={next}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            fullName={fullName}
            setFullName={setFullName}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            dateOfIssue={dateOfIssue}
            setDateOfIssue={setDateOfIssue}
            visitRussiaNumber={visitRussiaNumber}
            setVisitRussiaNumber={setVisitRussiaNumber}
            russia_trip_date={russia_trip_date}
            setRussia_trip_date={setRussia_trip_date}
            hostOrganization={hostOrganization}
            setHostOrganization={setHostOrganization}
            route_Journey={route_Journey}
            setRoute_Journey={setRoute_Journey}
            relativesStaying={relativesStaying}
            setRelativesStaying={setRelativesStaying}
            refusedRussian={refusedRussian}
            setRefusedRussian={setRefusedRussian}
            deportedRussia={deportedRussia}
            setDeportedRussia={setDeportedRussia}
            religion={religion}
            setReligion={setReligion}
            fathersName={fathersName}
            setFathersName={setFathersName}
            marital_status={marital_status}
            setMarital_status={setMarital_status}
            spousesName={spousesName}
            setSpousesName={setSpousesName}
            spouses_birth_date={spouses_birth_date}
            setSpouses_birth_date={setSpouses_birth_date}
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
            passport_file={passport_file}
            setPassport_file={setPassport_file}
            expireDate={expireDate}
            setExpireDate={setExpireDate}
            nid_file={nid_file}
            setNid_file={setNid_file}
            referred_by={referred_by}
            setreferenceBy={setreferenceBy}
            isVisitOpen={isVisitOpen}
            setIsVisitOpen={setIsVisitOpen}
            relativeStaying={relativeStaying}
            setRelativeStaying={setRelativeStaying}
            isUpdateCandidate={true}
          />
        ) : page === "Address" ? (
          <Registration_2
            next={next}
            pre={pre}
            setPage={setPage}
            address={address}
            country={country}
            setAddress={setAddress}
          />
        ) : page === "Education" ? (
          <Registration_3
            setPage={setPage}
            next={next}
            pre={pre}
            academic={academic}
            setAcademic={setAcademic}
            academic_file={academic_file}
            setAcademic_file={setAcademic_file}
          />
        ) : page === "Job Experience" ? (
          <Registration_4
            setPage={setPage}
            next={next}
            pre={pre}
            experience={experience}
            setExperience={setExperience}
            experience_file={experience_file}
            setExperience_file={setExperience_file}
          />
        ) : page === "Training & skills" ? (
          <Registration_5
            setPage={setPage}
            next={next}
            pre={pre}
            training={training}
            setTraining={setTraining}
            training_file={training_file}
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
          <Success navList="/admin" />
        ) : null}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default UpdateCadidate;