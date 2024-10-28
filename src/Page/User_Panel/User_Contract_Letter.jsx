import { useEffect, useState } from "react";
import { post, get } from "../../api/axios";
import user_img from "../../../public/images/Avater.png";
import notQR_img from "../../../public/images/notQR.jpeg";
import delete_icon from "../../../public/images/delete_icon.svg";
import edit_icon from "../../assets/update.svg";
import veiw_icon from "../../../public/images/veiw_ison.svg";
import {useParams, Link, NavLink } from "react-router-dom";
import Pagination from "../../component/Pagination";
import SearchInput from "../../component/SearchInput";
import TableLoading from "../../component/TableLoading";
import CSVBtn from "../../component/CSVBtn";
import success_icon from "../../../public/images/success.svg";
import documentUploadet from "../../../public/images/document.svg";
import documentNotUploadet from "../../../public/images/document.svg";
import checkedImg from "../../../public/images/success_2.svg";
import { document } from "postcss";





const API_URL = import.meta.env.VITE_BASE_URL;

const User_Contract_Letter = () => {
  const [candidate, setCandidate] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const { id } = useParams();
  const [sendSuccess, setSendSuccess] = useState(false);
  const [candidateList, setCandidateList] = useState(0); 



  const [pagination, setPagination] = useState({
    per_page: 10,
    total: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCandidates();
    showSendButton();
  }, [currentPage, search, countryFilter]);

  const showSendButton = async () => {
    setLoading(true);

   try {
      let canArr = candidate.reduce((acc, val)=>( [...acc, val.id]), [])
      
      
      
      setSendSuccess(response);

    } catch (error) {
      console.error("Error sending data:", error);
    }


  };
  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const response = await post('api/contract_letter/agent');

      console.log(response);
      setCandidate(response || []);
      setCandidateList(res.length)
      setPagination({
        per_page: res?.data?.per_page,
        total: res?.data?.total,
      });
      setCsvData(transformDataForCSV(res?.data_all));
    } catch (error) {
      console.error("Error fetching candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const transformDataForCSV = (data) => {
    return data?.map((item) => ({
      id: item.id,
      Name: item?.name,
      Passport: item?.candidate?.passport || "N/A",
      Designation: item?.candidate?.designation?.name || "N/A",
      Created_By: item?.created_by?.name || "N/A",
      Submission_Date: item?.updated_at?.slice(0, 10) || "N/A",
      Country: item?.candidate?.country === "2" ? "Turkey" : "Russia",
      Status: item?.result || "pending",
    }));
  };

  const handleSend = async () => {
    try {
      let canArr = candidate.reduce((acc, val)=>( [...acc, val.id]), [])
      
      const response = await post('api/contract_letter/contract', {
        primary_candidates: canArr, // Your candidate list
        demand_letter_id: id, // Pass user_id as needed
         // Any filter you are applying
        
      });
      setSendSuccess(1);

      
      
      if (response.status === 200) {
        console.log("Successfully sent the data");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  
  const handleCountrySearch = (e) => {
    setCountryFilter(e.target.value);
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* Filter and search section */}
      <div className="lg:flex justify-between items-center">
          <div className="flex gap-4 mt-[20px] lg:mt-0">
          {csvData?.length > 0 && (
            <CSVBtn data={csvData} filename={"Candidates_List"} />
          )}
        </div>
      </div>

      {/* Candidates Table */}
      {!loading && candidate?.length !== 0 && (
        <div className="flex justify-center min-w-full mt-20">
          <div>
             
             {candidate.map((x,y)=>{
              return (<div>
                  <button>
                  <Link
                      to={`/user_panel/contract_letter/${x}`}
                      className=" "
                    >
                      <img src={documentNotUploadet} alt="View Contract Letter" style={{ height: '200px', width: '150px', fill: 'green' }} />
                      <button>{'Contract Letter '+y+1}</button>
                    </Link>
                      
                  </button>
                </div>)
             })}

          </div>
        </div>
      )}

      {/* Loading and empty states */}
      {loading && (
        <div className="flex justify-center min-w-full mt-20">
          <TableLoading />
        </div>
      )}
      {!loading && candidate?.length === 0 && (
        <div className="flex justify-center min-w-full mt-20">
          <h4 className="text-black font-bold text-xl">No Data found!</h4>
        </div>
      )}

      {/* Pagination */}
      {!loading && candidate?.length > 0 && pagination?.total > pagination?.per_page && (
        <Pagination
          paginations={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default User_Contract_Letter;
