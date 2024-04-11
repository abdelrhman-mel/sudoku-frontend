"use client";
import "./globals.css";

export default function Home() {
  const handleSignIn = () => {
    // redirect the user to the sign in page
    window.location.href = "/signin";
  };
  const handleSignUp = () => {
    // redirect the user to the sign up page
    window.location.href = "/signup";
  };
  return (
    <main>
      <h1 className="text-6xl font-bold text-center mt-16">
        Welcome to Sudoku
      </h1>
      <div className="w-100 flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}
