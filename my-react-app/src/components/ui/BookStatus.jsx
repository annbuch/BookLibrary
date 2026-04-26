// Компонент BookStatus - статус книги (доступность)
function BookStatus({ available, reservedCount = 0 }) {
  
  const getStatusInfo = () => {
    if (available) {
      return {
        text: "В наличии",
        icon: "✓",
        backgroundColor: "#d4edda",
        color: "#155724"
      };
    } else {
      return {
        text: "Выдана",
        icon: "✗",
        backgroundColor: "#f8d7da",
        color: "#721c24"
      };
    }
  };

  const statusInfo = getStatusInfo();

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: statusInfo.backgroundColor,
    color: statusInfo.color,
    padding: "8px 12px",
    borderRadius: "8px",
    marginBottom: "12px"
  };

  const statusStyle = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: "600"
  };

  const iconStyle = {
    fontSize: "14px",
    fontWeight: "bold"
  };

  const reservedStyle = {
    fontSize: "11px",
    opacity: 0.8
  };

  return (
    <div style={containerStyle}>
      <div style={statusStyle}>
        <span style={iconStyle}>{statusInfo.icon}</span>
        <span>{statusInfo.text}</span>
      </div>
      {!available && reservedCount > 0 && (
        <div style={reservedStyle}>
          Очередь: {reservedCount} чел.
        </div>
      )}
    </div>
  );
}

export default BookStatus;