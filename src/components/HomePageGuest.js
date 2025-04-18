import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SportNav from "../components/SportNav";
import SportFeed from "../components/SportFeed";
import "../App.css";

const HomePage = () => {
  const [selectedSport, setSelectedSport] = useState("NBA");

  return (
    <div className="home-page">
      <HeaderBar guest={true}/>
      <SportNav
        sports={[]}
        selectedSport={"NBA"}
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
