import { Link } from "react-router-dom";

// A card component that displays widget information and links to its detailed page
export default function WidgetCard({ title, description, link, features = [] }) {
  return (
    <Link to={link} style={styles.link}>
      <div style={styles.card}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.text}>{description}</p>
        {features && features.length > 0 && (
          <ul style={styles.list}>
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}

// Styles for the widget card
const styles = {
  link: {
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    width: "220px",
    textAlign: "center",
    background: "#efebebff",
    cursor: "pointer",
    transition: "0.2s",
  },
  title: {
    marginBottom: "10px",
  },
  text: {
    opacity: 0.8,
  },
  list: {
    marginTop: "15px",
    textAlign: "left",
  },
};
