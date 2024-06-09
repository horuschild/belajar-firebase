import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function User() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.error("Sign out error", error);
      });
  };

  return (
    <div>
      <h1>User Page</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default User;
