import React from "react";
import { Typography, Box } from "@mui/material";
import Wizard from "./Wizard.png";
import Monk from "./Monk.png";
import Explorer from "./Explorer.png";
import AverageTime from "./AverageTime";
import UniqueIntegersCount from "./UniqueIntegersCount";

function Homepage({ user }) {
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
          <img
            src={Wizard}
            alt="Wizard Avatar"
            style={{
              width: "150px",
              height: "150px",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
        {user.avatar === "Monk" && (
          <img
            src={Monk}
            alt="Monk Avatar"
            style={{
              width: "150px",
              height: "150px",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
        {user.avatar === "Explorer" && (
          <img
            src={Explorer}
            alt="Explorer Avatar"
            style={{
              width: "150px",
              height: "150px",
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
        )}
        <AverageTime userId={user.id} />
        <UniqueIntegersCount userId={user.id} />
      </Box>
    </div>
  );
}

export default Homepage;
