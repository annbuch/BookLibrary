import { useState } from "react";
import { books as initialBooks, authors, genres } from "./data/booksData";
import BookCard from "./components/ui/BookCard";
import AuthorCard from "./components/ui/AuthorCard";
import SearchBar from "./components/ui/SearchBar";
import GenreFilter from "./components/ui/GenreFilter";

function App() {
  const [books, setBooks] = useState(initialBooks);

  console.group('BookLibrary App');
  console.log('Всего книг в библиотеке:', books.length);
  console.table(books.map(b => ({ title: b.title, available: b.available })));
  console.groupEnd();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("Все жанры");
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  const handleBorrow = (bookId) => {
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === bookId && book.available
          ? { ...book, available: false }
          : book
      )
    );

    const book = books.find(b => b.id === bookId);
    alert(`Книга "${book?.title}" взята! (теперь недоступна)`);
  };


  const handleDetails = (book) => {
    alert(
      `Подробнее о книге:\n\n` +
      `Название: ${book.title}\n` +
      `Автор: ${book.author}\n` +
      `Жанр: ${book.genre}\n` +
      `Рейтинг: ${book.rating}\n` +
      `Доступность: ${book.available ? "В наличии" : "Выдана"}\n\n` +
      `Описание: ${book.description}`
    );
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (selectedAuthorId) setSelectedAuthorId(null);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    if (selectedAuthorId) setSelectedAuthorId(null);
  };

  const handleViewAuthorBooks = (authorId) => {
    if (selectedAuthorId === authorId) {
      setSelectedAuthorId(null);
    } else {
      setSelectedAuthorId(authorId);
        setSelectedGenre("Все жанры");
      setSearchTerm("");
    }
  };

  // Фильтрация книг
  let filteredBooks = [...books];

  if (selectedAuthorId !== null) {
    const author = authors.find(a => a.id === selectedAuthorId);
    if (author) {
      filteredBooks = filteredBooks.filter(book => book.author === author.name);
    }
  } else {
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      filteredBooks = filteredBooks.filter(
        book =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term)
      );
    }
    if (selectedGenre !== "Все жанры") {
      filteredBooks = filteredBooks.filter(book => book.genre === selectedGenre);
    }
  }

  const selectedAuthor = selectedAuthorId
    ? authors.find(a => a.id === selectedAuthorId)
    : null;

  const headerStyle = {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "25px 30px",
    textAlign: "center",
    marginBottom: "30px"
  };

  const mainStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 20px 40px"
  };

  const sectionStyle = {
    marginBottom: "40px"
  };

  const sectionTitleStyle = {
    fontSize: "22px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "20px",
    paddingBottom: "10px",
    borderBottom: "3px solid #4a90e2"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "25px"
  };

  const filterInfoStyle = {
    backgroundColor: "#f8f9fa",
    padding: "10px 15px",
    borderRadius: "8px",
    marginBottom: "20px",
    fontSize: "14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const resetButtonStyle = {
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "12px"
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedGenre("Все жанры");
    setSelectedAuthorId(null);
  };

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>BookLibrary</h1>
        <p style={{ fontSize: "14px", opacity: 0.8 }}>Ваша персональная библиотека</p>
      </header>

      <main style={mainStyle}>
        {}
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

        {}
        <GenreFilter
          genres={genres}
          selectedGenre={selectedGenre}
          onSelectGenre={handleGenreSelect}
        />

        {}
        <div style={filterInfoStyle}>
          <span>
            {selectedAuthorId ? (
              <>Показаны книги автора: <strong>{selectedAuthor?.name}</strong></>
            ) : searchTerm ? (
              <>Результаты поиска: <strong>"{searchTerm}"</strong></>
            ) : selectedGenre !== "Все жанры" ? (
              <>Жанр: <strong>{selectedGenre}</strong></>
            ) : (
              <>Показаны все книги ({filteredBooks.length})</>
            )}
          </span>
          {(selectedAuthorId || searchTerm || selectedGenre !== "Все жанры") && (
            <button style={resetButtonStyle} onClick={handleResetFilters}>
              Сбросить фильтры
            </button>
          )}
        </div>

        {}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}> Книги ({filteredBooks.length})</h2>
          {filteredBooks.length === 0 ? (
            <p style={{ textAlign: "center", color: "#888", padding: "40px" }}>
              Книги не найдены. Попробуйте изменить фильтры.
            </p>
          ) : (
            <div style={gridStyle}>
              {filteredBooks.map(book => (
                <BookCard
                  key={book.id}
                  book={book}
                  onBorrow={handleBorrow}
                  onDetails={handleDetails}
                />
              ))}
            </div>
          )}
        </div>

        {}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>Авторы ({authors.length})</h2>
          <div style={gridStyle}>
            {authors.map(author => (
              <AuthorCard
                key={author.id}
                author={author}
                onViewBooks={handleViewAuthorBooks}
                isSelected={selectedAuthorId === author.id}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;