"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboards = () => {
  const [topScores, setTopScores] = useState([]);
  useEffect(() => {
    const fetchLeaderBoard = async () => {
      // Logic to fetch the leaderboard
      const response = await axios
        .get("http://164.92.175.112:5000/api/sudoku/scores")
        .then((response) => {
          console.log(response);
          setTopScores(response.data.scores);
        })
        .catch((error) => {
          // Handle sign in error
          //make a alert message to the user with the backend response
          alert(error);
        });
    };
    fetchLeaderBoard();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboards</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">Username</th>
            <th className="p-2 border">Time</th>
          </tr>
        </thead>
        <tbody>
          {topScores.map((score, index) => (
            <tr key={index}>
              <td className="p-2 border">{score.username}</td>
              <td className="p-2 border">{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboards;
