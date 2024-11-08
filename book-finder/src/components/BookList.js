import React from 'react';
import PropTypes from 'prop-types';

function BookList({
  books = [], // Default to empty array if no books are provided
  onSelect,
  onToggleFavorite,
  favoriteBooks = [], // Default to empty array if no favoriteBooks are provided
}) {
  // Handle selecting a book: check if onSelect is a valid function
  const handleSelect = (book) => {
    if (typeof onSelect === 'function') {
      onSelect(book);
    } else {
      console.warn('onSelect is not a valid function');
    }
  };

  // Handle toggling favorite status of a book: check if onToggleFavorite is a valid function
  const handleToggleFavorite = (book) => {
    if (typeof onToggleFavorite === 'function') {
      onToggleFavorite(book);
    } else {
      console.warn('onToggleFavorite is not a valid function');
    }
  };

  // If no books are found, display a message to the user
  if (!books || books.length === 0) {
    return (
      <div className="text-center text-gray-200 mt-10">
        No books found. Try a different search.
      </div>
    );
  }

  return (
    <div className="book-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 px-4">
      {books.map((book) => {
        // Check if the current book is in the favorites list
        const isFavorite = favoriteBooks.some(
          (fav) => fav.key === book.key || fav.title === book.title
        );

        // Determine the correct cover image for the book, fallback if not available
        const coverImage = book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : book.cover
          ? book.cover
          : '/default-cover.jpg';

        return (
          <div
            key={book.key || book.title} // Unique key for each book item
            className="book-item bg-white border rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              {/* Display book cover image */}
              <img
                src={coverImage}
                alt={book.title || 'Book Cover'}
                className="w-full h-56 object-cover"
              />

              {/* If the book is a favorite, show a "Favorite" tag on the top-right corner */}
              {isFavorite && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-xs">
                  Favorite
                </span>
              )}
            </div>

            <div className="p-4">
              {/* Book title */}
              <h3 className="text-lg font-semibold mb-2 truncate">
                {book.title || 'Untitled'}
              </h3>

              {/* Book author(s) */}
              <p className="text-sm text-gray-600 mb-4">
                {book.author_name
                  ? book.author_name.slice(0, 2).join(', ') // Show first two authors
                  : 'Unknown Author'}
              </p>

              <div className="flex justify-between space-x-2">
                {/* Button to view more details about the book */}
                <button
                  onClick={() => handleSelect(book)}
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  View Details
                </button>

                {/* Button to toggle favorite status (either add or remove) */}
                <button
                  onClick={() => handleToggleFavorite(book)}
                  className={`flex-1 py-2 rounded-lg transition ${
                    isFavorite
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isFavorite ? 'Remove' : 'Favorite'}{' '}
                  {/* Change text based on favorite status */}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// PropTypes for type checking and documentation
BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      cover_i: PropTypes.number,
      author_name: PropTypes.arrayOf(PropTypes.string),
      cover: PropTypes.string,
    })
  ),
  onSelect: PropTypes.func,
  onToggleFavorite: PropTypes.func,
  favoriteBooks: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

export default BookList;
