import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
// import Score from './components/Score';
import HighScores from './components/HighScores';

function App() {
  const [score, setScore] = useState(0); 
  const onQuizComplete = (finalScore) => {
    setScore(finalScore); 
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz onQuizComplete={onQuizComplete} />} />
        {/* <Route path="/score" element={<Score score={score} />} /> */}
        <Route path="/high-scores" element={<HighScores />} />
      </Routes>
    </Router>
  );
}

export default App;
