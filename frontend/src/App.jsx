import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateUser from "./pages/CreateUser";
import UserList from "./pages/UserList";
import UserDialogs from "./pages/UserDialogs";
import UserSearchOverlap from "./pages/UserSearchOverlap";

// Main application component with routing setup for different pages
// using React Router for navigation between pages 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/user-dialogs" element={<UserDialogs />} />
        <Route path="/user-search-overlap" element={<UserSearchOverlap />} />
      </Routes>
    </BrowserRouter>
  );
}
