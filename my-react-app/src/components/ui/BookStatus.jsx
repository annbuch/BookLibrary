function BookStatus({ available }) {
  const statusInfo = available
    ? { text: "В наличии", icon: "✓", bgColor: "#d4edda", color: "#155724" }
    : { text: "Выдана", icon: "✗", bgColor: "#f8d7da", color: "#721c24" };

  const style = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    backgroundColor: statusInfo.bgColor,
    color: statusInfo.color
  };

  return (
    <span style={style}>
      <span>{statusInfo.icon}</span> {statusInfo.text}
    </span>
  );
}

export default BookStatus;