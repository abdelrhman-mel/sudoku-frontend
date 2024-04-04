import React from "react";

const SudokuGrid = ({ puzzle, onChange }) => {
  const handleCellChange = (rowIndex, colIndex, value) => {
    onChange(rowIndex, colIndex, value);
  };

  return (
    <div className="sudoku-grid justify-center items-center">
      {puzzle.map((row, rowIndex) => (
        <div
          className={`flex ${rowIndex % 3 === 2 ? "border-b-2" : ""}`}
          key={rowIndex}
        >
          {row.map((cell, colIndex) => (
            <input
              type="text"
              className={`sudoku-cell w-16 h-16 w-text-center border border-gray-300 rounded-md m-0.5 text-center text-lg font-bold ${
                colIndex % 3 === 0 || rowIndex % 3 === 0
                  ? "border-l-8 border-t-8 border-r-8"
                  : ""
              }`}
              value={cell === 0 ? "" : cell}
              onChange={(e) =>
                handleCellChange(rowIndex, colIndex, e.target.value)
              }
              key={colIndex}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
