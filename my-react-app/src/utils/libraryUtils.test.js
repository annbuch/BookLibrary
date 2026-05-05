import { searchBooks, filterByGenre } from './libraryUtils';

const mockBooks = [
  { id: 1, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', genre: 'Классика' },
  { id: 2, title: '1984', author: 'Джордж Оруэлл', genre: 'Антиутопия' },
  { id: 3, title: 'Гарри Поттер', author: 'Джоан Роулинг', genre: 'Фэнтези' },
  { id: 4, title: 'Преступление и наказание', author: 'Фёдор Достоевский', genre: 'Классика' }
];

describe('searchBooks', () => {
  test('возвращает все книги при пустом запросе', () => {
    expect(searchBooks(mockBooks, '')).toEqual(mockBooks);
    expect(searchBooks(mockBooks, '   ')).toEqual(mockBooks);
  });

  test('ищет по названию (регистронезависимо)', () => {
    const result = searchBooks(mockBooks, 'мастер');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Мастер и Маргарита');
  });

  test('ищет по автору (регистронезависимо)', () => {
    const result = searchBooks(mockBooks, 'оруэлл');
    expect(result).toHaveLength(1);
    expect(result[0].author).toBe('Джордж Оруэлл');
  });

  test('возвращает пустой массив, если ничего не найдено', () => {
    expect(searchBooks(mockBooks, 'xyz')).toEqual([]);
  });
});

describe('filterByGenre', () => {
  test('возвращает все книги, если жанр "Все жанры" или не указан', () => {
    expect(filterByGenre(mockBooks, 'Все жанры')).toEqual(mockBooks);
    expect(filterByGenre(mockBooks, null)).toEqual(mockBooks);
  });

  test('фильтрует по указанному жанру', () => {
    const classics = filterByGenre(mockBooks, 'Классика');
    expect(classics).toHaveLength(2);
    expect(classics.every(book => book.genre === 'Классика')).toBe(true);
  });

  test('возвращает пустой массив для несуществующего жанра', () => {
    expect(filterByGenre(mockBooks, 'Детектив')).toEqual([]);
  });
});