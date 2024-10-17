import user_img from "../../../public/images/Avater.png";
import { useReactToPrint } from "react-to-print";
import download_img from "../../../public/images/download.svg";
import { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_BASE_URL;
import { saveAs } from "file-saver";
import TextTitle from "../../component/TextTitle";
import { post } from "../../api/axios";
import Modal from "../../component/Modal";
import InputField from "../../component/InputField";
import TableLoading from "../../component/TableLoading";

const UserDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef();
  const { id } = useParams();
  const [modals, setModals] = useState(false);
  const [selectCountry, setSelectCountry] = useState("");
  const [country, setCountry] = useState([]);
  const [medicalList, setMedicalList] = useState([]);
  const [data, setData] = useState({});
  const [academic, setAcademic] = useState({});
  const [address, setAddress] = useState({});
  const [experience, setExperience] = useState({});
  const [training, setTraining] = useState({});
  const [show, setShow] = useState(true);
  const [medicalID, setMedicalID] = useState();
  const [enrollError, setEnrollError] = useState("");

  const handleDawnlodFile = (data) => {
    console.log(data);
    const url = `${API_URL}/${data}`;
    saveAs(url, "image.svg");
  };

  const handleClick = () => {
    const url = `${API_URL}/${data?.candidate?.qr_code}`;
    saveAs(
      url,
      {
        mode: "no-cors",
      },
      "image.svg"
    );
  };

  useEffect(() => {
    fetchMedical();
    fetchCountry();
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
  // console.log(medicalList);
  const matchMedical = (id) => {
    const filterData = medicalList.find((data) => data.id === id);
    return filterData;
  };

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (data) {
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

  // console.log({ academic, experience, address, training });

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await post(`api/user/get_user`, { id: id });

      console.log(response, "====>");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error creating app:", error);
      setLoading(false);
    }
  };

  // const handleClick = () => {
  //   // Assuming imageUrl is the URL of the image you want to download
  //   const imageUrl = `${API_URL}/${data?.candidate?.photo}`;

  //   // Fetch the image data
  //   fetch(imageUrl, {
  //     mode: "no-cors",
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       // Create a blob URL for the image data
  //       const blobUrl = URL.createObjectURL(blob);

  //       // Create a link element
  //       const link = document.createElement("a");
  //       link.href = blobUrl;

  //       // Set the download attribute with the desired file name
  //       link.download = "your_image.jpg";

  //       // Append the link to the document
  //       document.body.appendChild(link);

  //       // Trigger a click on the link to initiate the download
  //       link.click();

  //       // Remove the link from the document
  //       document.body.removeChild(link);
  //       html2canvas;

  //       // Revoke the blob URL to free up resources
  //       URL.revokeObjectURL(blobUrl);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching image:", error);
  //     });
  // };

  // gat all country
  const fetchCountry = async () => {
    try {
      const response = await post(`api/country/all`);
      // console.log(response);
      setCountry(response?.data);
    } catch (error) {
      console.log("Error creating app:", error);
    }
  };

  // handle medical submit
  const handelTestSubmit = async () => {
    const formData = {
      country_id: parseInt(selectCountry),
      candidate_id: parseInt(data?.candidate?.id),
      user_id: id,
      min: 0,
      max: 0,
      status: 1,
      unique_id: medicalID,
    };
    // console.log(62, formData);
    setLoading(true);
    try {
      const res = await post("api/candidate_medical_test/create", formData);
      console.log(res);
      if (res.success) {
        navigate("/medical/enrolled_list");
        fetchCandidate();
        setLoading(false);
        setModals(false);
        setMedicalID("");
        setSelectCountry("");
        setEnrollError("");
      } else {
        console.log(res);
        setEnrollError(res?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Failed to post/", error?.response);
    } finally {
      setLoading(false);
    }
  };

  // console.log(enrollError);

  return (
    <div>
      {!loading && (
        <>
          <div className="max-w-7xl mx-auto mt-10">
            <div className="flex justify-end mr-[20px]">
              <div className="flex gap-5">
                {!data?.report && (
                  <button
                    onClick={() => {
                      setModals(true);
                    }}
                    className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md "
                  >
                    Medical Enroll
                  </button>
                )}
                <button
                  // onClick={handlePdfDawnlod}
                  onClick={handlePrint}
                  className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md "
                >
                  <div className="flex gap-4">
                    <img src={download_img} alt="" />
                    <h3>Download CV</h3>
                  </div>
                </button>
              </div>
            </div>

            <div ref={pdfRef}>
              <div className="flex justify-center px-5">
                <div className="w-full">
                  <div className="flex items-center justify-end mt-10 "></div>
                  {/* <div>
            <button className="bg-red-600" onClick={downloadImage}>
              Download Image
            </button>
            {imageData && <img src={imageData} alt="Downloaded Image" />}
          </div> */}
                  {/* Dashboard */}

                  <div className="bg-[#EEEEEE] p-5 rounded-md flex justify-between gap-5">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        className="h-[150px] w-[150px] rounded-full"
                        src={
                          data?.candidate?.photo
                            ? `${API_URL}/${data?.candidate?.photo}`
                            : user_img
                        }
                      />
                      <h2 className="mt-3 font-bold mb-3">{data?.name}</h2>
                    </div>
                    <div>
                      <h2 className="font-bold mb-3 text-[20px]">Basic Info</h2>
                      <div className="border-b-4 border-gray-400 pb-2 flex justify-between gap-5">
                        <div>
                          <TextTitle title="Name:" data={data?.name} />
                          <TextTitle title="Phone:" data={data?.phone} />
                          <TextTitle title="Email:" data={data?.email} />
                          <TextTitle
                            title="Passport:"
                            data={data?.candidate?.passport}
                          />
                        </div>
                        <div>
                          <TextTitle
                            title="Gender:"
                            data={data?.candidate?.gender}
                          />
                          <TextTitle title="NID:" data={data?.candidate?.nid} />
                          <TextTitle
                            title="Religion:"
                            data={data?.candidate?.religion}
                          />
                          <TextTitle
                            title="Country:"
                            data={data?.candidate?.country}
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <h2 className="font-bold mb-2">Address</h2>
                        <p>
                          {address.address || ""},{address.city || ""},{" "}
                          {address.country || ""}
                        </p>
                      </div>
                    </div>
                    <div className="text-center lg:mt-0 mt-6">
                      <h2>
                        {!show ? "Scan" : "Download"} QR For <br /> More Details
                      </h2>
                      <div className="flex justify-center mt-2">
                        {data?.candidate?.qr_code ? (
                          <img
                            className="w-[130px]"
                            src={`${API_URL}/${data?.candidate?.qr_code}`}
                            alt=""
                          />
                        ) : (
                          <h1>Not Found</h1>
                        )}
                      </div>

                      {show && (
                        <button
                          onClick={handleClick}
                          className="bg-[#1E3767] py-2 px-8 rounded-md text-white mt-6"
                        >
                          Download
                        </button>
                      )}
                    </div>
                  </div>

                  {data?.candidate?.medical_center_id && (
                    <div>
                      <div className="my-3 bg-[#EEEEEE] w-full py-3 px-4 rounded-md">
                        <span className="font-bold">
                          {" "}
                          Selected Medical Center:
                        </span>{" "}
                        {matchMedical(data?.candidate?.medical_center_id)?.name}
                        ,{" "}
                        {matchMedical(data?.candidate?.medical_center_id)
                          ?.partner?.address &&
                          JSON.parse(
                            matchMedical(data?.candidate?.medical_center_id)
                              ?.partner?.address
                          )}
                      </div>
                      <div className="my-3 bg-[#EEEEEE] w-full py-3 px-4 rounded-md">
                        Medical Status
                      </div>
                    </div>
                  )}
                  {data?.candidate?.medical_center_id && (
                    <div className="overflow-x-auto">
                      <table className="table ">
                        <thead className=" border-b-2">
                          <tr className="uppercase bg-[#EEEEEE] border-b-2 border-gray-500">
                            <th>Report Submission Date</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-[#EEEEEE]">
                            <th>{data?.report?.created_at.slice(0, 10)}</th>
                            <th>{data?.report?.result}</th>
                            <th>
                              <button
                                onClick={() =>
                                  handleDawnlodFile(data?.report?.file)
                                }
                                className="bg-[#1E3767] px-[20px] py-[6px] rounded-full text-white"
                              >
                                Download
                              </button>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="my-3 bg-[#EEEEEE] w-full py-3 px-4 rounded-md">
                    Training Status
                  </div>

                  <div className="overflow-x-auto mb-10">
                    <table className="table ">
                      <thead className=" border-b-2">
                        <tr className="uppercase bg-[#EEEEEE] border-b-2 border-gray-500">
                          <th>Pre Skilled Test Result</th>
                          <th>Skill Test Result</th>
                          <th>Final Test</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-[#EEEEEE]">
                          <th>
                            {data?.preskilled?.status == 1
                              ? "Qualified"
                              : "Unqualified"}
                          </th>
                          <th>
                            {data?.skill?.status == 1
                              ? "Qualified"
                              : "Unqualified"}
                          </th>
                          <th></th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* user Education */}
              <div className="px-5">
                <p className="mt-10">Education</p>
                <div className="border border-black rounded-md p-8 mt-5">
                  <h2 className="text-[18px] font-semibold mb-2">Academic-1</h2>
                  <div className="grid grid-cols-4  gap-4 ">
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Level of Education
                      </h2>
                      <p>{academic?.level_of_education || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Exam/Degree Title
                      </h2>
                      <p>{academic?.exam_degree_title || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">Major/Group</h2>
                      <p>{academic?.concentration_major || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">Result</h2>
                      <p>{academic?.result || "Not Found"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4  gap-4 mt-6">
                    <div>
                      <h2 className="text-[18px] font-semibold ">
                        Institute Name
                      </h2>
                      <p>{academic?.institute_name || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Year of Passing
                      </h2>
                      <p>{academic?.year_of_passing || "Not Found"}</p>
                    </div>
                  </div>
                </div>
                {/* user Education */}
                <p className="mt-10">Job Experience</p>
                <div className="border border-black rounded-md p-8 mt-5">
                  <h2 className="text-[18px] font-semibold mb-2">
                    Experience-1
                  </h2>
                  <div className="grid grid-cols-3 gap-4 ">
                    <div>
                      <h2 className="text-[18px] font-semibold">Designation</h2>
                      <p>{experience?.designation || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">Department</h2>
                      <p>{experience?.department || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Employment Period
                      </h2>
                      <p>
                        <span>
                          {experience?.employment_period_from || "Not Found"}
                        </span>{" "}
                        -{" "}
                        <span>
                          {experience?.employment_period_to || "Not Found"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3  gap-4 mt-6">
                    <div>
                      <h2 className="text-[18px] font-semibold ">
                        Company Name
                      </h2>
                      <p>{experience?.company_name || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Company Location
                      </h2>
                      <p>{experience?.company_location || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Years of Experience
                      </h2>
                      <p>
                        {experience?.total_year_of_experience || "Not Found"}{" "}
                        Years
                      </p>
                    </div>
                  </div>
                </div>
                {/* user Training & skills */}
                <p className="mt-10 pt-5">Training & skills</p>
                <div className="border border-black rounded-md p-8 mt-5 mb-10">
                  <h2 className="text-[18px] font-semibold mb-2">Training-1</h2>
                  <div className="grid grid-cols-3  gap-4 ">
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Training Title
                      </h2>
                      <p>{training?.training_title || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Topics Covered
                      </h2>
                      <p>{training?.topics_covered || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">Duration</h2>
                      <p>{experience?.employment_period_to || "Not Found"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3  gap-4 mt-6">
                    <div>
                      <h2 className="text-[18px] font-semibold ">Institute</h2>
                      <p>{training?.institute || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Institute Location
                      </h2>
                      <p>{training?.country || "Not Found"}</p>
                    </div>
                    <div>
                      <h2 className="text-[18px] font-semibold">
                        Training Year
                      </h2>
                      <p>{training?.training_year || "Not Found"} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal  */}
          <Modal modals={modals} setModals={setModals}>
            <h1 className="text-center text-xl font-bold pb-2">
              Candidate Enroll Now
            </h1>
            {/* Select country */}
            <p className="text-[17px] font-[500] mb-2 text-[#202020]">
              Country
            </p>
            <div className="relative my-3">
              <select
                onChange={(e) => setSelectCountry(e.target.value)}
                value={selectCountry}
                className="appearance-none bg-transparent border-2 border-[#C5BFBF]  sm:text-sm rounded-lg outline-none w-full px-4 py-3 mb-3 inner_shadow placeholder:text-white/30"
                id="influencer_country"
              >
                <option value="" className="text-black">
                  Select a country
                </option>
                {country?.map((data) => (
                  <option key={data.id} value={data.id} className="text-black">
                    {data.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mb-2">
                <svg
                  fill="#000"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 52 52"
                  xmlSpace="preserve"
                >
                  <path d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z" />
                </svg>
              </div>
            </div>

            {/* Select medical name */}
            <div className="flex-1">
              <p className="text-[17px] font-[500] mb-2 text-[#202020]">
                Medical ID
              </p>
              <input
                className={`px-6 py-[10px] border-2 border-[#C5BFBF] text-gray-700 font-[500]  w-full  rounded-md outline-none`}
                type="text"
                onChange={(e) => setMedicalID(e.target.value)}
                value={medicalID}
                placeholder="Enter Your  Mediacl ID"
              />
              <p className="text-red-600 text-[15px]">
                {enrollError && enrollError}
              </p>
            </div>

            <div className="flex justify-end mt-[25px]">
              <button
                onClick={() => handelTestSubmit()}
                className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md "
              >
                Submit
              </button>
            </div>
          </Modal>
        </>
      )}

      {/* loadin component */}
      {loading && (
        <div className="flex justify-center min-w-full mt-20 ">
          <TableLoading />
        </div>
      )}

      {/* not data get  */}
      {!loading && data?.length === 0 && (
        <div className="flex justify-center min-w-full mt-20 ">
          <h4 className="text-black font-bold text-xl">No Data found!</h4>
        </div>
      )}
    </div>
  );
};

export default UserDetails;

// useEffect(() => {
//   fetchUser();
// }, [id]);

// const fetchUser = async () => {
//   try {
//     const response = await post(`api/user/get_user`, { id: id });
//     console.log(response);
//     setData(response.data);
//   } catch (error) {
//     console.error("Error creating app:", error);
//   }
// };
