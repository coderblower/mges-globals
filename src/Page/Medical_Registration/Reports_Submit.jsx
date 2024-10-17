import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { post } from "../../api/axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../component/Loading";
import TableBody from "./TableBody";

const Reports_Submit = () => {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("fit");
  const { id, country_id } = useParams();
  const [report, setReport] = useState(null);
  const [test, setTest] = useState([]);
  const [newData, setNewData] = useState({});
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");

  const pushData = () => {
    const data = Array.from({ length: 1 }, (_, index) => ({
      id: index + 1,
      name: "Rakib",
      date: "12/09/23",
      status: "Fit",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  // const [
  //   url,
  //   key,
  //   setUrl,
  //   setKey,
  //   loading,
  //   handleFileChange,
  //   handleDeleteImage,
  // ] = useFileUpload();
  // console.log(test, "test");

  useEffect(() => {
    fetchReport();
  }, [id, country_id]);

  const onSelectFile = async (e) => {
    console.log(e.target, "click");
    handleFileChange(e);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const fetchReport = async () => {
    try {
      const response = await post(
        `api/candidate_medical_test/medical_report_data`,
        {
          id: id,
          country_id: country_id,
        }
      );

      setReport(response.data.data[0]);
      setTest(response.data.tests);
    } catch (err) {
      console.log(err);
    }
  };

  const submitReport = async () => {
    const payload = {
      id: report.id,
      file: file,
      result: status,
      note,
    };
    console.log(payload);
    setLoading(true);
    try {
      const response = await post(
        `api/candidate_medical_test/update`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response?.success) {
        toast.success(response.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("feaild to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 lg:px-0">
      <div className="lg:mt-10 mt-2">
        <div className="flex justify-between items-center ">
          <h2 className="font-bold text-[24px] text-[#4D4D4D]">
            Reports Submit
          </h2>
        </div>

        {/* table  */}
        <div className="overflow-auto mt-6">
          <table className="table table-zebra overflow-x-auto">
            {/* head */}
            <thead>
              <tr className="uppercase whitespace-nowrap  text-[#4D4D4D] text-[14px] bg-[#EEEEEE]">
                <th className="py-5">ID</th>
                <th className="py-5">Name</th>
                <th className="py-5 text-center">Passport</th>
                <th className="py-5 text-center">Medical Test Report</th>
                <th className="py-5 pl-5">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="whitespace-nowrap text-[#4D4D4D] font-[500]">
                <th>{report?.user_id}</th>

                {/* <th>{report?.user?.name}</th> */}
                <th>
                  {report?.candidate?.country === "1" ? (
                    <div className="flex gap-2">
                      <p className="text-[15px]">
                        {report?.candidate?.firstName}
                      </p>
                      <p className="text-[15px]">
                        {report?.candidate?.lastName}
                      </p>
                    </div>
                  ) : (
                    report?.user?.name
                  )}
                </th>

                <th className="text-center">{report?.candidate?.passport}</th>
                <th className="text-center">
                  <select>
                    <option value="fit">Fit</option>
                    <option value="unfit">UnFit</option>
                  </select>
                </th>
                <th>
                  {report?.status !== "fit"
                    ? "Not Ready"
                    : "Ready for Visa Process"}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="font-[500] text-[18px] text-[#4D4D4D] mt-10">
          Required Test
        </h2>
        <div className="overflow-auto mt-4">
          <table className="table table-zebra overflow-x-auto">
            <thead>
              <tr className="uppercase whitespace-nowrap  text-[#4D4D4D] text-[14px] bg-[#EEEEEE]">
                <th className="py-5 text-center">Serial No</th>
                <th className="py-5 text-center">Test Name</th>
                {/* <th className="py-5 text-center">Status</th>
                <th className="py-5 text-center">Upload Test Report</th> */}
              </tr>
            </thead>
            <tbody>
              {test &&
                test?.map((data) => (
                  <TableBody
                    setNewData={setNewData}
                    data={data}
                    key={data.id}
                  />
                ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-5 items-center mt-14 ml-10">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="note"
            className="border-2 border-gray-300 px-4 py-3 rounded-md"
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="fit">Fit</option>
            <option value="unfit">UnFit</option>
            <option value="pending">Pending</option>
          </select>

          {report?.max === 1 && (
            <div>
              <input
                type="checkbox"
                name="repeat"
                id="repeat"
                required=""
                className="mr-2"
                checked={report?.max === 1}
              />
              <label className="text-[#202020]" htmlFor="repeat">
                Repeat
              </label>
            </div>
          )}

          <div>
            <button
              onClick={handleButtonClick}
              className={`bg-[#1E3767] font-[500] px-[20px] py-[6px] text-white text-[14px] rounded-[8px]`}
            >
              Upload
            </button>

            <input
              className="hidden"
              id="Images"
              type="file"
              name="images"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <button
            disabled={loading}
            onClick={submitReport}
            className={`bg-[#1E3767] font-[500] px-[30px] py-[6px] text-white text-[16px] rounded-[8px] ${
              loading ? "opacity-80" : ""
            }`}
          >
            {loading ? <Loading /> : "Submit"}
          </button>
        </div>

        {/* pagition  */}

        {/* <Pagination
          paginations={paginations}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Reports_Submit;
