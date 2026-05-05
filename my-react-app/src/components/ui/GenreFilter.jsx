function GenreFilter({ genres, selectedGenre, onSelectGenre }) {
  const handleClick = (genre) => {
    onSelectGenre(genre);
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "25px" }}>
      {genres.map(genre => {
        const isSelected = selectedGenre === genre;
        return (
          <button
            key={genre}
            onClick={() => handleClick(genre)}
            style={{
              padding: "8px 18px",
              border: isSelected ? "none" : "1px solid #ddd",
              borderRadius: "25px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: isSelected ? "600" : "400",
              backgroundColor: isSelected ? "#4a90e2" : "white",
              color: isSelected ? "white" : "#333",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                e.target.style.backgroundColor = "#f0f0f0";
                e.target.style.borderColor = "#bbb";
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                e.target.style.backgroundColor = "white";
                e.target.style.borderColor = "#ddd";
              }
            }}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
}

export default GenreFilter;