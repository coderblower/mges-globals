import down_icon from "../../public/images/down_white_arrow.svg";

const Pagination = ({ paginations, currentPage, setCurrentPage }) => {
  const numberOfButtons = Math.ceil(paginations?.total / paginations?.per_page);
  const pageButtonsToShow = 5; // Number of buttons to show at a time
  const halfPageButtons = Math.floor(pageButtonsToShow / 2);

  const startPage = Math.max(currentPage - halfPageButtons, 1);
  const endPage = Math.min(startPage + pageButtonsToShow - 1, numberOfButtons);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // console.log("======>16", endPage);

  const handelBackBtn = (type) => {
    if (type == "back") {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
    if (type == "next") {
      if (currentPage < numberOfButtons) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center my-10">
        <div className="flex justify-center items-center rounded-md overflow-hidden">
          {numberOfButtons > 2 ? (
            <button
              onClick={() => handelBackBtn("back")}
              className="cursor-pointer px-3 py-[14px] border-2 text-black hover:bg-gray-100/50 transition duration-300 ease-in-out"
            >
              <img className="rotate-90" src={down_icon} alt="" />
            </button>
          ) : null}

          {pageNumbers.map((page) => (
            <div key={page}>
              <button
                onClick={() => setCurrentPage(page)}
                className={`cursor-pointer px-4 py-3 border-2  ${
                  currentPage === page
                    ? " bg-gray-300 flex justify-center items-center text-black font-[500] "
                    : "text-black hover:bg-gray-100/50 transition duration-300 ease-in-out"
                } `}
              >
                {page}
              </button>
            </div>
          ))}
          {currentPage + 2 < numberOfButtons && (
            <>
              <button
                onClick={() => setCurrentPage(numberOfButtons)}
                className="cursor-pointer px-4 py-3 border-2 text-black hover:bg-gray-100/50 transition duration-300 ease-in-out"
              >
                ... {numberOfButtons}
              </button>
            </>
          )}

          {numberOfButtons > 2 ? (
            <button
              onClick={() => handelBackBtn("next")}
              className="cursor-pointer px-3 py-[14px] border-2 text-black hover:bg-gray-100/50 transition duration-300 ease-in-out"
            >
              <img className="-rotate-90" src={down_icon} alt="" />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Pagination;
