import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Bookshelf from './Bookshelf';

const mockAvailableBooks = [
  { id: 1, title: 'Книга A', author: 'Автор A', genre: 'Классика', rating: 4, available: true, description: '' },
  { id: 2, title: 'Книга B', author: 'Автор B', genre: 'Фэнтези', rating: 5, available: true, description: '' }
];

describe('Bookshelf', () => {
  test('отображает доступные книги', () => {
    render(<Bookshelf availableBooks={mockAvailableBooks} onBorrow={() => {}} />);
    expect(screen.getByText('Книга A')).toBeInTheDocument();
    expect(screen.getByText('Книга B')).toBeInTheDocument();
  });

  test('добавляет книгу на полку при клике на "Взять книгу"', async () => {
    render(<Bookshelf availableBooks={mockAvailableBooks} onBorrow={() => {}} />);
    const borrowButtons = screen.getAllByText('Взять книгу');
    // берём первую книгу (Книга A)
    await userEvent.click(borrowButtons[0]);
    expect(screen.getByText('Мои книги (1)')).toBeInTheDocument();

    const myBooksSection = screen.getByTestId('bookshelf').querySelector('.my-books');
    expect(myBooksSection).toHaveTextContent('Книга A');
  });

  test('удаляет книгу с полки', async () => {
    render(<Bookshelf availableBooks={mockAvailableBooks} onBorrow={() => {}} />);
   
    const borrowButtons = screen.getAllByText('Взять книгу');
    await userEvent.click(borrowButtons[0]);
    expect(screen.getByText('Мои книги (1)')).toBeInTheDocument();

   
    const myBooksSection = screen.getByTestId('bookshelf').querySelector('.my-books');
    const removeButtons = myBooksSection.querySelectorAll('button');
    await userEvent.click(removeButtons[0]); // кнопка "Взять книгу" внутри моей полки

    expect(screen.getByText('Мои книги (0)')).toBeInTheDocument();
  });
});