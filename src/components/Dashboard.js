import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flashcards');
        setFlashcards(response.data);
      } catch (error) {
        console.error('Error fetching flashcards:', error);
      }
    };

    fetchFlashcards();
  }, []);

  const handleAddFlashcard = async () => {
    if (editingCard) {
      // Update existing flashcard
      try {
        const updatedCard = { ...editingCard, question, answer };
        await axios.put(`http://localhost:5000/api/flashcards/${updatedCard.id}`, updatedCard);
        setFlashcards(flashcards.map(card => card.id === updatedCard.id ? updatedCard : card));
        setEditingCard(null);
      } catch (error) {
        console.error('Error updating flashcard:', error);
      }
    } else {
      // Add new flashcard
      try {
        const newCard = { question, answer };
        const response = await axios.post('http://localhost:5000/api/flashcards', newCard);
        setFlashcards([...flashcards, response.data]);
      } catch (error) {
        console.error('Error adding flashcard:', error);
      }
    }
    setQuestion('');
    setAnswer('');
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flashcards/${id}`);
      setFlashcards(flashcards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleEditFlashcard = (card) => {
    setQuestion(card.question);
    setAnswer(card.answer);
    setEditingCard(card);
  };

  return (
    <div className="container mx-auto p-8 bg-gradient-to-br from-purple-200 via-pink-100 to-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 transition-transform duration-300 transform hover:scale-105">
        Flashcard Dashboard
      </h2>
      
      <div className="flashcard-form mb-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-200 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add or Edit Flashcard</h3>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter Question"
          className="block w-full p-4 mb-3 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm transition-shadow duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter Answer"
          className="block w-full p-4 mb-5 border border-gray-300 rounded-md bg-white text-gray-800 shadow-sm transition-shadow duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button 
          onClick={handleAddFlashcard}
          className="px-5 py-3 bg-gradient-to-r from-teal-500 to-teal-400 text-white font-bold rounded-md shadow-md transition-all duration-300 hover:from-teal-600 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {editingCard ? 'Update Flashcard' : 'Add Flashcard'}
        </button>
      </div>

      <div className="flashcard-list">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Flashcard List</h3>
        <ul className="list-disc pl-6">
          {flashcards.map(card => (
            <li key={card.id} className="flex items-center justify-between mb-4 p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg">
              <span className="text-gray-700 font-medium">{card.question} - <span className="text-gray-500">{card.answer}</span></span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditFlashcard(card)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-400 to-indigo-300 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:from-indigo-500 hover:to-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteFlashcard(card.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white font-semibold rounded-md shadow-md transition-all duration-300 hover:from-red-600 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
