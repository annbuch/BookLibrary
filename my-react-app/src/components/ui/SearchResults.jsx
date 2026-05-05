import BookCard from './BookCard';

function SearchResults({ books, onBorrow, onDetails, searchQuery }) {
  return (
    <div data-testid="search-results">
      <h2>Результаты поиска{searchQuery && `: "${searchQuery}"`}</h2>
      {books.length === 0 ? (
        <p>Ничего не найдено</p>
      ) : (
        <div className="books-grid">
          {books.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onBorrow={onBorrow}
              onDetails={onDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;