import React, { useState, useEffect } from "react";
import GameComponent from "./GameComponent";
import Bow from "./Bow.png";
import CursedBook from "./CursedBook.png";
import Key from "./Key.png";
import CrystalBall from "./CrystalBall.png";
import Staff from "./Staff.png";
import Shield from "./Shield.png";
import Quill from "./Quill.png";
import Book from "./Book.png";

const BattleMode = () => {
  const [user, setUser] = useState(null);
  const [startGame, setStartGame] = useState(false);

  useEffect(() => {
    fetch("/authorized")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error("User not authenticated");
        }
      })
      .then((user) => setUser(user))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleStartGame = () => {
    setStartGame(true);
  };

  const imageSize = {
    width: "150px",
    height: "150px",
    marginRight: "10px",
    marginBottom: "20px",
    marginTop: "20px",
  };

  const buttonStyle = {
    width: "200px",
    height: "50px",
    marginBottom: "20px",
    marginTop: "20px",
  };

  return (
    <div style={{ marginTop: "70px", textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={Bow} alt="Bow" style={imageSize} />
        <img src={CursedBook} alt="CursedBook" style={imageSize} />
        <img src={CrystalBall} alt="CrystalBall" style={imageSize} />
        <img
          src={Key}
          alt="Key"
          style={{ ...imageSize, marginBottom: "0px" }}
        />
      </div>

      {user && (
        <div>
          {!startGame ? (
            <button onClick={handleStartGame} style={buttonStyle}>
              Start Game
            </button>
          ) : (
            <GameComponent user={user} />
          )}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src={Staff} alt="Staff" style={imageSize} />
        <img src={Shield} alt="Shield" style={imageSize} />
        <img src={Quill} alt="Quill" style={imageSize} />
        <img src={Book} alt="Book" style={imageSize} />
      </div>
    </div>
  );
};

export default BattleMode;
