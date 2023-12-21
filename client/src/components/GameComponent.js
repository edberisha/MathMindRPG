import React, { useState, useEffect } from "react";

const GameComponent = ({ user }) => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [product, setProduct] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timersFrozen, setTimersFrozen] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  useEffect(() => {
    generateRandomNumbers();
  }, [gameStarted]);

  const generateRandomNumbers = () => {
    const num1 = Math.floor(Math.random() * 90) + 10;
    const num2 = Math.floor(Math.random() * 90) + 10;
    const prod = num1 * num2;
    setNumber1(num1);
    setNumber2(num2);
    setProduct(prod);
    setGameStarted(true);
    startTimer();
  };

  const startTimer = () => {
    let seconds = 0;
    const interval = setInterval(() => {
      if (!timersFrozen) {
        seconds += 1;
        setTimer(seconds);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseInt(userAnswer) === product) {
      setIsCorrect(true);
      setGameStarted(false);
      setTimersFrozen(true);

      const currentResponseTime = timer;
      setResponseTime(currentResponseTime);

      const timeData = { time_value: currentResponseTime };
      fetch("/times", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timeData),
      })
        .then((resp) => resp.json())
        .then((time) => {
          const gameData = {
            user_id: user.id,
            time_id: time.id,
            first_integer: number1,
            second_integer: number2,
            time_taken: currentResponseTime,
          };
          return fetch("/games", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(gameData),
          });
        })
        .then((resp) => resp.json())
        .then((game) => {
          console.log("Game recorded:", game);
        });
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
      <h2></h2>
      {gameStarted && !isCorrect && (
        <div>
          <p style={{ fontSize: "40px" }}>
            Solve: {number1} x {number2}
          </p>
          <p style={{ fontSize: "20px" }}>Timer: {timer} seconds</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
            <button style={{ marginLeft: '10px' }} type="submit">Submit</button>
          </form>
        </div>
      )}
      {isCorrect && (
        <p style={{ fontSize: "40px" }}>
          Correct! Response time: {responseTime} seconds
        </p>
      )}
    </div>
  );
};

export default GameComponent;
