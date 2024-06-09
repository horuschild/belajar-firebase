import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Add Navigate to the import
import "./App.css";
import Login from "./assets/pages/login/login.jsx";
import Signup from "./assets/pages/signup/signup.jsx";
import Admin from "./assets/pages/admin/admin.jsx";
import User from "./assets/pages/user/user.jsx"; // Import your User component
import ProtectedRoute from "./assets/components/ProtectedRoute.jsx";
import "./assets/components/firebase.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;