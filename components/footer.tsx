export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        padding: "20px",
        backgroundColor: "#111827",
        color: "white",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Redheaded Stepchild
      </p>
    </footer>
  );
}