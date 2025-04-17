import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import HeaderBar from "../components/HeaderBar";
import LoadingPage from "../LoadingPage";
import { Link } from 'react-router-dom';
import "../App.css";
import "../Preferences.css";

const PreferencesPage = ({ onSignOut }) => {
  const { user, token, loading, handleSignIn, handleSignOut } = useUser();
  const [detailedPrefs, setDetailedPrefs] = useState([]);
  const [newSport, setNewSport] = useState(""); // New input state

  useEffect(() => {
    if (token) {
      fetch("https://fanfeed-server-env.eba-wnhhgsmd.us-west-2.elasticbeanstalk.com/api/user/preferences", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          setDetailedPrefs(data?.preferences || []);
        });
    }
  }, [token]);

  const addInterest = (sport) => {
    if (!sport.trim()) return; // Prevent empty strings
    const updated = [...detailedPrefs, sport];
    setDetailedPrefs(updated);

    fetch("https://fanfeed-server-env.eba-wnhhgsmd.us-west-2.elasticbeanstalk.com/api/user/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferences: updated }),
    }).catch((error) => {
      console.error("Error adding sport:", error);
    });
  };

  const removeInterest = (sport) => {
    const updatedPrefs = detailedPrefs.filter((p) => p !== sport);
    setDetailedPrefs(updatedPrefs);

    fetch("https://fanfeed-server-env.eba-wnhhgsmd.us-west-2.elasticbeanstalk.com/api/user/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferences: updatedPrefs }),
    }).catch((error) => {
      console.error("Error removing sport:", error);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addInterest(newSport);
    setNewSport(""); // Clear input
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <main>
        <HeaderBar user={user} onSignOut={handleSignOut} />
        <div className="pref-body">
          <h2>Your Interests</h2>

          {/* Form to add a new interest */}
          <form onSubmit={handleSubmit} className="add-interest-form">
            <input
              type="text"
              value={newSport}
              onChange={(e) => setNewSport(e.target.value)}
              placeholder="Add a new interest"
              className="add-interest-input"
            />
            <button type="submit" className="add-interest-btn">+</button>
          </form>

          {/* Interest list */}
          {detailedPrefs.map((pref) => (
            <section className="sport-section" key={pref}>
              <div className="sport-header">
                <h3>{pref}</h3>
                <button
                  onClick={() => removeInterest(pref)}
                  className="remove-btn"
                >
                  −
                </button>
              </div>
            </section>
          ))}
          <Link to="/">
            <button className="done-button">Done</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PreferencesPage;
