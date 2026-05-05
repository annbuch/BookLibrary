/**
 * Поиск книг по названию или автору (регистронезависимый)
 * @param {Array} books - массив книг
 * @param {string} query - поисковый запрос
 * @returns {Array} отфильтрованный массив книг
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
 * Фильтрация книг по жанру
 * @param {Array} books - массив книг
 * @param {string} genre - жанр (если "Все жанры" – возвращаем все книги)
 * @returns {Array} отфильтрованный массив книг
 */
export const filterByGenre = (books, genre) => {
  if (!genre || genre === 'Все жанры') return books;
  return books.filter(book => book.genre === genre);
};