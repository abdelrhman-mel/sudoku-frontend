// These styles apply to every route in the application
import "./globals.css";

export const metadata = {
  title: "Sudoku Game",
  description: "A Sudoku game built with React and Express",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
