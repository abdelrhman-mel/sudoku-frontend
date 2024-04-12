import React, { useEffect } from "react";

const SudokuGrid = ({ puzzle, onChange }) => {
  const handleCellChange = (rowIndex, colIndex, value) => {
    onChange(rowIndex, colIndex, value);
  };
  return (
    <div className="justify-center items-center ml-4">
      {puzzle.map((row, rowIndex) => (
        <div className={`flex justify-center items-center`} key={rowIndex}>
          {row.map((cell, colIndex) => (
            <input
              type="text"
              className={`sudoku-cell w-16 h-16 w-text-center border border-gray-950 rounded-md m-0.5 text-center text-lg font-bold ${
                (colIndex + 2) % 3 === 2 ? "border-l-4" : ""
              } ${rowIndex % 3 === 2 ? "border-b-4" : ""} ${
                cell === 0 ? "bg-slate-500" : ""
              }`}
              value={cell === 0 ? "" : cell}
              onChange={(e) =>
                handleCellChange(rowIndex, colIndex, e.target.value)
              }
              key={colIndex}
              disabled={cell !== 0}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
