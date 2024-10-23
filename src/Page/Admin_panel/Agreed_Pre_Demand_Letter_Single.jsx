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
  const [quantityData, setQuantityData] = useState([]);

  useEffect(() => {
    fetchPreDemandLetterData(); // Fetch pre-demand letter data
  }, [id]); // Only run this when id changes

  useEffect(() => {
    if (allLetters) {
      const transformedData = allLetters?.map((letter) => ({
        id: letter.id,
        "Company Name": letter.company_name || 'N/A',
        "License No": letter.license_no || 'N/A',
        "Submission Date": letter.updated_at ? letter.updated_at.slice(0, 10) : 'N/A',
        Status: letter.status || "Pending",
      }));
      setCsvData(transformedData);
    }
  }, [allLetters]);

  const fetchPreDemandLetterData = async () => {
    setLoading(true);
    try {
      const res = await get(`/api/pre_demand_letter/agent_list_in_agreed/${id}`); // Fetch pre-demand letter data
      if (res) {
        setPreDemandLetter(res.pre_demand_letter); // Set the pre-demand letter data
        setLetters(res.users); // Set users
        setPagination({
          per_page: res.per_page || 10,
          total: res.total || 0,
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


  const handleSave = (letterId) => {
    // Remove the row from selectedRows to collapse it
    setSelectedRows((prevSelectedRows) => prevSelectedRows.filter((id) => id !== letterId));
  
    // Data in quantityData remains unchanged
  };
  

  const handleQuantityChange = (letterId, category, value) => {
    setQuantityData((prev) => {
      // Ensure prev is an array
      const data = Array.isArray(prev) ? prev : [];
  
      const existingLetterIndex = data.findIndex((item) => item.id === letterId);
  
      if (existingLetterIndex !== -1) {
        // Letter exists, update the positions array
        const updatedPositions = data[existingLetterIndex].positions.map((position) => {
          if (position.des === category) {
            return { ...position, qty: value }; // Update quantity for the category
          }
          return position;
        });
  
        const updatedData = [...data];
        updatedData[existingLetterIndex] = {
          id: letterId,
          positions: updatedPositions,
        };
  
        return updatedData; // Return updated array
      } else {
        // Letter doesn't exist, add new entry
        return [
          ...data,
          {
            id: letterId,
            positions: [{ des: category, qty: value }],
          },
        ];
      }
    });
  };
  
  const handleCheckboxForPosition = (letterId, category, isChecked) => {
    setQuantityData((prev) => {
      // Ensure prev is an array
      const data = Array.isArray(prev) ? prev : [];
  
      if (isChecked) {
        const existingLetterIndex = data.findIndex((item) => item.id === letterId);
  
        if (existingLetterIndex !== -1) {
          // Letter exists, add the new position
          const updatedPositions = [
            ...data[existingLetterIndex].positions,
            { des: category, qty: 0 }, // Initial quantity is 0
          ];
  
          const updatedData = [...data];
          updatedData[existingLetterIndex] = {
            ...data[existingLetterIndex],
            positions: updatedPositions,
          };
  
          return updatedData;
        } else {
          // If letter doesn't exist, add new entry
          return [
            ...data,
            { id: letterId, positions: [{ des: category, qty: 0 }] },
          ];
        }
      } else {
        // If unchecked, remove the position
        const updatedData = data.map((letter) => {
          if (letter.id === letterId) {
            const updatedPositions = letter.positions.filter(
              (pos) => pos.des !== category
            );
            return { ...letter, positions: updatedPositions };
          }
          return letter;
        });
  
        return updatedData.filter((letter) => letter.positions.length > 0);
      }
    });
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const payload = quantityData;
    
    try {
      const res = await post(`/api/pre_demand_letter/admin_approve_agent_agreed_pre_demand/${id}`, payload);
      console.log(payload); // Log payload
    } catch (error) {
      console.error("Error submitting the data:", error);
    }
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
            <input
              type="checkbox"
              className="mr-2"
              checked={Array.isArray(quantityData) && quantityData.some(
                (data) =>
                  data.id === letter.id &&
                  data.positions.some((pos) => pos.des === position.category)
              )}
              onChange={(e) => {
                const isChecked = e.target.checked;
                handleCheckboxForPosition(letter.id, position.category, isChecked);
              }}
            />
            <span className="mr-4">Category: {position.category}</span>
            <input
              type="number"
              disabled={
                !(Array.isArray(quantityData) && quantityData.some(
                  (data) =>
                    data.id === letter.id &&
                    data.positions.some((pos) => pos.des === position.category)
                ))
              }
              defaultValue={position.qty}
              onChange={(e) =>
                handleQuantityChange(letter.id, position.category, e.target.value)
              }
              className="input input-bordered w-24"
            />
          </div>
        ))}

        {/* Save Button */}
        <div className="mt-4">
          <button
            className="btn bg-[#071e55] text-white"
            onClick={() => handleSave(letter.id)} // Call handleSave on click
          >
            Save
          </button>
        </div>
      </div>
    </td>
  </tr>
)}



                  </React.Fragment>
                ))}

              {/* Loading */}
              {loading && <TableLoading tr_number={4} td_number={4} />}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6">
          <Pagination
            currentPage={currentPage}
            perPage={pagination?.per_page}
            total={pagination?.total}
            onPageChange={(page) => {
              setCurrentPage(page);
              handleCSVData(); // Fetch CSV data on page change
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="text-end mt-[40px]">
          <button
            className="btn bg-[#071e55] w-[200px] text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Agreed_Pre_Demand_Letter_Single;
