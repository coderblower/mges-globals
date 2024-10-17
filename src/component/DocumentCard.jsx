const API_URL = import.meta.env.VITE_BASE_URL;
import { Link, Navigate } from "react-router-dom";
import pdf_icon from "../../public/images/pdfImg.svg";
import visite_icon from "../../public/images/visiteArrow.svg";
import "./DocumentCard.css";

const DocumentCard = ({ file }) => {
  const { id, title, url, error } = file;

  // Check image type in PDF
  const handleImgTypeCheck = (file) => {
    const extension = file.split(".").pop().toLowerCase();
    return extension === "pdf";
  };

  return (
    <div className="documentCard_container  border h-[400px]  rounded-md relative overflow-hidden transition-all shadow-md">
      {/* image div */}
      <div className="image_div w-full h-full">
        {url ? (
          handleImgTypeCheck(url) ? (
            <img className="h-[200px] w-full mt-[40px]" src={pdf_icon} />
          ) : (
            <img
              className="h-full w-full rounded-md "
              src={`${API_URL}/${url}`}
            />
          )
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <h2 className="text-red-500 text-[20px]">{error}</h2>
          </div>
        )}
      </div>

      {/* card title div */}
      <div className="bg-[#1e3767] absolute top-[15px] left-0 rounded-r-full py-[8px] px-[13px]">
        <h2 className="text-[18px] font-[500] text-white">{title}</h2>
      </div>

      {/* details btn div */}
      {url && (
        <div className="details_btn absolute -bottom-[400px] h-[330px] bg-[#1e3767] w-full text-white flex  justify-center rounded-full">
          <Link to={`${API_URL}/${url}`} target="_blank">
            <div className="h-[50px] flex items-center gap-2 mt-[30px]">
              <h2 className="text-[18px] font-[500] ">{title}</h2>
              <img
                className="w-[20px] -rotate-[50deg] -mt-[6px]"
                src={visite_icon}
                alt=""
              />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DocumentCard;
