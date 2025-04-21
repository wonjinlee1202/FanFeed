import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { auth } from "../firebase";
import { getUserStrings, saveUserStrings } from "../db";
import SignInPage from "../SignInPage";
import LoadingPage from "../LoadingPage";
import HeaderBar from "../components/HeaderBar";
import SportNav from "../components/SportNav";
import SportFeed from "../components/SportFeed";
import "../App.css";

const HomePage = () => {
  const { user, token, loading, handleSignIn, handleSignOut } = useUser();
  const [detailedPrefs, setDetailedPrefs] = useState([]);
  const [selectedSport, setSelectedSport] = useState("NBA");
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => { // run once to fetch user preferences (every time token changes)
    if (token) {
      const user = auth.currentUser;
      getUserStrings(user.uid).then(setDetailedPrefs);
      // fetch("/api/user/preferences", {
      //   headers: { Authorization: `Bearer ${token}` },
      // })
      //   .then(res => res.json())
      //   .then(data => {
      //     setDetailedPrefs(data?.preferences || []);
      //   });
    }
  }, [token]);

  useEffect(() => {
    if (detailedPrefs) {
      setSportsList(detailedPrefs);
    }
  }, [detailedPrefs]);


  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <SignInPage onSignIn={handleSignIn} />;
  }
  
  return (
    <div className="home-page">
      <HeaderBar guest={false}/>
      <SportNav
        sports={sportsList}
        selectedSport={selectedSport}
        onSelectSport={setSelectedSport}
      />

      <main>
        <section className="feed-section">
          <SportFeed sport={selectedSport} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
