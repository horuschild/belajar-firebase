import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../components/firebase";
import "./signup.scss";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();

    if (password.length < 6) {
      setError("Password must be 6 or more characters");
      return;
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user's name in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        createdAt: new Date(),
      });

      // Display success message
      alert("Account created successfully!");

      // Redirect to login page or another page
      navigate("/login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("The email already exists, please Login");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <section className="signup-wrapper">
      <div className="signup">
        <h1>Welcome to EMDB!</h1>
        <form onSubmit={handleSignup}>
          {error === "The email already exists, please Login" && <p>{error}</p>}
          <input
            type="text"
            placeholder="Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-Mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-btn">
            Signup
          </button>
          <p>
            Already have an account? <a href="/login">Login here</a>!
          </p>
        </form>
      </div>
      <div className="signup-bg"></div>
    </section>
  );
}

export default Signup;
