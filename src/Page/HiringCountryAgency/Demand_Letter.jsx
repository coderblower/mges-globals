import { useEffect, useState } from "react";
import { get, post } from "../../api/axios";  // Assuming you're using the 'post' method to interact with your API
import download_img from "../../../public/images/document.svg";
import TableLoading from "../../component/TableLoading";
import { Link } from "react-router-dom";
import Pagination from "../../component/Pagination";

const Demand_Letter = () => {
  const [demandLetters, setDemandLetters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    per_page: "",
    total: "",
  });


  // Fetch demand letters from the API
  // Inside the fetchDemandLetters function
  const fetchDemandLetters = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const res = await get(`/api/pre_demand_letter/agreed_pdl_to_agency`);

    
        setDemandLetters(res.data);
        setPagination({
          per_page: res.per_page,
          total: res.total,
        });
   

    } catch (error) {
      console.error("Error fetching demand letters:", error);
      setError("Failed to fetch demand letters. Please try again later.");
    } finally {
      setLoading(false);
      console.log(demandLetters)
    }
  };


  useEffect(() => {
    fetchDemandLetters();
  }, [currentPage]);

  const handleApprove = (id) => {
    setDemandLetters(demandLetters.map(letter =>
      letter.id === id ? { ...letter, status: "Approved" } : letter
    ));
  };

  const handleReject = (id) => {
    setDemandLetters(demandLetters.map(letter =>
      letter.id === id ? { ...letter, status: "Rejected" } : letter
    ));
  };

  const handleDelete = (id) => {
    setDemandLetters(demandLetters.filter(letter => letter.id !== id));
  };

  const handleCreate = () => {
    console.log("Create a new demand letter");
  };

  function random(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="lg:mt-10 mt-2">
      <div className="flex items-center justify-between mt-[24px]">
        <h2 className="text-[24px] text-[#4D4D4D]"> Issue Demand Letter</h2>
        <button
          onClick={handleCreate}
          className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md"
        >
          <Link
            to="/hiring_country_recruting_agency/create_demand_letter"
            className="flex gap-4"
          >
            <img src={download_img} alt="Create Demand Letter" />
            <h3> Demand Letter</h3> 
          </Link>
        </button>
      </div>

      {/* Demand Letters Table */}
      <div className="bg-white shadow-lg mt-8 rounded-md lg:px-[46px] px-[10px] py-[27px]">
        {loading && <TableLoading />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && demandLetters.length > 0 ? (
            <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F5F5F5] text-[#333]">
                <th className="py-4 px-3 font-semibold">Sl.</th>
                <th className="py-4 px-3 font-semibold">Description</th>
                {/* <th className="py-4 px-3 font-semibold">Category</th>
                <th className="py-4 px-3 font-semibold">Qty</th>
                <th className="py-4 px-3 font-semibold">Salary</th> */}
                
                <th className="py-4 px-3 font-semibold text-center">Total Agencies Recomended </th>
                <th className="py-4 px-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandLetters.map((letter, index) => {
                return (

                

                <tr
                  key={letter.id}
                  className={`${index % 2 === 0 ? "bg-white" : "bg-[#f9f9f9]"
                    } hover:bg-[#f1f1f1]`}
                >
                  <td className="py-4 px-3">{index+1}</td>
                  <td className="py-4 px-3">{letter.description}</td> 
                  {/* {letter.positions.map((position, i) => (
                          <>
                          
                          <td className="py-4 px-3 text-center">{position.category || "N/A"}</td>
                          <td className="py-4 px-3 text-center">{position.qty || "N/A"}</td> 
                          <td className="py-4 px-3 text-center">{position.salary || "N/A"}</td>   
                          </>
                          
                        )) } */}
                  
                  
                  <td
                    className={`py-4 px-3 text-center font-semibold ${letter.status === "Approved"
                        ? "text-green-600"
                        : letter.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                  >
                    {letter.bd_agency_agree.length}
                  </td>
                  <td className="py-4 px-3 text-center">
                    <Link
                      to={`/hiring_country_recruting_agency/demand_letter/prepare/${letter.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Send
                    </Link>
                  </td>
                </tr>
              )}
              
              )}

            </tbody>
          </table>
        ) : (
          !loading && <p>No demand letters found</p>
        )}
      </div>
      {!loading && demandLetters?.length > 0 && pagination?.total > pagination?.per_page && (
        <Pagination
          paginations={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>

  );
};

export default Demand_Letter;
