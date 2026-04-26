// Компонент GenreFilter - фильтр по жанрам
function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  
  const handleGenreClick = (genre) => {
    if (onSelectGenre) {
      onSelectGenre(genre);
    }
  };

  const containerStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginBottom: "25px"
  };

  const getButtonStyle = (genre) => {
    const isSelected = selectedGenre === genre;
    return {
      padding: "8px 18px",
      border: isSelected ? "none" : "1px solid #ddd",
      borderRadius: "25px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: isSelected ? "600" : "400",
      transition: "all 0.3s ease",
      backgroundColor: isSelected ? "#4a90e2" : "white",
      color: isSelected ? "white" : "#333"
    };
  };

  return (
    <div style={containerStyle}>
      {genres.map((genre) => (
        <button
          key={genre}
          style={getButtonStyle(genre)}
          onClick={() => handleGenreClick(genre)}
          onMouseEnter={(e) => {
            if (selectedGenre !== genre) {
              e.target.style.backgroundColor = "#f0f0f0";
              e.target.style.borderColor = "#bbb";
            }
          }}
          onMouseLeave={(e) => {
            if (selectedGenre !== genre) {
              e.target.style.backgroundColor = "white";
              e.target.style.borderColor = "#ddd";
            }
          }}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;