import BookStatus from "./BookStatus";

function BookCard({ book, onBorrow, onDetails }) {
  const handleBorrow = () => {
    if (book.available && onBorrow) {
      onBorrow(book.id);
    }
  };

  const handleDetails = () => {
    if (onDetails) {
      onDetails(book);
    }
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    return "★".repeat(full) + "☆".repeat(5 - full);
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
      }}
    >
      <h3 style={{ fontSize: "20px", marginBottom: "8px", color: "#2c3e50" }}>{book.title}</h3>
      <p style={{ color: "#666", fontSize: "14px", marginBottom: "8px", fontStyle: "italic" }}>{book.author}</p>
      <div style={{ display: "flex", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
        <span style={{ backgroundColor: "#e8f4fd", color: "#4a90e2", padding: "4px 10px", borderRadius: "20px", fontSize: "12px" }}>
          {book.genre}
        </span>
        <BookStatus available={book.available} />
      </div>
      <div style={{ color: "#f39c12", fontSize: "14px", marginBottom: "10px" }}>
        {renderStars(book.rating)} ({book.rating})
      </div>
      <p style={{ color: "#555", fontSize: "13px", lineHeight: "1.5", marginBottom: "15px", flex: 1 }}>
        {book.description}
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleBorrow}
          disabled={!book.available}
          style={{
            flex: 1,
            padding: "10px",
            border: "none",
            borderRadius: "8px",
            cursor: book.available ? "pointer" : "not-allowed",
            backgroundColor: book.available ? "#4a90e2" : "#ccc",
            color: "white",
            fontWeight: "500",
            transition: "opacity 0.2s"
          }}
          onMouseEnter={(e) => { if (book.available) e.target.style.opacity = "0.8"; }}
          onMouseLeave={(e) => { if (book.available) e.target.style.opacity = "1"; }}
        >
          {book.available ? "Взять книгу" : "Недоступна"}
        </button>
        <button
          onClick={handleDetails}
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f0f0f0",
            cursor: "pointer",
            fontWeight: "500"
          }}
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