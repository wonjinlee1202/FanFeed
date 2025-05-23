import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import HomePage from "./components/HomePage";
import HomePageGuest from "./components/HomePageGuest";
import PreferencesPage from "./components/PreferencesPage";

const App = () => (
  <UserProvider>
    <MainApp />
  </UserProvider>
);

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/guest" element={<HomePageGuest />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
