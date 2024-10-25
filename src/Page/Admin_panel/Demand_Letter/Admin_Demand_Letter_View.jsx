import { useEffect, useState } from "react";
import { get } from "../../../api/axios"; // Adjust the path according to your project structure
import { useParams, Link, useNavigate } from "react-router-dom";
import TableLoading from "../../../component/TableLoading";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For creating tables in the PDF

const Admin_Demand_Letter_View = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [demandLetter, setDemandLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for the back button

  // Fetch the demand letter from the API
  const fetchDemandLetter = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const res = await get(`/api/demand_letter/${id}`); // Adjust API endpoint
      setDemandLetter(res);
    } catch (error) {
      console.error("Error fetching demand letter:", error);
      setError("Failed to fetch demand letter. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandLetter();
  }, [id]);

  // Function to download the demand letter as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Adding title and company details
    doc.setFontSize(18);
    doc.text("DEMAND LETTER", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Company: ${demandLetter?.company_name || "N/A"}`, 10, 40);
    doc.text(`License No: ${demandLetter?.license_no || "N/A"}`, 10, 50);
    doc.text("Dhaka, Bangladesh", 10, 60);

    doc.text(
      `Please arrange to recruit the following Personnel on the terms and conditions given below against the block visa:`,
      10,
      70
    );
    doc.text(`Visa Number: ${demandLetter?.visa_number || "N/A"}`, 10, 80);
    doc.text(`Dated: ${demandLetter?.visa_date || "N/A"}`, 10, 90);

    // Adding the positions table
    if (demandLetter?.positions?.length > 0) {
      const positions = demandLetter.positions.map((p) => [
        p.category,
        p.qty,
        p.salary,
      ]);
      doc.autoTable({
        head: [["Category", "Qty", "Salary (SR)"]],
        body: positions,
        startY: 100,
      });
    }

    // Adding Terms & Conditions
    doc.text("Terms & Conditions:", 10, doc.lastAutoTable.finalY + 10);
    doc.text("• Accommodation, Medical & Transportation: Free", 10, doc.lastAutoTable.finalY + 20);
    doc.text("• Food: Free", 10, doc.lastAutoTable.finalY + 30);
    doc.text("• Contract Period: 2 years", 10, doc.lastAutoTable.finalY + 40);
    doc.text("• Probationary Period: 3 months", 10, doc.lastAutoTable.finalY + 50);
    doc.text("• Working Hours per day: 8 hrs", 10, doc.lastAutoTable.finalY + 60);
    doc.text("• Vacation Period: 42 days", 10, doc.lastAutoTable.finalY + 70);
    doc.text("• Air Ticket: Both Ways Free", 10, doc.lastAutoTable.finalY + 80);
    doc.text("All other terms and conditions as per Saudi Labor Law.", 10, doc.lastAutoTable.finalY + 90);

    // Adding General Manager signature
    doc.text("General Manager", 150, doc.lastAutoTable.finalY + 110);

    doc.save(`Demand_Letter_${id}.pdf`);
  };

  return (
    <div className="lg:mt-10 mt-2 flex justify-center items-center">
      <div className="bg-white shadow-lg w-full max-w-2xl mt-8 rounded-md border border-gray-300 p-6">
        <h2 className="text-center text-[24px] font-semibold text-black underline">
          DEMAND LETTER
        </h2>

        {loading && <TableLoading />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && demandLetter ? (
          <div className="mt-4 text-[16px]">
            <p><strong>{demandLetter.company_name || "N/A"}</strong></p>
            <p><strong>License No:</strong> {demandLetter.license_no || "N/A"}</p>
            <p><strong>Dhaka, Bangladesh</strong></p>

            <p className="mt-4">
              Please arrange to recruit the following Personnel on the terms and conditions given below against the block visa:
            </p>

            <p><strong>Visa Number:</strong> {demandLetter.visa_number || "N/A"}</p>
            <p><strong>Dated:</strong> {demandLetter.visa_date || "N/A"}</p>

            <div className="border border-black mt-4">
              <div className="grid grid-cols-3 bg-gray-200 text-black font-semibold text-center p-2">
                <p>Category</p>
                <p>Qty</p>
                <p>Salary (SR)</p>
              </div>

              {demandLetter.positions?.map((position, i) => (
                <div key={i} className="grid grid-cols-3 text-center border-t border-black p-2">
                  <p>{position.category}</p>
                  <p>{position.qty}</p>
                  <p>{position.salary}</p>
                </div>
              ))}
            </div>

            <h4 className="font-semibold text-lg mt-4">Terms & Conditions:</h4>
            <ul className="list-disc pl-6">
              <li>Accommodation, Medical & Transportation: Free</li>
              <li>Food: Free</li>
              <li>Contract Period: 2 years</li>
              <li>Probationary Period: 3 months</li>
              <li>Working Hours per day: 8 hrs</li>
              <li>Vacation Period: 42 days</li>
              <li>Air Ticket: Both Ways Free</li>
            </ul>

            <p className="mt-4">
              All other terms and conditions as per Saudi Labor Law.
            </p>

            <div className="mt-8 text-right">
              <p><strong>General Manager</strong></p>
            </div>

            {/* Back and Download Buttons */}
            <div className="flex justify-between mt-8">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Back
              </button>

              {/* Download Button */}
              <button
                onClick={downloadPDF}
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        ) : (
          !loading && <p>No demand letter found</p>
        )}
      </div>
    </div>
  );
};

export default Admin_Demand_Letter_View;
