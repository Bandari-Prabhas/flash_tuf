import React, { useState, useEffect } from "react";
import axios from "axios";

function FlashcardViewer() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    // Fetch multiple-choice questions from the Open Trivia Database API
    axios
      .get("https://opentdb.com/api.php?amount=10&type=multiple")
      .then((response) => {
        // Map the API response to a format suitable for flashcards
        const formattedFlashcards = response.data.results.map((item) => {
          const allAnswers = [...item.incorrect_answers, item.correct_answer];
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
          
          return {
            question: item.question,
            correctAnswer: item.correct_answer,
            answers: shuffledAnswers, // Ensure answers are included
          };
        });
        setFlashcards(formattedFlashcards);
      })
      .catch((error) => console.error("Error fetching flashcards:", error));
  }, []);

  const handleFlip = () => setFlipped(!flipped);

  const nextCard = () => {
    if (flashcards.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
      setFlipped(false); // Reset flip state when changing cards
    }
  };

  const prevCard = () => {
    if (flashcards.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
      );
      setFlipped(false); // Reset flip state when changing cards
    }
  };

  // Log flashcards data for debugging
  console.log(flashcards);

  // Check if the current flashcard and its answers are available
  const currentFlashcard = flashcards[currentIndex] || {};
  const { question = '', answers = [], correctAnswer = '' } = currentFlashcard;

  return (
    <div className="flashcard-viewer min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      {flashcards.length > 0 ? (
        <div
          className={`flashcard relative bg-white shadow-xl rounded-lg p-10 w-96 h-64 flex items-center justify-center cursor-pointer transform transition-transform duration-500 ease-in-out ${
            flipped ? "rotate-y-180" : ""
          }`}
          onClick={handleFlip}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`front text-2xl font-bold ${flipped ? "hidden" : "block"} text-blue-800`}>
              {question}
              <ul className="mt-4 list-disc list-inside">
                {answers.map((answer, index) => (
                  <li key={index} className="text-lg text-gray-800">{answer}</li>
                ))}
              </ul>
            </div>
            <div className={`back text-2xl font-bold ${flipped ? "block" : "hidden"} text-purple-800`}>
              Correct Answer: {correctAnswer}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white text-xl">Loading flashcards...</div>
      )}
      <div className="controls flex justify-between mt-8 w-64">
        <button
          onClick={prevCard}
          className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition duration-300"
          disabled={flashcards.length === 0}
        >
          Previous
        </button>
        <button
          onClick={nextCard}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300"
          disabled={flashcards.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default FlashcardViewer;
