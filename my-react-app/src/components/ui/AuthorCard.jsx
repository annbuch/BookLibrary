function AuthorCard({ author, onViewBooks, isSelected }) {
  const handleClick = () => {
    if (onViewBooks) {
      onViewBooks(author.id);
    }
  };

  const cardStyle = {
    backgroundColor: isSelected ? "#e3f2fd" : "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
    transition: "all 0.2s",
    border: isSelected ? "2px solid #4a90e2" : "none"
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.transform = "translateY(-4px)"; }}
      onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ width: "80px", height: "80px", backgroundColor: "#4a90e2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 15px", fontSize: "32px", color: "white" }}>
        📚
      </div>
      <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>{author.name}</h3>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}><strong>Год рождения:</strong> {author.birthYear}</p>
      <p style={{ fontSize: "13px", color: "#666", marginBottom: "6px" }}><strong>Страна:</strong> {author.country}</p>
      <div style={{ display: "inline-block", backgroundColor: "#e8f4fd", color: "#4a90e2", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", margin: "12px 0" }}>
        📖 {author.bookCount} книга(и)
      </div>
      <button
        onClick={handleClick}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isSelected ? "#2c3e50" : "#4a90e2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "500",
          transition: "opacity 0.2s"
        }}
        onMouseEnter={(e) => e.target.style.opacity = "0.8"}
        onMouseLeave={(e) => e.target.style.opacity = "1"}
      >
        {isSelected ? "✓ Показаны книги автора" : "Книги автора"}
      </button>
    </div>
  );
}

export default AuthorCard;