// ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth, db } from "../components/firebase.js"; // Adjust path as necessary
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children, requiredRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({ ...user, isAdmin: userData.isAdmin }); // Merge isAdmin into user object
          } else {
            setUser(user); // Set user without isAdmin if document doesn't exist
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(user); // Set user without isAdmin on error
        } finally {
          setLoading(false);
        }
      } else {
        setUser(null);
        setLoading(false);
      }
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
  if (requiredRole && !user.isAdmin) {
    return <Navigate to="/user" />; // Redirect to the user page if not admin
  }

  return children;
};

export default ProtectedRoute;
