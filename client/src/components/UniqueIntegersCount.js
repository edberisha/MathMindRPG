import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AverageTime from "./AverageTime";
import Medal1 from "./Medal1.png";
import Medal2 from "./Medal2.png";
import Medal3 from "./Medal3.png";
import Medal4 from "./Medal4.png";

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

  const medalStyle = {
    width: "50px", // Adjust the width as needed
    height: "50px", // Adjust the height as needed
    marginRight: "5px", // Optional spacing between medals
  };

  return (
    <Box>
      {/* <AverageTime userId={userId} /> */}
      {uniqueIntegersCount !== null && (
        <div>
          <p style={{ fontSize: "20px" }}>
            You have multiplied {uniqueIntegersCount}/90 unique integers!
          </p>

          {/* Conditionally render medals based on uniqueIntegersCount */}
          {uniqueIntegersCount >= 70 && (
            <img src={Medal4} alt="Medal 4" style={medalStyle} />
          )}
          {uniqueIntegersCount >= 40 && (
            <img src={Medal3} alt="Medal 3" style={medalStyle} />
          )}
          {uniqueIntegersCount >= 20 && (
            <img src={Medal2} alt="Medal 2" style={medalStyle} />
          )}
          {uniqueIntegersCount >= 10 && (
            <img src={Medal1} alt="Medal 1" style={medalStyle} />
          )}
        </div>
      )}
    </Box>
  );
};

export default UniqueIntegersCount;
