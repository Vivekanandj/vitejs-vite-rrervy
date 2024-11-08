import React from 'react';
import PropTypes from 'prop-types';

// Component to display a list of favorite books
function FavoriteBooks({ favoriteBooks, onToggleFavorite }) {
  // If there are no favorite books, display a message
  if (!favoriteBooks || favoriteBooks.length === 0) {
    return <div>No favorite books added yet.</div>;
  }

  return (
    <div className="favorite-books-section mt-10">
      {/* Header for Favorite Books section */}
      <h2 className="text-3xl font-bold text-center mb-6 text-white-700">
        Favorite Books
      </h2>

      {/* Displaying favorite books in a grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {favoriteBooks.map((book) => (
          <div
            key={book.key || book.title}
            className="bg-white rounded-lg shadow-lg p-4"
          >
            {/* Display book cover image */}
            <img
              src={book.cover || 'https://via.placeholder.com/150'}
              alt={book.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            {/* Display book title */}
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>

            {/* Display book author, or 'Unknown Author' if none */}
            <p className="text-gray-600 mb-4">
              {book.author || 'Unknown Author'}
            </p>

            {/* Button to remove book from favorites */}
            <button
              onClick={() => onToggleFavorite(book)}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Define property types for this component
FavoriteBooks.propTypes = {
  favoriteBooks: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string.isRequired,
      cover: PropTypes.string,
      author: PropTypes.string,
    })
  ).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default FavoriteBooks;
