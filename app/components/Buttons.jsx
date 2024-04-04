import React from "react";

const Buttons = ({ onNewGame, onSubmit }) => {
  return (
    <div
      className="buttons"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <button
        onClick={onNewGame}
        className="btn"
        style={{
          backgroundColor: "blue",
          color: "white",
          marginRight: "10px",
          borderRadius: "5px",
          height: "40px",
          width: "100px",
        }}
      >
        New Game
      </button>
      <button
        onClick={onSubmit}
        className="btn"
        style={{
          backgroundColor: "green",
          color: "white",
          borderRadius: "5px",
          height: "40px",
          width: "100px",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default Buttons;
