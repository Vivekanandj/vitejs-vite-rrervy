import React from 'react';

// Pagination component handles displaying pagination controls
const Pagination = ({ currentPage, totalBooks, onPageChange }) => {
  // Calculate the total number of pages based on the total number of books and books per page
  const totalPages = Math.ceil(totalBooks / 20); // Assuming 20 books per page
  const pageNumbersToShow = 10; // Number of page buttons to display at once

  // Function to handle page change when the user clicks on a page number or next/previous buttons
  const handlePageChange = (page) => {
    // Ensure the page is within the valid range
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); // Trigger the onPageChange callback with the new page number
    }
  };

  // Function to generate the list of page numbers to display
  const getPageNumbers = () => {
    // Calculate the range of page numbers to display
    const start = Math.max(1, currentPage - Math.floor(pageNumbersToShow / 2)); // Start at a reasonable page number
    const end = Math.min(totalPages, start + pageNumbersToShow - 1); // Ensure the range does not exceed total pages

    // Create an array of page numbers to display
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {/* Previous button */}
      {currentPage > 1 && (
        <button
          onClick={() => handlePageChange(currentPage - 1)} // Decrease page number by 1
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Previous
        </button>
      )}

      {/* Page numbers */}
      <div className="flex space-x-1">
        {/* Map through the list of page numbers and display them */}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber} // Unique key for each button (page number)
            onClick={() => handlePageChange(pageNumber)} // Change page when clicked
            className={`px-3 py-1 rounded-lg ${
              pageNumber === currentPage // Highlight the current page
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      {/* Next button */}
      {currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(currentPage + 1)} // Increase page number by 1
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
