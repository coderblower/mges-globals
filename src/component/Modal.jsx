import React, { useEffect, useRef } from "react";

const Modal = ({ modals, setModals, children }) => {
  let modalRef = useRef();

  useEffect(() => {
    let handlerClose = (e) => {
      if (!modalRef?.current?.contains(e.target)) {
        setModals(false);
      }
    };
    document.addEventListener("mousedown", handlerClose);
    return () => {
      document.removeEventListener("mousedown", handlerClose);
    };
  });

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        modals ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="bg-white text-white w-10/12 md:w-1/2 max-w-[1200px] p-6 rounded-2xl shadow-lg z-20 relative"
        ref={modalRef}
      >
        <span
          onClick={() => setModals(false)}
          className="absolute top-4 right-5 text-2xl cursor-pointer z-50 hover:bg-slate-400/50 px-1 py-[5px] rounded-md leading-3 text-black bg-slate-200"
        >
          &times;
        </span>
        {/* body start from here */}

        <div className="w-full text-black">
          <div className="mt-5">{children}</div>
        </div>

        {/* body ends here */}
      </div>
    </div>
  );
};

export default Modal;
