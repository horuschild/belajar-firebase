import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a loader/spinner
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user is an admin or has the required role
  if (
    requiredRole &&
    (!user.email ||
      (requiredRole === "admin" && user.email !== "admin@admin.com"))
  ) {
    return <Navigate to="/user" />; // Redirect to the user page
  }

  return children;
};

export default ProtectedRoute;
