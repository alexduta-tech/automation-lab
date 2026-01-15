import { useEffect, useState } from "react";
import '../styles/App.css';
import BackButton from "../components/BackButton";
import { API_BASE } from "../config/config";

// User Dialogs page to get random user names using different dialog types
export default function UserDialogs() {
    useEffect(() => {
        document.title = "Automation Playground - User Dialogs";
    }, []);

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

    // Show Alert dialog
    const showAlert = async () => {
        window.alert(`This is an alert to get a random user`);
        try {
            setLoading(true);
            const users = await fetchUsers();
            const user = randomUser(users);
            if (!user) {
                setMessage("Alert result: No users available for alert.");
                setMessageType("error");
                return;
            }
            setMessage("Alert result: Alert was shown, random user: " + user.name);
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

    // Show Confirm dialog
    const showConfirm = async () => {
        try {
            setLoading(true);
            const confirmed = confirm("Are you sure you want to get a random user name?");
            const users = await fetchUsers();
            const user = randomUser(users);

            if (confirmed) {
                if (!user) {
                    setMessage("Confirm result: No users available.");
                    setMessageType("error");
                    return;
                }
                setMessage("Confirm result: User clicked OK. Random user name: " + (user ? user.name : "N/A"));
                setMessageType("success");
            } else {
                setMessage("Confirm result: User cancelled the action.");
                setMessageType("error");
            }
        } catch (err) {
            console.error(err);
            setMessage(`Error fetching user ${err.message}`);
            setMessageType("error");
        }
        finally {
            setLoading(false);
        }
    };

    // Show Prompt dialog
    const showPrompt = async () => {
        try {
            setLoading(true);
            const input = prompt("Please enter user's name:");
            const users = await fetchUsers();

            if (input === null) {
                setMessage("Prompt result: Prompt canceled.");
                setMessageType("error");
            } else if (input.trim() === "") {
                const user = randomUser(users);
                setMessage("Prompt result: No name was entered. Random user: " + (user ? user.name : "N/A"));
                setMessageType("error");
            } else {
                const user = users.find(u => u.name.toLowerCase() === input.toLowerCase());
                if (user) {
                    setMessage(`Prompt result: ${user.name}! User found in the system.`);
                    setMessageType("success");
                } else {
                    setMessage(`Prompt result: ${input}! User not found in the system.`);
                    setMessageType("error");
                }
            }
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

                <h2>User Dialogs</h2>
                <p style={{ marginBottom: "30px" }}>
                    Get random user names using different user interaction dialogs:
                </p>

                <div style={styles.buttons}>
                    <button id="alertBtn" style={styles.alertBtn} onClick={showAlert}>
                        {loading ? "Getting..." : "Show Alert"}

                    </button>

                    <button id="confirmBtn" style={styles.confirmBtn} onClick={showConfirm}>
                        {loading ? "Getting..." : "Show Confirm"}
                    </button>

                    <button id="promptBtn" style={styles.promptBtn} onClick={showPrompt}>
                        {loading ? "Getting..." : "Show Prompt"}
                    </button>
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

    buttons: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginBottom: "30px",
    },

    alertBtn: {
        padding: "12px",
        background: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },

    confirmBtn: {
        padding: "12px",
        background: "#17a2b8",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },

    promptBtn: {
        padding: "12px",
        background: "#6f42c1",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
    },
};
