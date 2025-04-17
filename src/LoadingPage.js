import React from "react";
import "./LoadingPage.css";

const LoadingPage = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Just a moment, we're loading your preferences...</p>
    </div>
  );
};

export default LoadingPage;
