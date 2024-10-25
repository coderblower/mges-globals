import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { get } from "../../../api/axios"; // Assuming you have a get method for fetching data
import TableLoading from "../../../component/TableLoading";
import download_img from "../../../../public/images/document.svg";

// Import any necessary assets
import jsPDF from "jspdf"; // Import jsPDF for PDF generation
import "jspdf-autotable"; // Import jsPDF-Autotable for table support

const Admin_Pre_Demand_Letter_View = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [demandLetter, setDemandLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the specific demand letter using the provided ID
  const fetchDemandLetter = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const res = await get(`/api/pre_demand_letter/${id}`); 

      if (res) {
        setDemandLetter(res);
      } else {
        setDemandLetter(null);
      }
    } catch (error) {
      console.error("Error fetching demand letter:", error);
      setError("Failed to fetch demand letter. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandLetter();
  }, [id]); // Fetch again if the ID changes

  // Function to generate and download the PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    
    // Add Title
    doc.text("Pre Demand Letter Details", 20, 10);

    // Add description
    doc.text(`Description: ${demandLetter?.description || "N/A"}`, 20, 20);

    // Add positions table
    if (demandLetter?.positions?.length > 0) {
      doc.autoTable({
        startY: 30,
        head: [['Category', 'Qty', 'Salary (SR)']],
        body: demandLetter.positions.map(pos => [pos.category, pos.qty, pos.salary])
      });
    }

    // Add terms & conditions
    doc.text("Terms & Conditions:", 20, doc.previousAutoTable.finalY + 10);
    const terms = demandLetter?.terms_conditions || "No Terms";
    doc.text(terms, 20, doc.previousAutoTable.finalY + 20);

    // Add Status
    doc.text(`Status: ${demandLetter?.status || "Pending"}`, 20, doc.previousAutoTable.finalY + 40);

    // Save PDF
    doc.save(`Pre_Demand_Letter_${demandLetter?.id}.pdf`);
  };

  return (
    <div className="lg:mt-10 mt-2 flex justify-center items-center">
      <div className="bg-white shadow-lg w-full max-w-2xl mt-8 rounded-md border border-gray-300 p-6">
        {/* Header */}
        <h2 className="text-center text-[24px] font-semibold text-black underline">
          Pre Demand Letter Details
        </h2>

        {loading && <TableLoading />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && !error && demandLetter ? (
          <div>
            <div className="flex flex-col">
              {/* <h3 className="font-semibold text-lg">Pre Demand Letter ID: {demandLetter.id}</h3> */}

              {/* Description */}
              <div className="mt-4">
                <p className="font-semibold">Description:</p>
                <p className="mt-1">{demandLetter.description || "N/A"}</p>
              </div>

              {/* Positions */}
              <div className="mt-4">
                <p className="font-semibold">Positions:</p>
                {demandLetter.positions?.length > 0 ? (
                  <div className="border border-black mt-2">
                    <div className="grid grid-cols-3 bg-gray-200 text-black font-semibold text-center p-2">
                      <p>Category</p>
                      <p>Qty</p>
                      <p>Salary (SR)</p>
                    </div>

                    {demandLetter.positions.map((position, i) => (
                      <div key={i} className="grid grid-cols-3 text-center border-t border-black p-2">
                        <p>{position.category}</p>
                        <p>{position.qty}</p>
                        <p>{position.salary}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No Positions</p>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="mt-4">
                <p className="font-semibold">Terms & Conditions:</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: demandLetter.terms_conditions || "No Terms",
                  }}
                  className="border border-gray-200 p-2 mt-2"
                />
              </div>

              {/* Status */}
              <div className="mt-4">
                <p className="font-semibold">Status:</p>
                <p
                  className={`font-semibold ${
                    demandLetter.status === "Approved"
                      ? "text-green-600"
                      : demandLetter.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {demandLetter.status || "Pending"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          !loading && <p>No demand letter found</p>
        )}

        {/* Buttons at the Bottom */}
        <div className="flex justify-between mt-8">
          {/* Back Button */}
          <Link
            to="/hiring_country_recruting_agency/pre_demand_letter" // Link back to the list
            className="py-2 px-4 bg-[#1E3767] text-white font-bold rounded-md flex items-center gap-2"
          >
            <img src={download_img} alt="Back" className="w-4 h-4" />
            <span>Back</span>
          </Link>

          {/* Download Button */}
          <button
            onClick={downloadPDF}
            className="py-2 px-4 bg-green-600 text-white font-bold rounded-md flex items-center gap-2"
          >
            <img src={download_img} alt="Download" className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin_Pre_Demand_Letter_View;
