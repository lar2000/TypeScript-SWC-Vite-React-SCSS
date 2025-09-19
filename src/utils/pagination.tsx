import React from "react";

interface PaginationProps {
  total: number; // จำนวนทั้งหมด
  length: number; // จำนวน item ต่อหน้า
  currentPage: number; // หน้าปัจจุบัน
  setCurrentPage: (page: number) => void; // ฟังก์ชันเปลี่ยนหน้า
}

const Pagination: React.FC<PaginationProps> = ({
  total,
  length,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(total / length);

  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const start = (currentPage - 1) * length + 1;
  const end = Math.min(currentPage * length, total);

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className=" mt-2 d-flex justify-content-between">
      {/* <div className="d-flex justify-content-between"> */}
        <div className="d-flex text-center fw-medium mb-2"
          aria-live="polite" role="status"
        >
          ສະແດງ {start} - {end} ຈາກ {total} ລາຍການ:
        </div>
        <div className="d-md-flex justify-content-between align-items-center dt-layout-end col-md-auto ms-2">
          <ul className="pagination pagination-sm mb-0 ms-auto justify-content-center">
            {/* First */}
            <li className={`dt-paging-button page-item mb-2 ${ currentPage === 1 ? "disabled" : ""}`}
            >
              <button className="page-link" onClick={() => goToPage(1)}
                disabled={currentPage === 1} aria-label="First">
                «
              </button>
            </li>

            {/* Prev */}
            <li className={`dt-paging-button page-item mb-2 ${ currentPage === 1 ? "disabled" : ""}`}
            >
              <button className="page-link" disabled={currentPage === 1} aria-label="Previous"
                onClick={() => goToPage(currentPage - 1)}>
                ‹
              </button>
            </li>

            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <li key={index} className={`dt-paging-button page-item mb-2 ${
                  currentPage === page ? "active" : "" } ${page === "..." ? "disabled" : ""}`}
              >
                {page === "..." ? ( <span className="page-link">...</span>
                ) : (
                  <button className="page-link" onClick={() => goToPage(page as number)}>
                    {page}
                  </button>
                )}
              </li>
            ))}

            {/* Next */}
            <li className={`dt-paging-button page-item mb-2 ${ currentPage === totalPages ? "disabled" : ""}`}
            >
              <button className="page-link" disabled={currentPage === totalPages} aria-label="Next"
                onClick={() => goToPage(currentPage + 1)}>
                ›
              </button>
            </li>

            {/* Last */}
            <li className={`dt-paging-button page-item mb-2 ${ currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => goToPage(totalPages)}
                disabled={currentPage === totalPages} aria-label="Last">
                »
              </button>
            </li>
          </ul>
        </div>
      </div>
    // </div>
  );
};

export default Pagination;
