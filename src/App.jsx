import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./assets/pages/login/login.jsx";
import Signup from "./assets/pages/signup/signup.jsx";
import Admin from "./assets/pages/admin/admin.jsx";
import User from "./assets/pages/user/user.jsx";
import ProtectedRoute from "./assets/components/ProtectedRoute.jsx";
import { auth } from "./assets/components/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={
            user ? (
              <ProtectedRoute requiredRole="admin">
                <Admin />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user"
          element={
            user ? (
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
