"use client";
import React, { useEffect, useState } from "react";
import SudokuGrid from "../components/SudokuGrid";
import Buttons from "../components/Buttons";
import axios from "axios";
import LeaderBoards from "../components/LeaderBoards";

const IndexPage = () => {
  const [gameOver, setGameOver] = useState(false);
  const [puzzle, setPuzzle] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [timerRunning, setTimerRunning] = useState(false);
  const [win, setWin] = useState(false);
  const [seconds, setSeconds] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 0) {
          clearInterval(interval);
          handleGameOver();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const generateGame = async (e) => {
    setGameOver(false); // Reset game over status
    setTimerRunning(true); // Start the timer
    e.preventDefault();
    // Logic to fetch a new puzzle
    const token = localStorage.getItem("token");
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sudoku/puzzles`,
        {
          dif: difficulty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setPuzzle(response.data.puzzle);
        setSeconds(300);
      })
      .catch((error) => {
        //make a alert message to the user with the backend response
        alert("please sign in to play the game");
        window.location.href = "/signin";
      });
  };
  const sendScore = async () => {
    const username = localStorage.getItem("username");
    // Logic to send the score to the leaderboard
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sudoku/scores`,
        {
          username: username,
          dif: difficulty,
          score: seconds,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        //make a alert message to the user with the backend response
        alert("please sign in to play the game");
        window.location.href = "/signin";
      });
  };

  const handleSubmit = () => {
    // Logic to submit the solution
    if (isPuzzleSolved(puzzle)) {
      alert("Puzzle is solved You Win!");
      setTimerRunning(false);
      setSeconds(seconds);
      sendScore();
      //reload the page
      window.location.reload();
    } else {
      alert("Puzzle is not solved");
      setGameOver(true);
      window.location.reload();
    }
  };

  const handleCellChange = (row, col, value) => {
    //validate the input between 1 and 9
    if (value < 1 || value > 9 || isNaN(value) || value % 1 !== 0) {
      alert("Please enter a number between 1 and 9");
      return;
    }
    // Logic to update puzzle state
    // Create a copy of the puzzle array
    const updatedPuzzle = [...puzzle];
    // Update the value of the cell at the specified row and column
    updatedPuzzle[row][col] = value;
    // Update the puzzle state with the modified puzzle array
    setPuzzle(updatedPuzzle);
  };

  const handleGameOver = () => {
    setGameOver(true);
    //wait 3 seconds
    setTimeout(() => {}, 3000);
    //reload the page
    window.location.reload();
  };

  const handleDifficultyChange = (event) => {
    // Update the difficulty state when dropdown value changes
    setDifficulty(event.target.value);
  };

  const isPuzzleSolved = (puzzle) => {
    // Check rows
    for (let row = 0; row < 9; row++) {
      const rowSet = new Set();
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] === 0 || rowSet.has(puzzle[row][col])) {
          return false; // Invalid row
        }
        rowSet.add(puzzle[row][col]);
      }
    }

    // Check columns
    for (let col = 0; col < 9; col++) {
      const colSet = new Set();
      for (let row = 0; row < 9; row++) {
        if (puzzle[row][col] === 0 || colSet.has(puzzle[row][col])) {
          return false; // Invalid column
        }
        colSet.add(puzzle[row][col]);
      }
    }

    // Check 3x3 subgrids
    for (let startRow = 0; startRow < 9; startRow += 3) {
      for (let startCol = 0; startCol < 9; startCol += 3) {
        const subgridSet = new Set();
        for (let row = startRow; row < startRow + 3; row++) {
          for (let col = startCol; col < startCol + 3; col++) {
            if (puzzle[row][col] === 0 || subgridSet.has(puzzle[row][col])) {
              return false; // Invalid subgrid
            }
            subgridSet.add(puzzle[row][col]);
          }
        }
      }
    }

    return true; // Puzzle is solved
  };

  return (
    <>
      <div className="text-center justify-center items-center">
        <h1 className="text-4xl text-center mt-4 font-bold mb-3">Sudoku</h1>
        <div className="justify-center items-center">
          <SudokuGrid puzzle={puzzle} onChange={handleCellChange} />
          {timerRunning && (
            <div className="font-bold justify-center text-center text-3xl">
              Time: {seconds} seconds
            </div>
          )}
          {gameOver && <div className="game-over">Game Over</div>}
          <Buttons onNewGame={generateGame} onSubmit={handleSubmit} />
          <div className="mt-4 justify-center items-center">
            <label
              htmlFor="difficulty"
              className="mr-2 text-center justify-center font-bold"
            >
              Choose difficulty:
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
              className="px-2 py-1 border border-gray-300 rounded-md font-bold text-center justify-center"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
              <option value="insane">Insane</option>
            </select>
            <LeaderBoards />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
