// Компонент AuthorCard - карточка автора
function AuthorCard({ author, onViewBooks }) {
  
  const handleViewBooksClick = () => {
    if (onViewBooks) {
      onViewBooks(author.id);
    }
  };
const cardStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    textAlign: "center"
  };

  const avatarStyle = {
    width: "80px",
    height: "80px",
    backgroundColor: "#4a90e2",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 15px",
    fontSize: "32px",
    color: "white"
  };

  const nameStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#2c3e50"
  };

  const infoStyle = {
    fontSize: "13px",
    color: "#666",
    marginBottom: "6px"
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#333"
  };

  const bookCountStyle = {
    display: "inline-block",
    backgroundColor: "#e8f4fd",
    color: "#4a90e2",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    margin: "12px 0"
  };

  const buttonStyle = {
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "opacity 0.3s ease",
    width: "100%"
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
      <div style={avatarStyle}>
        {'\u{1F4DA}'}
      </div>
      <h3 style={nameStyle}>{author.name}</h3>
      <p style={infoStyle}>
        <span style={labelStyle}>Год рождения:</span> {author.birthYear}
      </p>
      <p style={infoStyle}>
        <span style={labelStyle}>Страна:</span> {author.country}
      </p>
      <div style={bookCountStyle}>
         {author.bookCount} книга(и)
      </div>
      <button 
        style={buttonStyle}
        onClick={handleViewBooksClick}
        onMouseEnter={(e) => e.target.style.opacity = "0.8"}
        onMouseLeave={(e) => e.target.style.opacity = "1"}
      >
        Книги автора
      </button>
    </div>
  );
}

export default AuthorCard;