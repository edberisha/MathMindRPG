import React, { useState, useEffect } from "react";

const AverageTime = ({ userId }) => {
  const [averageTime, setAverageTime] = useState(null);

  useEffect(() => {
    fetch(`/users/${userId}/games`)
      .then((resp) => resp.json())
      .then((games) => {
        const totalGames = games.length;
        if (totalGames > 0) {
          const totalSeconds = games.reduce((sum, game) => sum + game.time_taken, 0);
          const average = totalSeconds / totalGames;
          setAverageTime(average.toFixed(3));
        } else {
          setAverageTime(0);
        }
      })
      .catch((error) => console.error("Error fetching game data:", error));
  }, [userId]);

  return (
    <div style={{ fontSize: "1.2em" }}>
      <h2>Your Stats</h2>
      {averageTime !== null ? (
        <p style={{ fontSize: "1.2em" }}>
          Your average time taken across {averageTime === 0 ? "0 games" : `all games`} is{" "}
          {averageTime} seconds.
        </p>
      ) : (
        <p style={{ fontSize: "1.2em" }}>Loading average time...</p>
      )}
    </div>
  );
};

export default AverageTime;
