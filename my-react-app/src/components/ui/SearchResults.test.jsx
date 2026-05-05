import { render, screen } from '@testing-library/react';
import SearchResults from './SearchResults';

const mockBooks = [
  { id: 1, title: 'Книга 1', author: 'Автор 1', genre: 'Классика', rating: 4, available: true, description: '' },
  { id: 2, title: 'Книга 2', author: 'Автор 2', genre: 'Фэнтези', rating: 5, available: true, description: '' }
];

describe('SearchResults', () => {
  test('отображает сообщение, если книги не найдены', () => {
    render(<SearchResults books={[]} onBorrow={() => {}} onDetails={() => {}} searchQuery="test" />);
    expect(screen.getByText(/Ничего не найдено/)).toBeInTheDocument();
  });

  test('отображает список книг, если они есть', () => {
    render(<SearchResults books={mockBooks} onBorrow={() => {}} onDetails={() => {}} searchQuery="" />);
    expect(screen.getByText('Книга 1')).toBeInTheDocument();
    expect(screen.getByText('Книга 2')).toBeInTheDocument();
  });

  test('отображает поисковый запрос в заголовке', () => {
    render(<SearchResults books={mockBooks} onBorrow={() => {}} onDetails={() => {}} searchQuery="фэнтези" />);
    expect(screen.getByText(/Результаты поиска: "фэнтези"/)).toBeInTheDocument();
  });
});