import React, { useState } from 'react';
import './index.css';
import Die from './die';

export default function App() {

  function generateAllNewDice() {
    return Array.from({ length: 10 }, () => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false
    }));
  }

  const [dice, setDice] = useState(generateAllNewDice());

  function rollDice() {
    setDice(oldDice =>
      oldDice.map(die =>
        die.isHeld ? die : { value: Math.floor(Math.random() * 6) + 1, isHeld: false }
      )
    );
  }

  function toggleHold(index) {
    setDice(oldDice =>
      oldDice.map((die, i) =>
        i === index ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((die, index) => (
    <Die
      key={index}
      value={die.value}
      isHeld={die.isHeld}
      toggleHold={() => toggleHold(index)}
    />
  ));

  return (
    <main>
      <div className="outer-box">
        <div className="inner-box">
          <div className="dice-container">
            {diceElements}
          </div>
          <button className="roll-button" onClick={rollDice}>
            Roll Dice
          </button>
        </div>
      </div>
    </main>
  );
}
