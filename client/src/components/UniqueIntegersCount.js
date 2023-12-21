import React, { useState, useEffect } from "react";

const UniqueIntegersCount = ({ userId }) => {
  const [uniqueIntegersCount, setUniqueIntegersCount] = useState(null);

  useEffect(() => {
    fetch(`/users/${userId}/unique-integers-count`)
      .then((resp) => resp.json())
      .then((data) => {
        setUniqueIntegersCount(data.count);
      })
      .catch((error) =>
        console.error("Error fetching unique integers count:", error)
      );
  }, [userId]);

  return (
    <div>
      {uniqueIntegersCount !== null && (
        <p style={{ fontSize: "20px" }}>
          You have multiplied {uniqueIntegersCount}/90 unique integers!
        </p>
      )}
    </div>
  );
};

export default UniqueIntegersCount;
