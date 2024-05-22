
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

function Pagination({ totalPosts, postPerPage, setCurrentPage, currentPage }) {
  let pages = [];
  
  // Calculate the total number of pages
  const totalPages = Math.ceil(totalPosts / postPerPage);

  // Display only 5 pages initially
  const maxPagesToShow = 5;
  let startPage = currentPage - Math.floor(maxPagesToShow / 2);
  startPage = Math.max(startPage, 1); // Ensure startPage is not less than 1
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  // Generate page numbers based on the current page and total pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const previous = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10 gap-3">
          <li onClick={previous}>
            <a
              href="#"
              className="flex items-center justify-center text-[30px] px-4 h-10 ms-0 leading-tight hover:scale-125 transition ease-in-out"
            >
              <IoIosArrowRoundBack />
            </a>
          </li>
          {pages.map((page, index) => (
            <li key={index}>
              <a
                href="#"
                className={`${
                  currentPage === page ? "bg-violet-500 text-white border rounded-full" : ""
                } flex items-center justify-center px-4 h-10 leading-tight  hover:bg-gray-100 hover:text-gray-700`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </a>
            </li>
          ))}
          {totalPages > maxPagesToShow && currentPage + maxPagesToShow - 1 < totalPages && (
            <li>
              <button
                onClick={() => setCurrentPage(currentPage + maxPagesToShow)}
                className="flex items-center justify-center px-4 h-10 leading-tight  hover:bg-gray-100 hover:text-gray-700"
              >
                ...
              </button>
            </li>
          )}
          <li onClick={next}>
            <a
              href="#"
              className="flex items-center text-[30px] justify-center px-4 h-10 leading-tight hover:scale-125 transition ease-in-out"
            >
              <IoIosArrowRoundForward />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
