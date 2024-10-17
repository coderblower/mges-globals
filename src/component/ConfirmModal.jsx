import React, { useState } from "react";
import { patch } from "../api/axious";
import toast, { Toaster } from "react-hot-toast";
import Loading from "./Loading";

const ConfirmModal = ({
  confirmModals,
  setConfirmModals,
  contract_id,
  condition,
  notify,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (condition) {
      const formData = {
        status: condition,
      };
      console.log(formData);
      setLoading(true);
      try {
        const res = await patch(
          `/api/customer/contracts/${contract_id}`,
          formData
        );
        console.log(res);
        if (res?.message) {
          setLoading(false);
          setConfirmModals(false);
          notify();
        }
      } catch (error) {
        setLoading(false);
        toast.error(error?.response?.data?.message);
        console.log(
          "Failed to create contract/",
          error?.response?.data?.message
        );
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        confirmModals ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="bg-gray_bg text-white w-10/12 md:w-1/4 max-w-[1200px] p-6 rounded-2xl shadow-lg z-20 relative"
        // ref={modalRef}
      >
        <span
          onClick={() => setConfirmModals(false)}
          className="absolute top-4 right-5 text-2xl cursor-pointer z-50 hover:bg-slate-200/50 px-1 py-[5px] rounded-md leading-3"
        >
          &times;
        </span>
        {/* body start from here */}

        <div className="w-full p-5">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-center text-3xl  font-[400] mb-2">
              Are you Sure ?
            </h1>
            <p className="mb-5 text-sm font-[300]">
              You wont be able to revert this!
            </p>
            <div className="flex gap-5">
              <button
                onClick={() => handleClick()}
                type="button"
                disabled={loading}
                className={`bg-white text-black px-8 py-2 rounded-md text-sm font-medium transition-transform active:scale-95 ${
                  loading ? "opacity-80" : ""
                }`}
              >
                {loading ? <Loading /> : "Yes"}
              </button>

              <button
                onClick={() => setConfirmModals(false)}
                type="button"
                className="text-white bg-transparent  border border-white  px-8 py-2 rounded-md text-sm font-medium transition-transform active:scale-95"
              >
                No
              </button>
            </div>
          </div>
        </div>

        {/* body ends here */}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ConfirmModal;
