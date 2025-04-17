import React, { useState, useEffect } from "react";
import { useUser } from "../UserContext";
import FeedList from "./FeedList";
import "../SportFeed.css";

const SportFeed = ({ sport }) => {
  const { token } = useUser();
  const [detailedPrefs, setDetailedPrefs] = useState([]);
  const [articles, setArticles] = useState([]);
  const [bskyPosts, setBskyPosts] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [sortByBS, setSortByBS] = useState("top");

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

  useEffect(() => {
    if (sport) {
      fetch(`https://fanfeed-server-env.eba-wnhhgsmd.us-west-2.elasticbeanstalk.com/api/news/${sport}?sortBy=${sortBy}`)
        .then((res) => res.json())
        .then((data) => {
          setArticles(data.articles || []);
        })
        .catch((err) => console.error("Failed to fetch news:", err));
    }
  }, [sport, sortBy]);

  useEffect(() => {
    if (sport) {
      fetch(`https://fanfeed-server-env.eba-wnhhgsmd.us-west-2.elasticbeanstalk.com/api/bluesky/${sport}?sort=${sortByBS}`)
        .then((res) => res.json())
        .then((data) => {
          setBskyPosts(data.posts || []);
        })
        .catch((err) => console.error("Failed to fetch posts:", err));
    }
  }, [sport, sortByBS]);

  function prettifyUTC(utcString, options = {}) {
    const date = new Date(utcString);
    const {
      locale = "en-US",
      timeStyle = "short",
      dateStyle = "medium",
      timeZone = "UTC",
    } = options;

    return new Intl.DateTimeFormat(locale, {
      dateStyle,
      timeStyle,
      timeZone,
    }).format(date);
  }

  // Render function for Articles
  const renderArticle = (article, idx) => (
    <div key={idx} className="article-card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt=""
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-title"
      >
        {article.title}
      </a>
      <span className="article-source">
        {article.source.name} | {prettifyUTC(article.publishedAt)}
      </span>
      <p className="article-desc">{article.description}</p>
    </div>
  );

  const renderBskyPost = (post, idx) => (
    <div key={idx} className="article-card bsky-post">
      <div className="bsky-header">
        <img
          src={post.author.avatar}
          alt={`${post.author.displayName}'s avatar`}
          className="bsky-avatar"
        />
        <div>
          <strong>{post.author.displayName}</strong>
          <p className="bsky-handle">@{post.author.handle}</p>
          <p className="bsky-date">{prettifyUTC(post.record.createdAt)}</p>
        </div>
      </div>
      <p className="bsky-text">{post.record.text}</p>
      
      {/* Render Full-Size Images from Embed */}
      {post.record.embed?.images?.length > 0 && (
        <div className="bsky-images">
          {post.embed.images.map((image, imageIdx) => (
            <div key={imageIdx} className="bsky-image-container">
              {/* Display Full-Size Image */}
              <img
                src={image.fullsize}
                alt={image.alt || "Embedded image"}
                className="bsky-fullsize-image"
              />
            </div>
          ))}
        </div>
      )}
  
      {/* Handle external embed links if present */}
      {post.embed?.external && (
        <a
          href={post.embed.external.uri}
          target="_blank"
          rel="noreferrer"
          className="bluesky-link"
        >
          <div className="bsky-embed">
            {post.embed.external.thumb && (
              <img src={post.embed.external.thumb} alt="Embedded preview" />
            )}
            <div className="bsky-link-details">
              <h5>{post.embed.external.title}</h5>
              <p>{post.embed.external.description}</p>
            </div>
          </div>
        </a>
      )}
    </div>
  );
  

  return (
    <div className="sport-feed-container">
      <div className="articles-feed">
        <div className="feed-header">
          <h3 className="sport-title">{sport} Feed</h3>
          <div className="sort-dropdown">
            <label htmlFor="sort-select">Sort by: </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Popular</option>
              <option value="relevancy">Relevant</option>
              <option value="publishedAt">Recent</option>
            </select>
          </div>
        </div>

        {/* Articles Feed */}
        <FeedList
          data={articles}
          renderItem={renderArticle}
          loadMoreLabel="More Articles"
        />
      </div>

      <div className="bluesky-feed">
        <div className="feed-header">
          <h3 className="sport-title">Latest from Bluesky</h3>
          <div className="sort-dropdown">
            <label htmlFor="sort-select">Sort by: </label>
            <select
              id="sort-select"
              value={sortByBS}
              onChange={(e) => setSortByBS(e.target.value)}
            >
              <option value="top">Top</option>
              <option value="latest">Latest</option>
            </select>
          </div>
        </div>

        {/* Bluesky Posts Feed */}
        <div className="bluesky-feed">
          <FeedList
            data={bskyPosts}
            renderItem={renderBskyPost}
            loadMoreLabel="More Bluesky Posts"
          />
        </div>
      </div>
    </div>
  );
};

export default SportFeed;
