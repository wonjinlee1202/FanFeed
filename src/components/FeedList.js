import React, { useState } from "react";

const FeedList = ({ data, renderItem, loadMoreLabel = "More" }) => {
  const [visibleCount, setVisibleCount] = useState(10);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="feed-list">
      {data.length === 0 ? (
        <p>No content available.</p>
      ) : (
        <div>
          {data.slice(0, visibleCount).map((item, idx) => renderItem(item, idx))}
          {visibleCount < data.length && (
            <button className="load-more-button" onClick={showMore}>
              {loadMoreLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedList;
