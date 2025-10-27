import React, { useState, useEffect } from 'react';
import './index.css';
import Die from './die';
import Confetti from 'react-confetti';

// Custom hook to track window size for full-screen confetti
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default function App() {

  function generateAllNewDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: crypto.randomUUID()
    }));
  }

  const [dice, setDice] = useState(generateAllNewDice());
  const [tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function rollDice() {
    if (tenzies) {
      // Reset game
      setDice(generateAllNewDice());
      setTenzies(false);
    } else {
      setDice(oldDice =>
        oldDice.map(die =>
          die.isHeld
            ? die
            : { ...die, value: Math.floor(Math.random() * 6) + 1 }
        )
      );
    }
  }

  function toggleHold(id) {
    setDice(oldDice =>
      oldDice.map(die =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      toggleHold={() => toggleHold(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={400}
          gravity={0.4}
          recycle={false}
        />
      )}
      <div className="outer-box">
        <div className="inner-box">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
          </p>
          <div className="dice-container">
            {diceElements}
          </div>
          <button className="roll-button" onClick={rollDice}>
            {tenzies ? "New Game" : "Roll Dice"}
          </button>
          {tenzies && <h2 className="win-message">🎉 You Won! 🎉</h2>}
        </div>
      </div>
    </main>
  );
}
