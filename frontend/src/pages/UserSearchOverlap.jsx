import { useEffect, useState } from "react";
import '../styles/App.css';
import BackButton from "../components/BackButton";
import { API_BASE } from "../config/config";

// User Dialogs page to get random user names using different dialog types
export default function UserDialogs() {
    useEffect(() => {
        document.title = "Automation Playground - User Dialogs";
    }, []);

    // State variables
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info"); // info | success | error
    const [loading, setLoading] = useState(false);

    // Fetch all users from API
    const fetchUsers = async () => {
        let allUsers = [];
        let page = 1;
        let hasMore = true;        
        try {
            while (hasMore) {
                const params = new URLSearchParams({ size: 100, page });
                const res = await fetch(`${API_BASE}/users?${params.toString()}`);
                if (!res.ok) throw new Error(`Failed to fetch page ${page}`);
                const data = await res.json();
                const items = Array.isArray(data) ? data : (data.items || []);
                if (items.length > 0) {
                    allUsers = [...allUsers, ...items];
                    page++;
                } else {
                    hasMore = false;
                }
            }
            return allUsers;
        } catch (err) {
            console.error("Error fetching all users:", err);
            return allUsers;
        }
    };

    // Pick random user helper
    const randomUser = (users) =>
        users.length ? users[Math.floor(Math.random() * users.length)] : null;

    const getUserName = async () => {
        try {
            setLoading(true);
            const users = await fetchUsers();
            const user = randomUser(users);
            if (!user) {
                setMessage("No users available.");
                setMessageType("error");
                return;
            }
            setMessage("Random user: " + user.name);
            setMessageType("success");

        } catch (err) {
            console.error(err);
            setMessage(`Error fetching user ${err.message}`);
            setMessageType("error");
        }
        finally {
            setLoading(false);
        }
    };

    // Render
    return (
        <div className="center-page">
            <div style={styles.container}>
                {/* Back button */}
                <BackButton to="/" text="Back" />

                <h2>Get Random User Name & Overlap</h2>
                {/* ⚠ Simulated Overlap */}
                <div style={styles.overlapBox}>
                    ⚠ Overlapping DIV (simulating layout issue)
                </div>
                <div style={styles.scrollWrapper}>
                    {/* Scrollable content */}
                    <div style={styles.scrollContent}></div>


                    <div style={styles.buttons}>
                        <p>Note: There is an overlapping element above the scrollable area.</p>
                        <button id="getRandomUserBtn" disabled={loading} style={styles.button} onClick={getUserName}>
                            {loading ? "Getting..." : "Get Random User Name"}

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

// Styles for the UserDialogs component
const styles = {
    scrollWrapper: {
        maxHeight: "100px",     // height of scrollable area
        overflowY: "scroll",    // vertical scrollbar
        border: "2px solid #ccc",
        padding: "10px",
        borderRadius: "8px",
        position: "relative",
        background: "#f9f9f9",
    },
    scrollContent: {
        position: "relative",
    },
    container: {
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
    },
    buttons: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginBottom: "30px",
    },

    button: {
        padding: "12px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },
    overlapBox: {
        position: "relative",
        top: "120px",
        height: "40px",
        background: "rgba(255, 100, 100, 0.75)",
        color: "white",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        fontWeight: "bold",
    }
};
