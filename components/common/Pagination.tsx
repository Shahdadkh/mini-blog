import React from "react";
import ReactPaginate from "react-paginate";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Pagination = ({
  totalPageSize,
  pageSize,
  setCurrentPage,
  currentPage,
}: any) => {
  const GetPageSize = () => {
    const pageCount = Math.ceil(totalPageSize / pageSize);
    return pageCount;
  };

  const HandleChange = (page: any) => {
    const PageNumber = page.selected;
    setCurrentPage(PageNumber);
  };

  return (
    <ReactPaginate
      renderOnZeroPageCount={null}
      previousLabel={<HiChevronRight />}
      nextLabel={<HiChevronLeft />}
      breakLabel={"..."}
      forcePage={currentPage}
      pageCount={GetPageSize()}
      pageRangeDisplayed={4} //Display Right
      marginPagesDisplayed={2} //Display Left
      onPageChange={(page: any) => HandleChange(page)}
      //container
      containerClassName="flex justify-center text-xs font-medium space-x-2"
      //page
      pageClassName="block w-8 h-8 text-center border border-gray-100 fontcolor1 rounded leading-8 shadow-custom-shadow"
      pageLinkClassName=""
      //break ...
      breakClassName="block w-8 h-8 text-center border border-gray-100 fontcolor1 rounded leading-8 shadow-custom-shadow"
      //active
      activeClassName="block w-8 h-8 text-center bg-gray-500 rounded leading-8 shadow-custom-shadow"
      activeLinkClassName="text-white"
      //previous ->
      previousClassName="inline-flex items-center justify-center ml-2 w-8 h-8 border border-gray-100 fontcolor1 shadow-custom-shadow rounded"
      previousLinkClassName=""
      // <- next
      nextClassName="inline-flex items-center justify-center w-8 h-8 border border-gray-100 fontcolor1 rounded shadow-custom-shadow"
      nextLinkClassName=""
    />
  );
};

export default Pagination;
