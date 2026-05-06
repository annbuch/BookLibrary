/**
 * @param {Array} books 
 * @param {string} query 
 * @returns {Array} 
 */
export const searchBooks = (books, query) => {
  if (!query || query.trim() === '') return books;
  const lowerQuery = query.toLowerCase();
  return books.filter(book =>
    book.title.toLowerCase().includes(lowerQuery) ||
    book.author.toLowerCase().includes(lowerQuery)
  );
};

/**
 * @param {Array} books 
 * @param {string} genre 
 * @returns {Array} 
 */
export const filterByGenre = (books, genre) => {
  if (!genre || genre === 'Все жанры') return books;
  return books.filter(book => book.genre === genre);
};