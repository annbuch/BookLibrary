import { render, screen, fireEvent } from '@testing-library/react';
import BookCard from './BookCard';


const mockBookInteger = {
  id: 1,
  title: 'Тестовая книга (целый рейтинг)',
  author: 'Тест Автор',
  genre: 'Фэнтези',
  rating: 4,
  available: true,
  description: 'Описание тестовой книги'
};


const mockBookFractional = {
  id: 2,
  title: 'Дробный рейтинг',
  author: 'Дробный Автор',
  genre: 'Классика',
  rating: 4.8,
  available: true,
  description: 'Описание'
};

const mockBookUnavailable = {
  id: 3,
  title: 'Недоступная книга',
  author: 'Автор',
  genre: 'Детектив',
  rating: 3.5,
  available: false,
  description: 'Описание'
};

describe('BookCard', () => {
  test('отображает информацию о книге (целый рейтинг)', () => {
    render(<BookCard book={mockBookInteger} onBorrow={() => {}} onDetails={() => {}} />);
    expect(screen.getByText('Тестовая книга (целый рейтинг)')).toBeInTheDocument();
    expect(screen.getByText('Тест Автор')).toBeInTheDocument();
    expect(screen.getByText('Фэнтези')).toBeInTheDocument();
    
    expect(screen.getByText(/4/)).toBeInTheDocument();
    expect(screen.getByText('Взять книгу')).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });

  test('отображает дробный рейтинг со звёздами', () => {
    render(<BookCard book={mockBookFractional} onBorrow={() => {}} onDetails={() => {}} />);
    
    expect(screen.getByText(/4\.8/)).toBeInTheDocument();
    
    const starsElement = screen.getByText(/★/); 
    expect(starsElement).toBeInTheDocument();
  });

  test('кнопка "Взять книгу" активна, если книга доступна', () => {
    render(<BookCard book={mockBookInteger} onBorrow={() => {}} onDetails={() => {}} />);
    const borrowButton = screen.getByText('Взять книгу');
    expect(borrowButton).not.toBeDisabled();
  });

  test('кнопка "Взять книгу" неактивна, если книга недоступна', () => {
    render(<BookCard book={mockBookUnavailable} onBorrow={() => {}} onDetails={() => {}} />);
    const borrowButton = screen.getByText('Недоступна'); // текст на кнопке
    expect(borrowButton).toBeDisabled();
  });

  test('вызов onBorrow при клике на кнопку (для доступной книги)', () => {
    const mockOnBorrow = jest.fn();
    render(<BookCard book={mockBookInteger} onBorrow={mockOnBorrow} onDetails={() => {}} />);
    fireEvent.click(screen.getByText('Взять книгу'));
    expect(mockOnBorrow).toHaveBeenCalledWith(1);
  });

  test('onBorrow не вызывается, если книга недоступна', () => {
    const mockOnBorrow = jest.fn();
    render(<BookCard book={mockBookUnavailable} onBorrow={mockOnBorrow} onDetails={() => {}} />);
    fireEvent.click(screen.getByText('Недоступна'));
    expect(mockOnBorrow).not.toHaveBeenCalled();
  });

  test('вызов onDetails при клике на "Подробнее"', () => {
    const mockOnDetails = jest.fn();
    render(<BookCard book={mockBookInteger} onBorrow={() => {}} onDetails={mockOnDetails} />);
    fireEvent.click(screen.getByText('Подробнее'));
    expect(mockOnDetails).toHaveBeenCalledWith(mockBookInteger);
  });

  
  test('обработчики onMouseEnter и onMouseLeave вызываются', () => {
    const { container } = render(<BookCard book={mockBookInteger} onBorrow={() => {}} onDetails={() => {}} />);
    const card = container.firstChild;
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(card).toBeInTheDocument();
  });

  
  test('рендер звёзд для рейтинга 5', () => {
    const bookMax = { ...mockBookInteger, rating: 5, title: 'Максимум' };
    render(<BookCard book={bookMax} onBorrow={() => {}} onDetails={() => {}} />);
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  test('рендер звёзд для рейтинга 0', () => {
    const bookMin = { ...mockBookInteger, rating: 0, title: 'Ноль' };
    render(<BookCard book={bookMin} onBorrow={() => {}} onDetails={() => {}} />);
    expect(screen.getByText(/0/)).toBeInTheDocument();
  });
});