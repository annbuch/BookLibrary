import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from './BookCard';

const mockBook = {
  id: 1,
  title: 'Тестовая книга',
  author: 'Тест Автор',
  genre: 'Фэнтези',
  rating: 4.5,
  available: true,
  description: 'Описание тестовой книги'
};

describe('BookCard', () => {
  test('отображает информацию о книге', () => {
    render(<BookCard book={mockBook} onBorrow={() => {}} onDetails={() => {}} />);
    expect(screen.getByText('Тестовая книга')).toBeInTheDocument();
    expect(screen.getByText('Тест Автор')).toBeInTheDocument();
    expect(screen.getByText('Фэнтези')).toBeInTheDocument();
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
  });

  test('кнопка "Взять книгу" активна, если книга доступна', () => {
    render(<BookCard book={mockBook} onBorrow={() => {}} onDetails={() => {}} />);
    const borrowButton = screen.getByText('📖 Взять книгу');
    expect(borrowButton).not.toBeDisabled();
  });

  test('кнопка "Взять книгу" неактивна, если книга недоступна', () => {
    const unavailableBook = { ...mockBook, available: false };
    render(<BookCard book={unavailableBook} onBorrow={() => {}} onDetails={() => {}} />);
    const borrowButton = screen.getByText('❌ Недоступна');
    expect(borrowButton).toBeDisabled();
  });

  test('вызов onBorrow при клике на кнопку', () => {
    const mockOnBorrow = jest.fn();
    render(<BookCard book={mockBook} onBorrow={mockOnBorrow} onDetails={() => {}} />);
    fireEvent.click(screen.getByText('📖 Взять книгу'));
    expect(mockOnBorrow).toHaveBeenCalledWith(1);
  });

  test('вызов onDetails при клике на "Подробнее"', () => {
    const mockOnDetails = jest.fn();
    render(<BookCard book={mockBook} onBorrow={() => {}} onDetails={mockOnDetails} />);
    fireEvent.click(screen.getByText('Подробнее'));
    expect(mockOnDetails).toHaveBeenCalledWith(mockBook);
  });
});