import { books, authors, genres } from "./data/booksData";
import BookCard from "./components/BookCard";
import AuthorCard from "./components/AuthorCard";
import SearchBar from "./components/SearchBar";
import GenreFilter from "./components/GenreFilter";
import BookStatus from "./components/BookStatus";

function App() {
  // Заглушки для обработчиков событий (без useState/useEffect)
  const handleSearch = (term) => {
    alert(`🔍 Заглушка: поиск "${term}"\n(Фильтрация будет реализована с useState в следующем семестре)`);
  };

  const handleGenreSelect = (genre) => {
    alert(`🏷️ Заглушка: фильтр по жанру "${genre}"\n(Фильтрация будет реализована с useState в следующем семестре)`);
  };

  const handleBorrow = (bookId) => {
    const book = books.find(b => b.id === bookId);
    alert(`📖 Заглушка: книга "${book?.title}" взята\n(Состояние будет управляться через useState в следующем семестре)`);
  };

  const handleDetails = (bookId) => {
    const book = books.find(b => b.id === bookId);
    alert(`📚 Заглушка: подробнее о книге "${book?.title}"\nАвтор: ${book?.author}\nЖанр: ${book?.genre}\nРейтинг: ${book?.rating}\n${book?.description}`);
  };

  const handleViewAuthorBooks = (authorId) => {
    const author = authors.find(a => a.id === authorId);
    const authorBooks = books.filter(b => b.author === author.name);
    const bookTitles = authorBooks.map(b => `"${b.title}"`).join(", ");
    alert(`📖 Заглушка: книги автора ${author?.name}:\n${bookTitles}`);
  };

  const headerStyle = {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "25px 30px",
    textAlign: "center",
    marginBottom: "30px"
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px"
  };

  const subtitleStyle = {
    fontSize: "14px",
    opacity: 0.8
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

  const demoStatusStyle = {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "12px",
    marginTop: "30px",
    border: "1px solid #eee"
  };

  const demoTitleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "15px",
    color: "#2c3e50"
  };

  const demoRowStyle = {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    alignItems: "center"
  };

  return (
    <div>
      <header style={headerStyle}>
        <h1 style={titleStyle}>📖 BookLibrary</h1>
        <p style={subtitleStyle}>Ваша персональная библиотека книг</p>
      </header>

      <main style={mainStyle}>
        {/* Компонент поиска */}
        <div style={sectionStyle}>
          <SearchBar 
            searchTerm="" 
            onSearch={handleSearch}
            placeholder="Поиск по названию книги или автору..."
          />
        </div>

        {/* Компонент фильтрации по жанрам */}
        <div style={sectionStyle}>
          <GenreFilter 
            genres={genres}
            selectedGenre="Все жанры"
            onSelectGenre={handleGenreSelect}
          />
        </div>

        {/* Секция книг с BookCard */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>📚 Все книги ({books.length})</h2>
          <div style={gridStyle}>
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onBorrow={handleBorrow}
                onDetails={handleDetails}
              />
            ))}
          </div>
        </div>
      {/* Секция авторов с AuthorCard */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>👨‍💼 Авторы ({authors.length})</h2>
          <div style={gridStyle}>
            {authors.map((author) => (
              <AuthorCard
                key={author.id}
                author={author}
                onViewBooks={handleViewAuthorBooks}
              />
            ))}
          </div>
        </div>

        {/* Демонстрация компонента BookStatus */}
        <div style={demoStatusStyle}>
          <h3 style={demoTitleStyle}>📌 Компонент BookStatus (статус книги)</h3>
          <div style={demoRowStyle}>
            <BookStatus available={true} />
            <BookStatus available={false} reservedCount={3} />
            <BookStatus available={false} reservedCount={5} />
          </div>
          <p style={{ fontSize: "12px", color: "#888", marginTop: "10px" }}>
            Используется внутри BookCard для отображения доступности книги
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;