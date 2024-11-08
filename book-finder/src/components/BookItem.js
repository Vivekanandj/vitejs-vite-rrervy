import React from 'react';
import PropTypes from 'prop-types';

// BookItem component displays individual book details and handles favorite toggle
function BookItem({ book, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {/* Display book cover with a fallback image if not available */}
      <img
        src={book.cover || 'https://via.placeholder.com/150'}
        alt={book.title} // Accessibility: alt text for image
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      {/* Display book title */}
      <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
      {/* Display book author with fallback text if not available */}
      <p className="text-gray-600 mb-4">{book.author || 'Unknown Author'}</p>
      {/* Button to toggle favorite status */}
      <button
        onClick={() => onToggleFavorite(book)} // Trigger onToggleFavorite with the book object
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
      >
        Remove from Favorites
      </button>
    </div>
  );
}

// FavoriteBooks component displays a list of favorite books
function FavoriteBooks({ favoriteBooks, onToggleFavorite }) {
  // If there are no favorite books, display a message
  if (!favoriteBooks || favoriteBooks.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No favorite books added yet.
      </div>
    );
  }

  return (
    <div className="favorite-books-section mt-10">
      {/* Header for the favorite books section */}
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Favorite Books
      </h2>
      {/* Grid layout to display books in responsive columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {/* Iterate over the favoriteBooks array and render a BookItem for each */}
        {favoriteBooks.map((book) => (
          <BookItem
            key={book.key || book.title} // Use key to help React track elements
            book={book} // Pass book object as prop
            onToggleFavorite={onToggleFavorite} // Pass the toggle function
          />
        ))}
      </div>
    </div>
  );
}

// PropTypes validation to ensure correct data types are passed
FavoriteBooks.propTypes = {
  favoriteBooks: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string.isRequired,
      cover: PropTypes.string,
      author: PropTypes.string,
    })
  ).isRequired, // favoriteBooks is required and should be an array of book objects
  onToggleFavorite: PropTypes.func.isRequired, // onToggleFavorite is required and should be a function
};

export default FavoriteBooks;
