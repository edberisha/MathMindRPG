import React, { useState, useEffect } from "react";
import HighScoresImage from "./Highscores.png";

const Highscores = () => {
  const [highscores, setHighscores] = useState([]);

  useEffect(() => {
    fetch("/highscores")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("Failed to fetch highscores");
        }
      })
      .then((data) => setHighscores(data))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ marginTop: "50px", textAlign: "center", margin: "auto" }}>
      <img
        src={HighScoresImage}
        alt="High Scores"
        style={{ marginBottom: "30px", width: "100%", maxWidth: "500px" }}
      />

      <ol style={{ listStyleType: "none", padding: 0 }}>
        {highscores.slice(0, 10).map((score, index) => (
          <li
            key={index}
            style={{ marginTop: "10px", marginBottom: "30px", borderBottom: "1px solid #ccc" }}
          >
            <p>
              <strong style={{ fontSize: "30px" }}>Rank: {index + 1}</strong>
            </p>
            <p>
              <strong>Time Taken:</strong> {score.time_taken} seconds
            </p>
            <p  style={{color: "gold"}}>
              <strong>Username:</strong> {score.username || "Unknown"}
            </p>
            <p>
              <strong>Integers Multiplied:</strong> {score.first_integer} x{" "}
              {score.second_integer}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Highscores;
