# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
Book Finder App
This is a React-based Book Finder application that allows users to search for books, view details, add favorites, and navigate through search results with pagination. The app integrates a collection of React components to handle various tasks, including displaying book lists, managing favorite books, showing detailed book information in a modal, and handling pagination.

Features
Book Search: Allows users to search for books and view the results.
Favorites Management: Users can mark books as favorites and manage them in a separate list.
Pagination: Provides navigation through pages of book search results.
Book Details Modal: Displays detailed information about a selected book in a modal.
Table of Contents
Getting Started
Components
Usage
Dependencies
Getting Started
Prerequisites
Node.js
npm or yarn
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/yourusername/book-finder-app.git
Navigate to the project directory:
bash
Copy code
cd book-finder-app
Install dependencies:
bash
Copy code
npm install
Start the application:
bash
Copy code
npm start
Components
BookList Component
Props:
books (array): Array of book objects to display.
onSelect (function): Callback to handle selecting a book.
onToggleFavorite (function): Callback to add or remove a book from favorites.
favoriteBooks (array): List of books marked as favorites.
Description: Displays a list of books with options to view details or mark as favorite. Each book card includes a cover image, title, author, and buttons for viewing or toggling favorite status.
FavoriteBooks Component
Props:
favoriteBooks (array): Array of favorite books to display.
onToggleFavorite (function): Callback to remove a book from favorites.
Description: Displays the list of books marked as favorites with an option to remove them.
BookModal Component
Props:
book (object): The selected book to show details for.
onClose (function): Callback to close the modal.
Description: Renders a modal displaying detailed information about a selected book, including title, author(s), and publication year.
BookItem Component
Props:
book (object): Book data including cover, title, and author.
onToggleFavorite (function): Callback to add or remove a book from favorites.
Description: Used within FavoriteBooks to render each favorite book with a cover, title, author, and a button to remove it from favorites.
Pagination Component
Props:
currentPage (number): Current page in the pagination.
totalBooks (number): Total number of books in the search results.
onPageChange (function): Callback to handle changing the page.
Description: Provides pagination controls with Previous and Next buttons and numbered page links to allow easy navigation.
Usage
Searching for Books: Users can search for books by entering a query. The app fetches and displays results.
Adding to Favorites: Users can mark any book as a favorite. The book will appear in the "Favorite Books" section.
Viewing Book Details: Users can click on a book to open a modal with detailed information.
Pagination: Use the pagination controls to navigate through multiple pages of search results.
Dependencies
React
PropTypes: Used for type-checking props in components.
Tailwind CSS: Utility-first CSS framework for styling components.
Folder Structure
plaintext
Copy code
.
├── src
│   ├── components
│   │   ├── BookList.js       # Renders a list of books with favorite and details options
│   │   ├── FavoriteBooks.js  # Displays favorite books
│   │   ├── BookModal.js      # Displays detailed book information in a modal
│   │   ├── BookItem.js       # Renders a single book in the favorites list
│   │   └── Pagination.js     # Pagination control component
│   ├── App.js                # Main app component that renders other components
│   └── index.js              # Entry point of the app
└── README.md
License
This project is licensed under the MIT License.

Acknowledgments
Open Library API: For providing book data and cover images.
Tutorials and resources from the React community.
Contributing
Contributions are welcome! Please create a pull request for any enhancements or bug fixes.
