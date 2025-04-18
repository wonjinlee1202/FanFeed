import React from "react";
import { Link } from 'react-router-dom';

const SignInPage = ({ onSignIn }) => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to FanFeed</h1>
        <p style={styles.subtitle}>Customize your sports feed with your favorites.</p>
        <button onClick={onSignIn} style={styles.googleButton}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={styles.googleIcon}
          />
          Sign in with Google
        </button>
        <Link to="/guest" style={styles.googleButton}>
          Continue as Guest
        </Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    fontFamily: "sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "4rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    textAlign: "center",
    maxWidth: "400px",
    width: "100%",
  },
  title: {
    marginBottom: "1rem",
    fontSize: "2rem",
    color: "#2a2a2a",
  },
  subtitle: {
    marginBottom: "2rem",
    fontSize: "1rem",
    color: "#666",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "background-color 0.2s ease",
    margin: "0 auto",
    marginBottom: "0.5rem",
  },
  googleIcon: {
    width: "20px",
    height: "20px",
    marginRight: "8px",
  },
};

export default SignInPage;
