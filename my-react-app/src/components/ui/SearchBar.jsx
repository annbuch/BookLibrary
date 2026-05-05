import { useState } from "react";

function SearchBar({ searchTerm, onSearch }) {
  const [localTerm, setLocalTerm] = useState(searchTerm);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setLocalTerm("");
    onSearch("");
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <div style={{ flex: 1, position: "relative" }}>
        <input
          type="text"
          value={localTerm}
          onChange={handleInputChange}
          placeholder="Поиск по названию или автору..."
          style={{
            width: "100%",
            padding: "14px 16px",
            border: "1px solid #ddd",
            borderRadius: "12px",
            fontSize: "14px",
            outline: "none",
            transition: "all 0.2s"
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#4a90e2";
            e.target.style.boxShadow = "0 0 0 2px rgba(74,144,226,0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#ddd";
            e.target.style.boxShadow = "none";
          }}
        />
        {localTerm && (
          <button
            onClick={handleClear}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
              color: "#999"
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;