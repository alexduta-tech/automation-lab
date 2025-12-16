import { use, useEffect } from "react";
import WidgetCard from "../components/WidgetCard";

// Home page displaying available widgets for automation
export default function Home() {
  useEffect(() => {
    document.title = "Automation Playground";
  }, []);

  // Render the home page with widget cards
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Automation Playground</h1>
      <p style={styles.subtitle}>Select a widget to get started</p>

      <div style={styles.grid}>
        <WidgetCard
          title="Create User"
          description="Create a new user with role, status, and profile picture."
          link="/create-user"
          features={["Input fields", "Buttons", "File upload", "Dropdowns", "Validation messages",
            "Loading delay (message display for user creation)", "Locators: ID, Name, Text, Xpath, CSS"]}
        />

        <WidgetCard
          title="List All Users"
          description="View all users, search, filter by role/status, and paginate."
          link="/users"
          features={["Table", "Search", "AJAX Data fetching", "Filters", "Pagination",
            "Dynamic ID handling for table rows"
          ]}
        />

        <WidgetCard
          title="Get Random Users"
          description="Get random user names using dialogs."
          link="/user-dialogs"
          features={["Alert dialog", "Confirm dialog", "Prompt dialog"]}
        />

        <WidgetCard
          title="Get User"
          description="Get random user names with overlapping elements and scrollable content."
          link="/user-search-overlap"
          features={["Overlapping elements", "Scrollable results"]}
        />

        {/* Add more widgets here if needed */}
      </div>
    </div>
  );
}

// Styles for the Home component
const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "40px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",           // allows multiple rows if screen is small
    justifyContent: "center",   // center widgets horizontally
    gap: "30px",                // space between widgets
  },
};
