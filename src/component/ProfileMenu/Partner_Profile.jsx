import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { post } from "../../api/axios";
import TextTitle from "../TextTitle";
import user_img from "../../../public/images/Avater.png";
import download_img from "../../../public/images/download.svg";
import { useReactToPrint } from "react-to-print";

const Partner_Profile = () => {
  const pdfRef = useRef();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [address, setAddress] = useState({});
  const [count, setCount] = useState(0);

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await post(`api/user/get_user`, { id: id });
      setData(response.data);
    } catch (error) {
      console.error("Error creating app:", error);
    }
  };

  useEffect(() => {
    if (data?.partner?.address) {
      const address_data = JSON.parse(data?.partner?.address);
      setAddress(address_data);
    }
  }, [data]);

  useEffect(() => {
    post(`api/candidate/candidate_by_creator_count`, { user_id: id })
      .then((res) => {
        setCount(res);
        //  console.log(res.count);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mt-[24px] mb-[16px] pr-[20px]">
        <h2 className="text-[24px] font-[500] pl-[20px]">Partner Profile</h2>
        <button
          // onClick={handlePdfDawnlod}
          onClick={handlePrint}
          className="py-3 px-6 bg-[#1E3767] text-white font-bold rounded-md transition-transform active:scale-95"
        >
          <div className="flex gap-4">
            <img src={download_img} alt="" />
            <h3>Download</h3>
          </div>
        </button>
      </div>
      <div
        ref={pdfRef}
        className="bg-[#EEEEEE] p-5 rounded-md flex justify-between gap-5 m-[20px]"
      >
        <div className="w-1/3 flex flex-col justify-center items-center">
          <img
            className="h-[150px] w-[150px] rounded-full"
            src={
              data?.candidate?.photo
                ? `${API_URL}/${data?.candidate?.photo}`
                : user_img
            }
          />
          <h2 className="mt-3 font-bold mb-3">{data?.name}</h2>
        </div>
        <div className="w-2/3 gap-5">
          <div className=" grid grid-cols-1 lg:grid-cols-2 border-b-4 border-gray-400  pb-2">
            <TextTitle title="Organisation Name:" data={data?.name} />
            <TextTitle title="Phone Number:" data={data?.phone} />
            <TextTitle title="Email:" data={data?.email} />
            <TextTitle
              title="Authorize Person:"
              data={data?.partner?.authorize_person}
            />
            <TextTitle
              title="Account Name:"
              data={data?.partner?.bank_account_name}
            />
            <TextTitle
              title="Account Number:"
              data={data?.partner?.bank_account_number}
            />

            <TextTitle
              title="License Number:"
              data={data?.partner?.license_no}
            />
            <TextTitle
              title="Trade License Number:"
              data={data?.partner?.trade_license_no}
            />
            <TextTitle title="Bank Name:" data={data?.partner?.bank_name} />
            <TextTitle title="Branch Name:" data={data?.partner?.branch_name} />
            <TextTitle
              title="Routing Number:"
              data={data?.partner?.routing_number}
            />
            <TextTitle title="Total Candidate:" data={count?.count} />
            <TextTitle title="Medical Complete:" data={count?.med_count} />
            <TextTitle
              title="All document uploaded:"
              data={count?.complete_count}
            />
          </div>
          <div className="mt-2">
            <h2 className="font-bold mb-2">Address</h2>
            <p>{address + "" || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partner_Profile;
