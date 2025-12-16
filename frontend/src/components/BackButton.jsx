import { Link } from "react-router-dom";

// A simple back button component that navigates to a specified route
export default function BackButton({ to = "/" , text = "Back" }) {
  return (
    <Link to={to} style={styles.link}>
      <button style={styles.button}>
        ← {text}
      </button>
    </Link>
  );
}

// Styles for the back button
const styles = {
  link: {
    textDecoration: "none",
  },
  button: {
    padding: "10px 16px",
    background: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
};
