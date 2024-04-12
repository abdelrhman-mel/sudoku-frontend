"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Leaderboards = () => {
  const [topScores, setTopScores] = useState([]);
  useEffect(() => {
    const fetchLeaderBoard = async () => {
      const token = localStorage.getItem("token");
      // Logic to fetch the leaderboard
      await axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/sudoku/scores`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response);
          setTopScores(response.data.scores);
        })
        .catch((error) => {
          alert("please sign in to play the game");
          window.location.href = "/signin";
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
