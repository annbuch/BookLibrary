import { useState } from 'react';
import BookCard from './BookCard';

function Bookshelf({ availableBooks, onBorrow }) {
  const [myBooks, setMyBooks] = useState([]);

  const addToBookshelf = (book) => {
    if (!myBooks.some(b => b.id === book.id)) {
      setMyBooks([...myBooks, book]);
      if (onBorrow) onBorrow(book.id);
    }
  };

  const removeFromBookshelf = (bookId) => {
    setMyBooks(myBooks.filter(book => book.id !== bookId));
  };

  return (
    <div data-testid="bookshelf">
      <h2>Моя книжная полка</h2>
      <div className="available-books">
        <h3>Доступные книги</h3>
        <div className="books-grid">
          {availableBooks.map(book => (
            <div key={book.id}>
              <BookCard book={book} onBorrow={() => addToBookshelf(book)} onDetails={() => {}} />
            </div>
          ))}
        </div>
      </div>
      <div className="my-books">
        <h3>Мои книги ({myBooks.length})</h3>
        {myBooks.length === 0 ? (
          <p>Полка пуста. Возьмите книгу!</p>
        ) : (
          <div className="books-grid">
            {myBooks.map(book => (
              <div key={book.id}>
                <BookCard book={book} onBorrow={() => removeFromBookshelf(book.id)} onDetails={() => {}} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Bookshelf;