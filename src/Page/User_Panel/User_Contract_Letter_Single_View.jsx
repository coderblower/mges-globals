import { useEffect, useState, useRef } from "react";
import { get } from "../../api/axios"; // Adjust the path according to your project structure
import { useParams, Link, useNavigate } from "react-router-dom";
import TableLoading from "../../component/TableLoading";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For creating tables in the PDF
import autoTable from 'jspdf-autotable';
import html2canvas from 'html2canvas';
import domtoimage from "dom-to-image";

const User_Contract_Letter_Single_View = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const [demandLetter, setDemandLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for the back button
  const contractRef = useRef();  

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
    const input = contractRef.current;
    domtoimage.toPng(input)
      .then((imgData) => {
        const pdf = new jsPDF({
          orientation: 'portrait', // or 'landscape'
          unit: 'mm',               // measurement units
          format: 'a4'              // A4 size
        });
        const imgWidth = pdf.internal.pageSize.getWidth();
        const imgHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('contract-letter.pdf');
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };
  return (
    <div className="lg:mt-10 mt-2 flex justify-center items-center">
      <div  style={{ fontFamily: "'Noto Sans', sans-serif" }}  id="contract" ref={contractRef}  className="bg-white shadow-lg w-full max-w-2xl mt-8 rounded-md border border-gray-300 p-6">
        <h2 className="text-center text-[24px] font-semibold text-black underline">
        FIXED-TERM EMPLOYMENT CONTRACT
        </h2>

        {loading && <TableLoading />}
        {error && <div className="text-red-500">{error}</div>}

        {!loading && demandLetter ? (
          <div className="mt-4 text-[16px]">
            
            <p className="mt-4">
          
This "FIXED-TERM EMPLOYMENT CONTRACT" has been made between the employer and the employee 
(foreign person), whose names and addresses are written below, entirely of their own free will and with the 
conditions stated below. The parties will hereinafter be referred to as "employer" and "employee". 
            </p>

            <p className="mt-4">
            1. Parties 
             
            </p> 

            <p className="mt-4 ml-5">
            a. Employers 

             
            </p>
            <table style={{ borderCollapse: 'collapse', width: '100%', margin: '20px 0' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #000', padding: '8px' }}>Name</th>
            
            <th colSpan="3" style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>
*********
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #000', padding: '8px' }}>Father's Name</td>
            <td style={{ border: '1px solid #000', padding: '8px' }}>*******</td>
            <td style={{ border: '1px solid #000', padding: '8px' }}>Mother's Name</td>
            <td style={{ border: '1px solid #000', padding: '8px' }}>********</td>
            
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>

            <p><strong>Visa Number:</strong> {demandLetter.visa_number || "N/A"}</p>
            <p><strong>Dated:</strong> {demandLetter.visa_date || "N/A"}</p>

            

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

export default User_Contract_Letter_Single_View;
