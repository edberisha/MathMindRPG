import React from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import Monk from "./Monk.png";
import Explorer from "./Explorer.png";
import Knight from "./Knight.png";

const AvatarSelector = ({ selectedAvatar, onChange, style }) => {
  const avatarDescriptions = {
    Wizard: "A powerful sorcerer skilled in arcane arts.",
    Monk: "A disciplined and agile martial artist.",
    Explorer: "A brave adventurer exploring the unknown.",
    Knight: "A valiant knight in shining armor.",
  };

  return (
    <FormControl style={{ maxWidth: "300px", width: "100%" }}>
      <InputLabel htmlFor="avatar" style={{ color: "white" }}>
        Choose Your Avatar
      </InputLabel>
      <Select
        label="Choose Your Avatar"
        id="avatar"
        value={selectedAvatar}
        onChange={onChange}
        style={{ color: "white", ...style }}
        MenuProps={{
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          transformOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          getContentAnchorEl: null,
          PaperProps: {
            elevation: 0,
          },
        }}
      >
        <MenuItem value="Wizard">Wizard</MenuItem>
        <MenuItem value="Monk">Monk</MenuItem>
        <MenuItem value="Explorer">Explorer</MenuItem>
        <MenuItem value="Knight">Knight</MenuItem>
      </Select>
      {selectedAvatar && (
        <p style={{ color: "white", marginTop: "8px" }}>
          {avatarDescriptions[selectedAvatar]}
        </p>
      )}
    </FormControl>
  );
};

export default AvatarSelector;
