import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { post } from "../../api/axios";
import download_img from "../../../public/images/download.svg";
import pdf_icon from "../../../public/images/pdfImg.svg";
import user_img from "../../../public/images/Avater.png";
import success_img from "../../../public/images/success_2.svg";
import reject_img from "../../../public/images/alert_icon.svg";
import DocumentCard from "../DocumentCard";
import toast, { Toaster } from "react-hot-toast";
import TableLoading from "../TableLoading";
const API_URL = import.meta.env.VITE_BASE_URL;

const DocumentView = () => {
  const { id } = useParams();
  const [candidateID, setCandidateID] = useState();
  const [approvelStatus, setApprovelStatus] = useState("");
  const [approvelNote, setApprovelNote] = useState("");
  const [data, setData] = useState();
  const [statusValue, setStatusValuet] = useState();
  const [statusMessage, setStatusMessage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUser().then((result) => {
        // console.log(result);
        setData(result);
      });
    }
  }, [id]);

  // Get user role
  useEffect(() => {
    const json_data = window.localStorage.getItem("user");
    const user_data = JSON.parse(json_data);
    setUserRole(user_data);
  }, []);

  const [userRole, setUserRole] = useState();

  // Fetch user
  const fetchUser = async () => {
    setLoading(true);
    let allFile = [];
    try {
      const response = await post(`api/user/get_user`, { id: id });
      console.log(response.data, "====>");
      // setData(response.data);
      setCandidateID(response?.data?.candidate?.id);
      setApprovelNote(response?.data?.candidate?.note);
      setApprovelStatus(response?.data?.candidate?.approval_status);
      const {
        photo,
        nid_file,
        passport_file,
        academic_file,
        experience_file,
        training_file,
        pif_file,
      } = response?.data?.candidate;

      allFile.push({
        id: 1,
        title: "Profile Photo",
        url: photo ? photo : null,
        error: "Profile Photo not uploaded",
      });
      allFile.push({
        id: 2,
        title: "NID Photo",
        url: nid_file ? nid_file : null,
        error: "NID file not uploaded",
      });
      allFile.push({
        id: 3,
        title: "Passport Photo",
        url: passport_file ? passport_file : null,
        error: "Passport file not uploaded",
      });
      allFile.push({
        id: 4,
        title: "Academic Photo",
        url: academic_file ? academic_file : null,
        error: "Academic file not uploaded",
      });
      allFile.push({
        id: 5,
        title: "Experience Photo",
        url: experience_file ? experience_file : null,
        error: "Experience file not uploaded",
      });
      allFile.push({
        id: 6,
        title: "Training Photo",
        url: training_file ? training_file : null,
        error: "Training file not uploaded",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error creating app:", error);
      setLoading(false);
    } finally {
      console.log(allFile);
      setLoading(false);
      return allFile;
    }
  };

  // Submit candidate
  const submitCandidate = async () => {
    const payload = {
      id: candidateID,
      approval_status: statusValue,
      note: statusMessage,
    };

    console.log(payload);

    try {
      const res = await post("api/candidate/update_approval_status", payload);
      if (res?.success) {
        console.log(res);
        setStatusValuet("");
        setStatusMessage("");
        toast.success(res.message);
      }
    } catch (error) {
      console.log("Failed to post/======>182", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-8">
        <h2 className="font-bold text-[24px] ">Document View</h2>
      </div>

      {/* Rejectet candidate  */}
      {!loading &&
        (approvelStatus === "reject" || approvelStatus === "approve") && (
          <div className="flex justify-center mt-14 mb-[70px]">
            <div>
              <div
                className={`py-[50px] border ${
                  approvelStatus === "reject" && "border-[red]"
                } lg:w-[650px]  rounded-md flex items-center justify-center`}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-7">
                    {approvelStatus === "reject" ? (
                      <img className="w-[53px]" src={reject_img} alt="" />
                    ) : (
                      <img className="w-[53px]" src={success_img} alt="" />
                    )}
                  </div>
                  <p
                    className={`text-center ${
                      approvelStatus === "reject" ? "text-[red]" : "text-black"
                    }`}
                  >
                    {approvelNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* document view  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px] relative mt-[50px]">
        {!loading &&
          data?.length > 0 &&
          data.map((file, i) => <DocumentCard key={i} file={file} />)}
      </div>

      {/* Loading  */}
      {loading && (
        <div className="flex justify-center min-w-full mt-20 ">
          <TableLoading />
        </div>
      )}
      {!loading && data?.length === 0 && (
        <div className="flex justify-center min-w-full mt-20 ">
          <h4 className="text-black font-bold text-xl">No Data found!</h4>
        </div>
      )}

      {/* Candidate aprove, reject and message  */}
      {!loading && (
        <div className="mt-14">
          {/* message area */}
          {userRole?.role_id === 1 && approvelStatus === "pending" && (
            <>
              <div className="flex items-center justify-between mb-[15px]">
                <h2 className=""> Message </h2>
                <select
                  value={statusValue}
                  onChange={(e) => setStatusValuet(e.target.value)}
                  className="px-4 py-1  border-[1px]  rounded-md outline-none border-[#b9b9b9]"
                >
                  <option value="">-- Set Status --</option>
                  <option value="approved">Approved</option>
                  <option value="reject">Reject</option>
                </select>
              </div>
              <textarea
                className="border-[1px] border-black w-full outline-none rounded-md p-5"
                value={statusMessage}
                onChange={(e) => setStatusMessage(e.target.value)}
                rows="10"
              />
              <div className="flex justify-end">
                <button
                  onClick={submitCandidate}
                  className="py-[15px] px-[40px] transition-transform active:scale-95 bg-[#1E3767] text-white font-bold rounded-md mt-5 flex gap-2"
                  type="button"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      )}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default DocumentView;
