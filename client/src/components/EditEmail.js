import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

function EditEmail({ user, setUser }) {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    if (user) {
      setCurrentUserEmail(user.email);
    }
  }, [user]);

  const handleEmailUpdate = () => {
    fetch(`users/${user.id}/update-email`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: newEmail }),
    })
      .then((resp) => {
        if (resp.ok) {
          console.log("Email updated successfully");
        } else {
          setError("Email update failed");
        }
      })
      .catch((error) => {
        setError("Error updating email");
        console.error("Error updating email:", error);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      marginTop="100px"
    >
      <Typography variant="h5" style={{ color: "white", marginBottom: "20px" }}>
        Your Current Email Address: {currentUserEmail}
      </Typography>
      <hr style={{ width: "80%", marginBottom: "50px" }} />
      <TextField
        label="Enter New Email Here"
        variant="outlined"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
        style={{ width: "40%" }}
      />
      <Button
        onClick={handleEmailUpdate}
        style={{ color: "white", marginTop: "10px" }}
      >
        Submit
      </Button>
      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </Box>
  );
}

export default EditEmail;
