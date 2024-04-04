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
      <div className="justify-center mt-7 w-full align-middle">
        <button
          className="flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button
          className="flex bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </div>
    </main>
  );
}
