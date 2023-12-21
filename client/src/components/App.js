// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography, Container } from "@mui/material";
import Signup from "./Signup";
import BattleMode from "./BattleMode";
import Highscores from "./Highscores";
import GameComponent from "./GameComponent";
import AverageTime from "./AverageTime";
import UniqueIntegersCount from "./UniqueIntegersCount";
import EditEmail from "./EditEmail";
import Homepage from "./Homepage";
import Title from "./Title.png";
import Tagline from "./Tagline.png";
import About from "./About"; // Import the About component

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/v1/authorized")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("User not found");
        }
      })
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          setUser(null);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteUser() {
    // Show confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );

    // If user confirms, proceed with the deletion
    if (isConfirmed) {
      fetch(`/delete/${user.id}`, {
        method: "DELETE",
      })
        .then((resp) => {
          if (resp.ok) {
            setUser(null);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  if (!user) {
    return <Signup setUser={setUser} />;
  }

  return (
    <Router>
      <div>
        <AppBar position="static" style={{ backgroundColor: "maroon" }}>
          <Container>
            <Toolbar>
              <img
                src={Title}
                alt="My Title"
                style={{ width: "auto", height: "40px", marginRight: "20px" }}
              />
              <Typography variant="h6"></Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/new-game">
                Battle Mode
              </Button>
              <Button color="inherit" component={Link} to="/high-scores">
                High Scores
              </Button>
              <Button color="inherit" component={Link} to="/about">
                About
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
              <Button color="inherit" component={Link} to="/edit-email">
                Edit Email
              </Button>
              <Button color="inherit" onClick={handleDeleteUser}>
                Delete Active User
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
        <Container>
          <Switch>
            <Route path="/new-game" component={BattleMode} />
            <Route path="/high-scores" component={Highscores} />
            <Route path="/game">
              <GameComponent user={user} />
            </Route>
            <Route path="/edit-email">
              <EditEmail user={user} setUser={setUser} />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <Homepage user={user} />
            </Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
