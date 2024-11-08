import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import BookModal from './components/BookModal';
import FavoriteBooks from './components/FavoriteBooks';
import backgroundImage from './background.jpg';
import logo from './logo.png';

function App() {
  // States to manage search term, book data, loading status, pagination, and modal visibility
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Manage favorites with localStorage for persistence across sessions
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteBooks');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Array of random book data for initial display or demo purposes
  const [randomBooks] = useState([
    {
      title: 'The Great Gatsby',
      cover:
        'https://ia800404.us.archive.org/view_archive.php?archive=/33/items/l_covers_0010/l_covers_0010_78.zip&file=0010780935-L.jpg',
    },
    {
      title: '1984',
      cover:
        'https://ia800100.us.archive.org/view_archive.php?archive=/5/items/l_covers_0012/l_covers_0012_05.zip&file=0012054715-L.jpg',
    },
    {
      title: 'Moby Dick',
      cover:
        'https://ia600505.us.archive.org/view_archive.php?archive=/25/items/m_covers_0010/m_covers_0010_08.zip&file=0010089516-M.jpg',
    },
    {
      title: 'To Kill a Mockingbird',
      cover: 'https://covers.openlibrary.org/b/id/14820007-L.jpg',
    },
    {
      title: 'Pride and Prejudice',
      cover:
        'https://ia800505.us.archive.org/view_archive.php?archive=/35/items/l_covers_0014/l_covers_0014_61.zip&file=0014619627-L.jpg',
    },
    {
      title: 'The Catcher in the Rye',
      cover:
        'https://ia801601.us.archive.org/view_archive.php?archive=/25/items/m_covers_0014/m_covers_0014_31.zip&file=0014318932-M.jpg',
    },
    {
      title: 'The Hobbit',
      cover: 'https://covers.openlibrary.org/b/id/14627222-L.jpg',
    },
    {
      title: 'Frankenstein',
      cover:
        'https://ia600505.us.archive.org/view_archive.php?archive=/5/items/m_covers_0012/m_covers_0012_75.zip&file=0012752093-M.jpg',
    },
    {
      title: 'War and Peace',
      cover: 'https://covers.openlibrary.org/b/id/7914757-L.jpg',
    },
  ]);

  // Function to toggle favorite status of a book
  const toggleFavorite = (book) => {
    setFavorites((prevFavorites) => {
      const bookIdentifier = book.key || book.title;
      const isAlreadyFavorite = prevFavorites.some(
        (favBook) =>
          favBook.key === bookIdentifier || favBook.title === book.title
      );

      // Add or remove book from favorites based on current status
      if (isAlreadyFavorite) {
        return prevFavorites.filter(
          (favBook) =>
            favBook.key !== bookIdentifier && favBook.title !== book.title
        );
      } else {
        const newFavorite = {
          key: bookIdentifier,
          title: book.title,
          cover:
            book.cover || book.cover_i
              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              : 'https://via.placeholder.com/150',
          author: book.author_name?.[0] || 'Unknown Author',
        };
        return [...prevFavorites, newFavorite];
      }
    });
  };

  // Sync favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteBooks', JSON.stringify(favorites));
  }, [favorites]);

  // Fetch books based on search term, category, and current page
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const filter =
          categoryFilter !== 'all' ? `&subject=${categoryFilter}` : '';
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${searchTerm}&limit=20&page=${currentPage}${filter}`
        );
        setBooks(response.data.docs);
        setTotalBooks(response.data.numFound);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch books if there's a search term or selected category
    if (searchTerm || categoryFilter !== 'all') {
      fetchBooks();
    }
  }, [searchTerm, currentPage, categoryFilter]);

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  // Define styles for a pulse loading animation
  const pulseStyles = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#3498db',
    animation: 'pulse 1.5s infinite ease-in-out',
  };

  // CSS keyframes for pulse animation, injected into the style
  const keyframesStyle = `
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.5); opacity: 0.5; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;

  return (
    <div
      className="App bg-gray-100 min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Injecting keyframes for pulse animation */}
      <style>{keyframesStyle}</style>

      {/* Header section with logo and title */}
      <header className="bg-blue-700 text-white p-6 text-center flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-12 h-12 mr-4" />
        <h1 className="text-4xl font-semibold">Book Finder</h1>
      </header>

      {/* Search input and category filter dropdown */}
      <div className="text-center mt-4">
        <input
          type="text"
          placeholder="Search for books..."
          className="p-3 w-2/3 max-w-md rounded-lg shadow-lg focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4">
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="p-3 w-2/3 max-w-md rounded-lg shadow-lg text-black"
          >
            <option value="all">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
            <option value="Art">Art</option>
          </select>
        </div>
      </div>

      {/* Loading indicator or main content */}
      {loading ? (
        <div className="flex justify-center mt-6">
          <div style={pulseStyles}></div>
        </div>
      ) : (
        <>
          {/* Book list display and modal for selected book */}
          <BookList
            books={books}
            onSelect={(book) => {
              setSelectedBook(book);
              setModalVisible(true);
            }}
            onToggleFavorite={toggleFavorite}
            favoriteBooks={favorites}
          />

          {modalVisible && (
            <BookModal
              book={selectedBook}
              onClose={() => setModalVisible(false)}
            />
          )}

          {/* Pagination for book results */}
          <Pagination
            currentPage={currentPage}
            totalBooks={totalBooks}
            onPageChange={setCurrentPage}
          />

          {/* Display random books as suggestions */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-center">Random Books</h2>
            <div className="flex flex-wrap justify-center mt-6">
              {randomBooks.map((book, index) => (
                <div
                  key={index}
                  className="m-4 w-1/4 p-4 bg-white rounded-lg shadow-lg text-center"
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold">{book.title}</h3>
                  <button
                    onClick={() => toggleFavorite(book)}
                    className="mt-2 px-4 py-2 bg-yellow-400 rounded-lg text-white"
                  >
                    {favorites.some((fav) => fav.title === book.title)
                      ? 'Remove from Favorites'
                      : 'Add to Favorites'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite books section, shown if any favorites exist */}
          {favorites.length > 0 && (
            <FavoriteBooks
              favoriteBooks={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
