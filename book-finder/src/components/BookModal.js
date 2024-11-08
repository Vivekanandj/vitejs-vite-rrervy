import React from 'react';

function BookModal({ book, onClose }) {
  // Construct the cover image URL, using a placeholder if no cover exists
  const coverImage = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : 'https://via.placeholder.com/150';

  return (
    <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      {/* Modal container with white background and padding */}
      <div className="bg-white p-6 rounded-lg w-2/3 max-w-3xl">
        {/* Close button positioned at the top right of the modal */}
        <button
          className="text-red-500 font-semibold text-lg absolute top-4 right-4"
          onClick={onClose} // Triggers the onClose function when clicked
        >
          X
        </button>

        {/* Book cover image, using a default placeholder if no cover is available */}
        <img
          src={coverImage}
          alt={book.title} // Alt text for accessibility
          className="w-48 h-72 object-cover rounded-lg mx-auto" // Centered styling and rounded corners
        />

        {/* Book title */}
        <h2 className="text-3xl font-bold text-center mt-4">{book.title}</h2>

        {/* Book author(s), joined with commas if multiple authors */}
        <p className="text-lg text-center mt-2">
          {book.author_name?.join(', ')}{' '}
          {/* Conditional chaining for author name */}
        </p>

        {/* Year the book was first published */}
        <p className="text-center mt-4 text-gray-500">
          {book.first_publish_year}
        </p>
      </div>
    </div>
  );
}

export default BookModal;
