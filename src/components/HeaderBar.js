import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../UserContext";
import "../App.css";

const HeaderBar = ({ guest }) => {
  const { user, token, loading, handleSignIn, handleSignOut } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const signOut = () => {
    handleSignOut();
    navigate("/");
  };

  const handleEditPreferences = () => {
    navigate("/preferences");
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div />
        {guest ? (
          <Link to="/guest">
            <h1 className="title centered-title">FanFeed</h1>
          </Link>
        ) : (
          <Link to="/">
            <h1 className="title centered-title">FanFeed</h1>
          </Link>
        )}
      <div className="user-area" ref={dropdownRef}>
        {guest ? (
          <Link to="/" className="sign-in-button">
            <p>Sign In</p>
          </Link>
        ) : (
          <>
            <span className="user-name" onClick={toggleDropdown}>
              {user.displayName} ▼
            </span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleEditPreferences}>Edit Preferences</button>
                <button onClick={signOut}>Sign Out</button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderBar;
