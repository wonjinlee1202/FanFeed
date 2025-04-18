import React, { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar";
import SportNav from "../components/SportNav";
import SportFeed from "../components/SportFeed";
import "../App.css";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeaderBar guest={true}/>
      <SportNav
        sports={[]}
        selectedSport={"NBA"}
        onSelectSport={() => {}}
      />

      <main>
        <section className="feed-section">
          <SportFeed sport={"NBA"} />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
