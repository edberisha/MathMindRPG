// About.js
import React from "react";
import { Typography, Box } from "@mui/material";
import Medal1 from "./Medal1.png";
import Medal2 from "./Medal2.png";
import Medal3 from "./Medal3.png";
import Medal4 from "./Medal4.png";
import AboutImage from "./AboutImage.png";

const medalStyle = {
  width: "70px", // Adjust the width as needed
  height: "70px", // Adjust the height as needed
  marginRight: "5px", // Optional spacing between medals
};

const listItemStyle = {
  listStyleType: "none", // Remove list bullets
};

const aboutImageStyle = {
  width: "25%", // Adjust the width as needed
  height: "auto", // Maintain aspect ratio
  marginBottom: "20px",
};

const About = () => {
  return (
    <Box style={{ textAlign: "center" }}>
      <img src={AboutImage} alt="About Image" style={aboutImageStyle} />

      <Typography variant="body1" style={{ marginBottom: "50px" }}>
        Welcome to Math Mind RPG, an exciting role-playing game that combines
        mathematical challenges with the thrill of adventure. Sharpen your math
        skills as you embark on a quest filled with numbers, equations, and
        magical challenges.
      </Typography>

      <Typography variant="body1" style={{ marginBottom: "50px" }}>
        <strong>Gameplay:</strong> In Math Mind RPG, you'll rank up your
        adventurer by solving multiplication problems in Battle Mode.
        <strong>Achievements:</strong> The more unique integers you come across,
        the more unique medals you'll receive. Try and collect them all!
      </Typography>

      <Typography
        variant="body1"
        style={{ marginBottom: "50px", ...listItemStyle }}
      >
        <strong>Features:</strong>
        <ul style={listItemStyle}>
          <li>Engaging math-based challenges</li>
          <li>Customizable characters with unique abilities</li>
          <li>Exciting quests and storylines</li>
          <li>Compete with friends on the high scores leaderboard</li>
        </ul>
      </Typography>

      <Typography variant="body1" style={{ marginBottom: "130x" }}>
        <strong>Medals:</strong>
        <img src={Medal1} alt="Medal 1" style={medalStyle} />
        <img src={Medal2} alt="Medal 2" style={medalStyle} />
        <img src={Medal3} alt="Medal 3" style={medalStyle} />
        <img src={Medal4} alt="Medal 4" style={medalStyle} />
      </Typography>

      <Typography
        variant="body1"
        style={{ marginTop: "40px", marginBottom: "30px" }}
      >
        <strong>Get Started:</strong> Create an account, choose your avatar, and
        dive into the world of Math Mind RPG. Solve problems, earn medals, and
        become a math master!
      </Typography>
    </Box>
  );
};

export default About;
