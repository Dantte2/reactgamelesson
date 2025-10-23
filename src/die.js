import React from "react";
import './index.css';


function Die(props) {
  return (
    <button
      className={`die ${props.isHeld ? "held" : ""}`}
      onClick={props.toggleHold}
    >
      {props.value}
    </button>
  );
}

export default Die;