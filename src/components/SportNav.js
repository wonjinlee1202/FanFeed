import React, { useState } from "react";
import "../App.css";

const SportNav = ({ sports, selectedSport, onSelectSport }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSelectSport(searchQuery);
  };

  return (
    <nav className="sport-nav">
      {/* Search Bar on the far left wrapped in a form */}
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}> {/* Form submission handler */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            placeholder="Quick Search..."
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {/* Sport Buttons in the middle */}
      <div className="sport-buttons-container">
        {sports.map((sport) => (
          <button
            key={sport}
            className={`sport-button ${selectedSport === sport ? "active" : ""}`}
            onClick={() => onSelectSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>

      <div className="live-scores-container">
        <a
          href={
            ["NBA", "NFL", "NCAAF"].includes(selectedSport.toUpperCase())
              ? `http://https://fan-feed-scores.vercel.app/:4000/${selectedSport.toLowerCase()}`
              : "http://https://fan-feed-scores.vercel.app/:4000/"
          }
          rel="noopener noreferrer"
          className="live-scores-button"
        >
          Live Scores <span className="red-dot" />
        </a>
      </div>
    </nav>
  );
};

export default SportNav;
