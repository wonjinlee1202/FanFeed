import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useUser } from "../UserContext";
import "../App.css";

const HeaderBar = () => {
  const { user, token, loading, handleSignIn, handleSignOut } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
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
      <Link to="/">
        <h1 className="title centered-title">FanFeed</h1>
      </Link>
      <div className="user-area" ref={dropdownRef}>
        <span className="user-name" onClick={toggleDropdown}>
          {user.displayName} ▼
        </span>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={handleEditPreferences}>Edit Preferences</button>
            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderBar;
