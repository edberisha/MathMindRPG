import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

function EditEmail({ user, setUser }) {
  const [newEmail, setNewEmail] = useState("");
  const [error, setError] = useState("");

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
    <Box>
      <TextField
        label="New Email"
        variant="outlined"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
        InputLabelProps={{ style: { color: "white" } }}
        InputProps={{ style: { color: "white" } }}
      />
      <Button onClick={handleEmailUpdate} style={{ color: "white" }}>
        Update Email
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Box>
  );
}

export default EditEmail;
