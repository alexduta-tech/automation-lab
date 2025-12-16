import { useEffect, useState } from "react";
import '../styles/App.css';
import BackButton from "../components/BackButton";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("viewer");
  const [status, setStatus] = useState("active");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info"); // info | success | error
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Automation Playground - Create User";
  }, []);
  
  // Handle profile picture upload + preview
  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!name.trim() || !email.trim()) {
      setMessage("Name and Email are required.");
      setMessageType("error");
      setLoading(false)
      return;
    }

    try {
      // Step 1: Create user without picture
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          role,
          status,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("Error: " + data.detail);
        setMessageType("error");
        return;
      }

      const userId = data.id; // returned by FastAPI

      // Step 2: Upload profile picture (optional)
      if (profilePic) {
        const formData = new FormData();
        formData.append("file", profilePic);

        await fetch(`http://localhost:8000/users/${userId}/upload-picture`, {
          method: "POST",
          body: formData,
        });
      }

      setMessage("User created successfully!");
      setMessageType("success");
      // Clear form
      setName("");
      setEmail("");
      setRole("viewer");
      setStatus("active");
      setProfilePic(null);
      setPreview(null);

    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
      setMessageType("error");
    } finally {
      setLoading(false); // stop loading
    }
  };

  // Create 10 random users
  const createTenUsers = async () => {
    setLoading(true);
    setMessage("");

    try {
      for (let i = 1; i <= 10; i++) {
        const randomName = "User " + Math.floor(Math.random() * 100000);
        const randomEmail = `user${Math.floor(Math.random() * 100000)}@example.com`;
        const randomRole = ["admin", "editor", "viewer"][Math.floor(Math.random() * 3)];
        const randomStatus = ["active", "disabled"][Math.floor(Math.random() * 2)];

        // Create user API call
        await fetch("http://localhost:8000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: randomName,
            email: randomEmail,
            role: randomRole,
            status: randomStatus,
          }),
        });
      }

      setMessage("10 users created successfully!");
      setMessageType("success");
    } catch (err) {
      console.error(err);
      setMessage("Failed to create users.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <div className="center-page">
      <div style={styles.container}>
        {/* Back button */}
        <BackButton to="/" text="Back" />
        <div style={styles.twoColumn}>

          {/* LEFT PANEL — FORM */}
          <div style={styles.leftPanel}>
            <h2>Create User</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label>Name:</label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Email:</label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label>Role:</label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={styles.input}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Status:</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  style={styles.input}
                >
                  <option value="active">Active</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div style={styles.field}>
                <label>Profile Picture:</label>
                <input type="file" accept="image/*" onChange={handlePictureChange} />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "120px", marginTop: "10px", borderRadius: "8px" }}
                  />
                )}
              </div>

              <button type="submit" disabled={loading}
                style={styles.buttton}
                onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
                onMouseLeave={(e) => (e.target.style.background = styles.buttton.background)}>

                {loading ? "Creating..." : "Create User"}
              </button>
            </form>
          </div>

          {/* RIGHT PANEL — BULK CREATE */}
          <div style={styles.rightPanel}>
            <h2>Bulk Actions</h2>
            <p>Create 10 random users instantly.</p>

            <button
              type="button"
              onClick={createTenUsers}
              style={styles.buttton}
              onMouseEnter={(e) => (e.target.style.background = styles.buttonHover.background)}
              onMouseLeave={(e) => (e.target.style.background = styles.buttton.background)}
            >
              {loading ? "Working..." : "Create 10 Users"}
            </button>

          </div>

        </div>
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

      </div>

      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
}

// Styles for the CreateUser component
const styles = {
  container: {
    padding: "40px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    marginTop: "20px",
    padding: "12px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  twoColumn: {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "40px",
  },

  leftPanel: {
    flex: 1,
    padding: "30px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fafafa",
    maxWidth: "500px",
    textAlign: "center",
  },

  rightPanel: {
    flex: 1,
    padding: "30px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fafafa",
    maxWidth: "400px",
    textAlign: "center",
  },

  buttton: {
    padding: "14px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
    marginTop: "15px",
  },

  buttonHover: {
    background: "#1f7a34",
  },
};
