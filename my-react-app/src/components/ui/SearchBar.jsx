// Компонент SearchBar - строка поиска
function SearchBar({ searchTerm, onSearch, placeholder = "Поиск по названию или автору..." }) {
  
  const handleInputChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleClearClick = () => {
    if (onSearch) {
      onSearch("");
    }
  };

  const containerStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  };

  const inputWrapperStyle = {
    flex: 1,
    position: "relative"
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    backgroundColor: "white"
  };

  const clearButtonStyle = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: searchTerm ? "pointer" : "default",
    color: "#999",
    padding: "4px 8px"
  };

  const buttonStyle = {
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    padding: "0 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "opacity 0.3s ease"
  };

  return (
    <div style={containerStyle}>
      <div style={inputWrapperStyle}>
        <input type="text"
          style={inputStyle}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={(e) => {
            e.target.style.borderColor = "#4a90e2";
            e.target.style.boxShadow = "0 0 0 2px rgba(74, 144, 226, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ddd";
            e.target.style.boxShadow = "none";
          }}
        />
        {searchTerm && (
          <button 
            style={clearButtonStyle}
            onClick={handleClearClick}
            title="Очистить"
          >
            ✕
          </button>
        )}
      </div>
      <button 
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.opacity = "0.8"}
        onMouseLeave={(e) => e.target.style.opacity = "1"}
        onClick={() => {}}
      >
        {'\u{1F50D}'} Найти
      </button>
    </div>
  );
}

export default SearchBar;