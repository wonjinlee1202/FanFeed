import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import SignInPage from "../SignInPage";
import LoadingPage from "../LoadingPage";
import HeaderBar from "../components/HeaderBar";
import SportNav from "../components/SportNav";
import SportFeed from "../components/SportFeed";
import "../App.css";

const HomePage = () => {
  const { user, token, loading, handleSignIn, handleSignOut } = useUser();
  const [detailedPrefs, setDetailedPrefs] = useState([]);
  const [selectedSport, setSelectedSport] = useState("Sports");
  const [sportsList, setSportsList] = useState([]);

  useEffect(() => { // run once to fetch user preferences (every time token changes)
    if (token) {
      fetch("https://fanfeed-server-env.eba-wnhhgsmd.us-west-2.elasticbeanstalk.com/api/user/preferences", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          setDetailedPrefs(data?.preferences || []);
        });
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
      <HeaderBar/>
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
