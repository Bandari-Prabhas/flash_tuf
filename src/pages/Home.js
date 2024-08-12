// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-700 shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center">
            <img
              src="/path/to/your/logo.png" // Update with the path to your logo
              alt="Logo"
              className="h-12 w-12 mr-3 transition-transform transform hover:scale-110"
            />
            <span className="text-white text-2xl font-semibold tracking-wide">
              Flashcard Learning Tool
            </span>
          </div>
          <div className="flex space-x-6">
            <Link
              to="/flashcard-viewer"
              className="text-white text-lg hover:bg-blue-800 px-4 py-2 rounded-md transition-all duration-200"
            >
              Flashcard Viewer
            </Link>
            <Link
              to="/admin-dashboard"
              className="text-white text-lg hover:bg-blue-800 px-4 py-2 rounded-md transition-all duration-200"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
        <div className="text-center text-white p-8 bg-opacity-70 bg-gray-800 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to the Flashcard Learning Tool
          </h2>
          <p className="text-lg mb-6">
            Explore and learn with our interactive flashcards.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/flashcard-viewer"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Start Learning
            </Link>
            <Link
              to="/admin-dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
