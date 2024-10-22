import React, { useEffect, useState } from "react";
import { post, get } from "../../api/axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import TableLoading from "../../component/TableLoading";
import SearchInput from "../../component/SearchInput";
import Pagination from "../../component/Pagination";
import CSVBtn from "../../component/CSVBtn";

const Agreed_Pre_Demand_Letter_Single = () => {
  const { id } = useParams(); // Get the id from the URL
  const navigate = useNavigate();
  const [letters, setLetters] = useState([]); // This will hold users
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [csvData, setCsvData] = useState([]);
  const [allLetters, setAllLetters] = useState([]);
  const [pagination, setPagination] = useState({
    per_page: "",
    total: "",
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [preDemandLetter, setPreDemandLetter] = useState(null); // New state for pre-demand letter data
  const [quantityData, setQuantityData] = useState({});// State for quantities keyed by letter.id

  useEffect(() => {
    fetchPreDemandLetterData(); // Fetch pre-demand letter data
  }, [id]); // Only run this when id changes

  useEffect(() => {
    if (allLetters) {
      const transformedData = allLetters?.map((letter) => ({
        id: letter.id,
        "Company Name": letter.company_name,
        "License No": letter.license_no,
        "Submission Date": letter.updated_at.slice(0, 10),
        Status: letter.status || "Pending",
      }));
      setCsvData(transformedData);
    }
  }, [letters]);

  const fetchPreDemandLetterData = async () => {
    setLoading(true);
    try {
      const res = await get(`/api/pre_demand_letter/agent_list_in_agreed/${id}`); // Fetch pre-demand letter data
      if (res) {
        setPreDemandLetter(res.pre_demand_letter); // Set the pre-demand letter data
        setLetters(res.users); // Set users
        setPagination({
          per_page: res.per_page,
          total: res.total,
        });
      }
    } catch (error) {
      console.error("Error fetching pre-demand letter data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCSVData = async () => {
    setLoading(true);
    try {
      const res = await get(`/api/pre_demand_letter/index?page=${currentPage}`);
      if (res) {
        setAllLetters(res?.data);
      }
    } catch (error) {
      console.error("Error fetching CSV data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveStatus = async (id) => {
    setLoading(true);
    try {
      const res = await post(`/api/pre_demand_letter/status_approve/${id}`);
      if (res) {
        fetchPreDemandLetterData(); // Re-fetch the data after approval
      }
    } catch (error) {
      console.error("Error approving status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (letterId) => {
    // Toggle row expansion when checkbox is selected or deselected
    if (selectedRows.includes(letterId)) {
      setSelectedRows(selectedRows.filter((id) => id !== letterId));
      const newQuantityData = { ...quantityData };
      delete newQuantityData[letterId]; // Remove the entry for this letter if unchecked
      setQuantityData(newQuantityData);
    } else {
      setSelectedRows([...selectedRows, letterId]);
    }
  };

  const handleQuantityChange = (letterId, category, value) => {
    setQuantityData(prev => ({
      ...prev,
      [letterId]: {
        ...prev[letterId], // Preserve previous categories for this letter
        [category]: value, // Set the quantity for this specific category
      },
    }));

    console.log(quantityData)
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const payload = Object.keys(quantityData).map(letterId => ({
      id: letterId,
      qty: quantityData[letterId],
    }));
    
    console.log(payload); // Prepare for sending payload to server
    // Use post to submit payload to your server
    // await post('/api/submit-endpoint', payload);
  };

  return (
    <div className="lg:mt-10 mt-2">
      {/* Header */}
      <div className="lg:flex justify-between items-center">
        <div>
          <h2 className="font-bold text-[24px]">
            Agreed Pre Demand Letter ({letters?.length})
          </h2>
        </div>
        <div className="flex gap-4 mt-6 lg:mt-0">
          <SearchInput placeholder="Search Pre-Demand Letter" />
          {csvData?.length > 0 && (
            <div className="mt-2">
              <CSVBtn data={csvData} filename={"Pre-Demand Letters List"} />
            </div>
          )}
        </div>
      </div>

      {/* Show Pre Demand Letter Data */}
      {preDemandLetter && (
      <div className="mt-4 p-4 bg-gray-200">
        <p><strong>Description:</strong> {preDemandLetter.description}</p>
        <p><strong>Status:</strong> {preDemandLetter.status}</p>
        <p><strong>Created At:</strong> {new Date(preDemandLetter.created_at).toLocaleDateString()}</p>
    
        {/* Display positions */}
        <h4 className="font-bold mt-2">Positions:</h4>
        <ul className="list-disc pl-5">
          {preDemandLetter.positions?.map((position, index) => (
            <p key={index}>
              <span className="font-bold">Category:</span> {position.category} - <br />
              <span className="font-bold">Quantity:</span> {position.qty}, <br />
              <span className="font-bold">Salary:</span> ${position.salary}
            </p>
          ))}
        </ul>
    
        {/* Display terms and conditions */}
        <h4 className="font-bold mt-2">Terms and Conditions:</h4>
        <div dangerouslySetInnerHTML={{ __html: preDemandLetter.terms_conditions }} />
      </div>
      )}
      
      <div>
        <h2 className="font-bold text-[24px] mt-[30px]">
          Select Agent and send To Agency  
        </h2>
      </div>
      
      {/* Form for submitting quantities */}
      <form onSubmit={handleSubmit}>
        {/* Table */}
        <div className="overflow-auto mt-6">
          <table className="table table-zebra overflow-x-auto w-full">
            <thead className="border-b-2">
              <tr className="uppercase bg-[#f2f2f2]">
                <th>Sl</th>
                <th>Name</th>
                <th>Licence</th>
                <th className="text-center py-4 w-[20%]">Action</th>
              </tr>
            </thead>

            <tbody>
              {!loading && letters?.length > 0 &&
                letters.map((letter, i) => (
                  <React.Fragment key={letter.id}>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{letter.partner?.full_name || letter.name}</td>
                      <td>{letter.partner?.license_no || "N/A"}</td>
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(letter.id)}
                          onChange={() => handleCheckboxChange(letter.id)}
                        />
                      </td>
                    </tr>

                    {/* Conditionally render expanded row with extra inputs if checkbox is selected */}
                    {selectedRows.includes(letter.id) && (
                      <tr>
                        <td colSpan="4">
                          <div className="p-4 bg-gray-100">
                            {preDemandLetter.positions?.map((position, index) => (
                              <div key={index} className="flex items-center mb-2">
                                <span className="mr-2">Category:</span>
                                <span className="mr-4">{position.category}</span>
                                <input
                                  type="number"
                                  defaultValue={position.qty} // Default value for quantity input
                                  onChange={(e) => handleQuantityChange(letter.id, position.category, e.target.value)} // Update quantity for this category
                                  className="w-1/4 p-2 border border-gray-300 rounded-md mr-4"
                                  placeholder="Enter number of positions"
                                />
                                <span>Salary: ${position.salary}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>

          {loading && (
            <div className="flex justify-center min-w-full mt-20">
              <TableLoading />
            </div>
          )}
          {!loading && letters?.length === 0 && (
            <div className="flex justify-center min-w-full mt-20">
              <h4 className="text-black font-bold text-xl">No Data found!</h4>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-end">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>

        {/* Pagination */}
        {!loading && letters?.length > 0 && pagination?.total > pagination?.per_page && (
          <Pagination
            paginations={pagination}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </form>
    </div>
  );
};

export default Agreed_Pre_Demand_Letter_Single;
