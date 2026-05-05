import { render, screen, fireEvent } from '@testing-library/react';
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
    const borrowButtons = screen.getAllByText('📖 Взять книгу');
    await userEvent.click(borrowButtons[0]);
    expect(screen.getByText('Мои книги (1)')).toBeInTheDocument();
    expect(screen.getByText('Книга A')).toBeInTheDocument(); // книга появилась на полке
  });

  test('удаляет книгу с полки', async () => {
    render(<Bookshelf availableBooks={mockAvailableBooks} onBorrow={() => {}} />);
    // Добавляем книгу
    const borrowButtons = screen.getAllByText('📖 Взять книгу');
    await userEvent.click(borrowButtons[0]);
    expect(screen.getByText('Мои книги (1)')).toBeInTheDocument();
    
    // Находим кнопку удаления на полке (она тоже имеет текст "📖 Взять книгу", но в контексте полки)
    const removeButtons = screen.getAllByText('📖 Взять книгу');
    await userEvent.click(removeButtons[1]); // вторая кнопка (первая – доступная книга)
    expect(screen.getByText('Мои книги (0)')).toBeInTheDocument();
  });
});