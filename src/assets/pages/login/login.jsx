import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import "./login.scss";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        if (user.email === "admin@admin.com") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      }
    });
  }, [navigate]);

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        if (email === "admin@admin.com") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error.code, error.message);
      });
  };

  return (
    <section className="login-wrapper">
      <div className="login">
        <h1>Login To Your Account</h1>
        <form onSubmit={handleLogin}>
          {error && <span>Wrong email or password!</span>}
          <input
            type="email"
            placeholder="E-Mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">
            Login
          </button>
          <p>
            Don't have an account yet? <a href="/signup">Register here</a>!
          </p>
        </form>
      </div>
      <div className="login-bg"></div>
    </section>
  );
}

export default Login;
