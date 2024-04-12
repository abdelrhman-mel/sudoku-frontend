"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import "../../globals.css";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform sign in logic here
    // You can use axios to make a POST request to your backend API
    console.log(username, password);
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/api/signup`, {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        // Handle successful sign in
        // save the token to the local storage
        localStorage.setItem("token", response.data.token);
        //redirect the user to the game page
        window.location.href = "/sudoku";
      })
      .catch((error) => {
        //make a alert message to the user with the backend response
        alert("Invalid credentials");
        console.log(error);
      });
  };

  return (
    <>
      <form className="flex flex-col items-center">
        <h1 className="text-4xl">Sudoku</h1>
        <div className="mb-4 mt-4">
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Up
        </button>
        <p>
          Already signed up?{" "}
          <Link href="/signin" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </form>
    </>
  );
};

export default SignInPage;
