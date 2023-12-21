import React from "react";
import { Typography, Box } from "@mui/material";
import Wizard from "./Wizard.png";
import Monk from "./Monk.png";
import Explorer from "./Explorer.png";
import Knight from "./Knight.png";
import AverageTime from "./AverageTime";
import UniqueIntegersCount from "./UniqueIntegersCount";
import Medal1 from "./Medal1.png";
import Medal2 from "./Medal2.png";
import Medal3 from "./Medal3.png";
import Medal4 from "./Medal4.png";

function Homepage({ user }) {
  const avatarStyle = {
    width: "150px",
    height: "150px",
    marginTop: "20px",
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
  };

  const borderStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "2px solid black",
    zIndex: -1,
  };

  const imageStyle = {
    ...avatarStyle,
    margin: "2px",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box>
        <Typography
          marginTop="40px"
          variant="h4"
          style={{
            fontWeight: "bold",
            color: "white",
            fontFamily: "'Lora', serif",
            fontSize: "4rem",
          }}
        >
          {user.username} the {user.avatar}
        </Typography>

        {user.avatar === "Wizard" && (
          <div style={avatarStyle}>
            <div style={borderStyle}></div>
            <img src={Wizard} alt="Wizard Avatar" style={imageStyle} />
          </div>
        )}
        {user.avatar === "Monk" && (
          <div style={avatarStyle}>
            <div style={borderStyle}></div>
            <img src={Monk} alt="Monk Avatar" style={imageStyle} />
          </div>
        )}
        {user.avatar === "Explorer" && (
          <div style={avatarStyle}>
            <div style={borderStyle}></div>
            <img src={Explorer} alt="Explorer Avatar" style={imageStyle} />
          </div>
        )}
        {user.avatar === "Knight" && (
          <div style={avatarStyle}>
            <div style={borderStyle}></div>
            <img src={Knight} alt="Knight Avatar" style={imageStyle} />
          </div>
        )}
        <AverageTime userId={user.id} />
        <UniqueIntegersCount userId={user.id} />
      </Box>
    </div>
  );
}

export default Homepage;
