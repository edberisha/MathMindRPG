import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "./Signup.css";
import TitleImage from "./Title.png";
import Wizard from "./Wizard.png";
import Explorer from "./Explorer.png";
import Monk from "./Monk.png";
import AvatarSelector from "./AvatarSelector";
import Tagline from "./Tagline.png";
import Knight from "./Knight.png";
import Bow from "./Bow.png";
import CursedBook from "./CursedBook.png";
import Key from "./Key.png";
import CrystalBall from "./CrystalBall.png";

function Signup({ setUser }) {
  const [signup, setSignup] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const signupSchema = yup.object().shape({
    username: yup
      .string()
      .min(6, "Username must be at least 6 characters!")
      .max(14, "Username must be less than 15 characters!")
      .required("Required!"),
    email: yup.string().email("Invalid email"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters!")
      .max(14, "Password must be less than 15 characters!")
      .required("Required!"),
    passwordConfirmation: yup
      .string()
      .required("Confirm Password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      const endpoint = signup ? "/users" : "/login";
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...values, avatar: selectedAvatar }),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then(({ user }) => {
            setUser(user);
          });
        } else {
          console.log("errors? handle them");
        }
      });
    },
  });

  const toggleSignup = () => {
    setSignup((currentSignup) => !currentSignup);
  };

  const handleAvatarChange = (e) => {
    setSelectedAvatar(e.target.value);
  };

  return (
    <Box
      className="signup-container"
      style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
    >
      <img
        src={TitleImage}
        alt="My Title"
        style={{
          width: "auto",
          height: "78px",
          margin: "20px auto",
          display: "block",
        }}
      />
      <img
        src={Tagline}
        alt="My Tagline"
        style={{
          width: "auto",
          height: "35px",
          marginTop: "10px",
          display: "block",
          margin: "0 auto",
        }}
      />
      <ul className="error-list">
        {Object.keys(formik.errors).map((key, index) => (
          <li key={index}>
            {key} {formik.errors[key]}
          </li>
        ))}
      </ul>
      <Button
        className="toggle-button"
        onClick={toggleSignup}
        style={{ marginBottom: "50px", color: "white" }}
      >
        {signup
          ? "User Login - Click Here"
          : "Create Your Character - Click Here"}
      </Button>
      <form
        className="signup-form"
        onSubmit={formik.handleSubmit}
        style={{ maxWidth: "300px", margin: "0 auto" }}
      >
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          error={!!formik.errors.username}
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          style={{ maxWidth: "100%", width: "100%" }}
        />
        {signup && (
          <>
            <FormControl style={{ maxWidth: "100%", width: "100%" }}>
              <InputLabel htmlFor="email" style={{ color: "white" }}>
                Email address
              </InputLabel>
              <OutlinedInput
                id="email"
                variant="outlined"
                error={!!formik.errors.email}
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                style={{ marginTop: "10px", color: "white" }}
              />
            </FormControl>
          </>
        )}
        <FormControl style={{ maxWidth: "100%", width: "100%" }}>
          <InputLabel htmlFor="password" style={{ color: "white" }}>
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            type="password"
            variant="outlined"
            error={!!formik.errors.password}
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            name="password"
            label="Input Password"
            style={{ marginTop: "10px", color: "white" }}
          />
        </FormControl>
        <FormControl style={{ maxWidth: "100%", width: "100%" }}>
          <InputLabel htmlFor="passwordConfirmation" style={{ color: "white" }}>
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="passwordConfirmation"
            type="password"
            variant="outlined"
            error={!!formik.errors.passwordConfirmation}
            required
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            style={{ marginTop: "10px", color: "white" }}
          />
        </FormControl>
        {signup && (
          <AvatarSelector
            selectedAvatar={selectedAvatar}
            onChange={handleAvatarChange}
            style={{ marginTop: "20px" }}
          />
        )}
        {signup && selectedAvatar && (
          <img
            src={
              selectedAvatar === "Wizard"
                ? Wizard
                : selectedAvatar === "Monk"
                ? Monk
                : selectedAvatar === "Explorer"
                ? Explorer
                : Knight
            }
            alt="Selected Avatar"
            style={{
              width: "100px",
              height: "100px",
              marginTop: "20px",
              display: "block",
              margin: "0 auto",
            }}
          />
        )}
        <Button
          className="submit-button"
          variant="contained"
          type="submit"
          style={{ backgroundColor: "maroon", marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Signup;
