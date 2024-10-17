import user_img from "../../../public/images/Avater.png";
import { useReactToPrint } from "react-to-print";
import download_img from "../../../public/images/download.svg";
import download_black_img from "../../../public/images/downloadBlack.svg";
import { useEffect, useRef, useState } from "react";
import { del, get, post } from "../../api/axios";
import { NavLink, useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_BASE_URL;
import { saveAs } from "file-saver";
import TextTitle from "../TextTitle";
import FileUplod from "../FileUplod";
import TableLoading from "../TableLoading";
import delete_icon from "../../../public/images/delete_icon.svg";
import toast, { Toaster } from "react-hot-toast";

const Profile_Details = () => {
  const [loading, setloading] = useState(false);
  const pdfRef = useRef();
  const { id } = useParams();
  const [uploadPIFFile, setUploadPIFFile] = useState(null);
  const [isPIFFile, setIsPIFFile] = useState(null);
  const [medicalList, setMedicalList] = useState([]);
  const [data, setData] = useState({});
  const [academic, setAcademic] = useState({});
  const [address, setAddress] = useState({});
  const [experience, setExperience] = useState({});
  const [training, setTraining] = useState({});
  const [show, setShow] = useState(true);

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

  // Get user role
  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setUserRole(user_data?.role?.roleName);
  }, []);

  const [userRole, setUserRole] = useState();

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

  // handle PIF file delete
  const handlePIFDelete = async () => {
    const payload = {
      id: data?.candidate?.id,
    };

    try {
      const res = await post("api/candidate/delete_pif", payload);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        setIsPIFFile(null);
        fetchUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log({ academic, experience, address, training });

  const fetchUser = async () => {
    setloading(true);
    try {
      const response = await post(`api/user/get_user`, { id: id });
      console.log(response, "====>");
      setData(response.data);
      setloading(false);
    } catch (error) {
      console.error("Error creating app:", error);
      setloading(false);
    }
  };

  // const handleClick = () => {
  //   // Assuming imageUrl is the URL of the image you want to download
  //   const imageUrl = `/${data?.candidate?.photo}`;

  //   // Fetch the image data
  //   get(imageUrl, {
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

  // console.log(data?.candidate?.academic_file);
  // console.log({ API_URL } / data?.candidate?.experience_file);

  // POST and GET PIF file

  useEffect(() => {
    if (uploadPIFFile) {
      postPIFFile();
    }
  }, [uploadPIFFile]);

  const postPIFFile = async () => {
    try {
      console.log(156, uploadPIFFile);
      const res = await post(
        `api/candidate/update_pif`,
        {
          id: data?.candidate?.id,
          pif_file: uploadPIFFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.success) {
        console.log(res.data?.pif_file);
        setIsPIFFile(res.data?.pif_file);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(userRole);

  return (
    <div>
      {!loading && (
        <>
          <div className="flex justify-end gap-5 mt-[24px] mb-[16px] pr-[20px]">
            <div>
              {data?.candidate?.pif_file || isPIFFile ? (
                <div className="flex items-center gap-[10px]">
                  <div>
                    <NavLink
                      to={`${API_URL}/${
                        data?.candidate?.pif_file || isPIFFile
                          ? data?.candidate?.pif_file || isPIFFile
                          : null
                      }`}
                      target="_blank"
                    >
                      <button
                        // onClick={handlePrint}
                        className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md transition-transform active:scale-95"
                      >
                        <div className="flex gap-4">
                          <img src={download_img} alt="" />
                          <h3>Download PIF</h3>
                        </div>
                      </button>
                    </NavLink>
                  </div>
                  {userRole === "Admin" && (
                    <button onClick={() => handlePIFDelete()}>
                      <img src={delete_icon} alt="" />
                    </button>
                  )}
                </div>
              ) : (
                <FileUplod isPIF={true} setFile={setUploadPIFFile} />
              )}
            </div>

            {/* <button
              // onClick={handlePdfDawnlod}
              onClick={handlePrint}
              className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md transition-transform active:scale-95"
            >
              <div className="flex gap-4">
                <img src={download_img} alt="" />
                <h3>Download CV</h3>
              </div>
            </button> */}
          </div>
          <div ref={pdfRef}>
            <div className="flex justify-center lg:px-5">
              <div className="w-full">
                {/* <div>
            <button className="bg-red-600" onClick={downloadImage}>
              Download Image
            </button>
            {imageData && <img src={imageData} alt="Downloaded Image" />}
          </div> */}
                {/* Dashboard */}

                <div className="bg-[#EEEEEE] p-5 rounded-md lg:flex justify-between gap-5">
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
                    <div className="border-b-4 border-gray-400 pb-2 lg:flex justify-between gap-5">
                      <div>
                        <TextTitle title="Name:" data={data?.name} />
                        <TextTitle title="Phone:" data={data?.phone} />
                        <TextTitle title="Email:" data={data?.email} />
                        <div className="flex gap-3 items-center">
                          <TextTitle
                            title="Passport:"
                            data={data?.candidate?.passport}
                          />
                          {data?.candidate?.passport_file && (
                            <NavLink
                              to={`${API_URL}/${data?.candidate?.passport_file}`}
                              target="_blank"
                            >
                              <img src={download_black_img} alt="" />
                            </NavLink>
                          )}
                        </div>
                        <TextTitle
                          title="Designation:"
                          data={data?.candidate?.designation?.name}
                        />
                      </div>
                      <div>
                        <TextTitle
                          title="Gender:"
                          data={data?.candidate?.gender}
                        />

                        <div className="flex items-center gap-3">
                          <TextTitle title="NID:" data={data?.candidate?.nid} />
                          {data?.candidate?.nid_file && (
                            <NavLink
                              to={`${API_URL}/${data?.candidate?.nid_file}`}
                              target="_blank"
                            >
                              <img src={download_black_img} alt="" />
                            </NavLink>
                          )}
                        </div>
                        <TextTitle
                          title="Religion:"
                          data={data?.candidate?.religion}
                        />

                        <TextTitle
                          title="Country:"
                          data={
                            data?.candidate?.country === "1"
                              ? "Russia"
                              : "Turkey" || "Not Found"
                          }
                        />

                        {data?.candidate?.referred_by && (
                          <TextTitle
                            title="Referred By
:"
                            data={data?.candidate?.referred_by}
                          />
                        )}
                        <TextTitle
                          title="Created At:"
                          data={data?.created_at?.slice(0, 10)}
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

                  {data?.candidate?.approval_status !== "reject" &&
                  data?.candidate?.approval_status !== "pending" ? (
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
                          className="bg-[#1E3767] py-2 px-8 rounded-md text-white mt-6 transition-transform active:scale-95"
                        >
                          Download
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="lg:w-[230px] flex items-center">
                      <h1 className="text-[20px] text-red-400">
                        QR Code Not Found
                      </h1>
                    </div>
                  )}
                </div>
                {/* {data?.candidate?.medical_center_id} */}
                {data?.candidate?.medical_center_id && (
                  <div>
                    <div className="my-3 bg-[#EEEEEE] w-full py-3 px-4 rounded-md">
                      <span className="font-bold">
                        {" "}
                        Selected Medical Center:
                      </span>{" "}
                      {
                        matchMedical(data?.candidate?.medical_center_id)?.name
                      },{" "}
                      {matchMedical(data?.candidate?.medical_center_id)?.partner
                        ?.address &&
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
                              className="bg-[#1E3767] px-[20px] py-[6px] rounded-full transition-transform active:scale-95 text-white"
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
                          {data?.preskilled?.status == 1 ? "Qualified" : "-"}
                        </th>
                        <th>{data?.skill?.status == 1 ? "Qualified" : "-"}</th>
                        <th></th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* user Education */}
            <div className="lg:px-5">
              <div className="flex items-center justify-between mt-10">
                <p className="">Education</p>
                {data?.candidate?.academic_file ? (
                  <NavLink
                    to={`${API_URL}/${data?.candidate?.academic_file}`}
                    target="_blank"
                  >
                    <button
                      // onClick={handlePrint}
                      className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md transition-transform active:scale-95"
                    >
                      <div className="flex gap-4">
                        <img src={download_img} alt="" />
                        <h3>Download</h3>
                      </div>
                    </button>
                  </NavLink>
                ) : (
                  <>
                    <h2>File is not uploaded</h2>
                  </>
                )}
              </div>
              <div className="border border-black rounded-md p-8 mt-5">
                <h2 className="text-[18px] font-semibold mb-2">Academic-1</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 ">
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
                <div className="grid grid-cols-1 lg:grid-cols-4  gap-4 mt-6">
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
              {/* Job Experience */}
              <div className="flex items-center justify-between mt-10">
                <p className="">Job Experience</p>
                {data?.candidate?.experience_file ? (
                  <NavLink
                    to={`${API_URL}/${data?.candidate?.experience_file}`}
                    target="_blank"
                  >
                    <button
                      // onClick={handlePrint}
                      className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md transition-transform active:scale-95"
                    >
                      <div className="flex gap-4">
                        <img src={download_img} alt="" />
                        <h3>Download</h3>
                      </div>
                    </button>
                  </NavLink>
                ) : (
                  <h2>File is not uploaded</h2>
                )}
              </div>

              <div className="border border-black rounded-md p-8 mt-5">
                <h2 className="text-[18px] font-semibold mb-2">Experience-1</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
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
                      </span>

                      <span>
                        {experience?.employment_period_to || "Not Found"}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 mt-6">
                  <div>
                    <h2 className="text-[18px] font-semibold ">Company Name</h2>
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

              <div className="flex items-center justify-between mt-10">
                <p className="">Training & skills</p>
                {data?.candidate?.training_file ? (
                  <NavLink
                    to={`${API_URL}/${data?.candidate?.training_file}`}
                    target="_blank"
                  >
                    <button
                      // onClick={handlePrint}
                      className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md transition-transform active:scale-95"
                    >
                      <div className="flex gap-4">
                        <img src={download_img} alt="" />
                        <h3>Download</h3>
                      </div>
                    </button>
                  </NavLink>
                ) : (
                  <h2>File is not uploaded</h2>
                )}
              </div>

              <div className="border border-black rounded-md p-8 mt-5 mb-10">
                <h2 className="text-[18px] font-semibold mb-2">Training-1</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 ">
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
                <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 mt-6">
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
                    <h2 className="text-[18px] font-semibold">Training Year</h2>
                    <p>{training?.training_year || "Not Found"} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Profile_Details;
