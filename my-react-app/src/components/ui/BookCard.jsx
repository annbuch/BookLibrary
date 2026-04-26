function BookCard({ book, onBorrow, onDetails }) {
  
  const handleBorrowClick = () => {
    if (onBorrow && book.available) {
      onBorrow(book.id);
    }
  };

  const handleDetailsClick = () => {
    if (onDetails) {
      onDetails(book.id);
    }
  };
  // Отображение звезд рейтинга
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= fullStars ? "★" : "☆");
    }
    return stars.join("");
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  };

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#2c3e50"
  };

  const authorStyle = {
    color: "#666",
    fontSize: "14px",
    marginBottom: "8px",
    fontStyle: "italic"
  };

  const genreStyle = {
    display: "inline-block",
    backgroundColor: "#e8f4fd",
    color: "#4a90e2",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    marginBottom: "12px"
  };

  const ratingStyle = {
    color: "#f39c12",
    fontSize: "14px",
    marginBottom: "10px"
  };

  const descriptionStyle = {
    color: "#555",
    fontSize: "13px",
    lineHeight: "1.5",
    marginBottom: "15px",
    flex: 1
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "10px"
  };

  const buttonStyle = {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "opacity 0.3s ease"
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: book.available ? "#4a90e2" : "#ccc",
    color: "white"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f0f0f0",
    color: "#333",
    border: "1px solid #ddd"
  };

  const statusStyle = {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "12px",
    backgroundColor: book.available ? "#d4edda" : "#f8d7da",
    color: book.available ? "#155724" : "#721c24"
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
      }}
    >
      <h3 style={titleStyle}>{book.title}</h3>
      <p style={authorStyle}>{book.author}</p>
      <div>
        <span style={genreStyle}>{book.genre}</span>
        <span style={statusStyle}>
          {book.available ? "✓ В наличии" : "✗ Выдана"}
        </span>
      </div>
      <div style={ratingStyle}>
        {renderStars(book.rating)} ({book.rating})
      </div>
      <p style={descriptionStyle}>{book.description}</p>
      <div style={buttonContainerStyle}>
        <button 
          style={primaryButtonStyle}
          onClick={handleBorrowClick}
          disabled={!book.available}
          onMouseEnter={(e) => {
            if (book.available) e.target.style.opacity = "0.8";
          }}
          onMouseLeave={(e) => {
            if (book.available) e.target.style.opacity = "1";
          }}
        >
          {book.available ? "📖 Взять книгу" : "❌ Недоступна"}
        </button>
        <button 
          style={secondaryButtonStyle}
          onClick={handleDetailsClick}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#e8e8e8"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#f0f0f0"}
        >
          Подробнее
        </button>
      </div>
    </div>
  );
}

export default BookCard;