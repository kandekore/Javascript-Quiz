import React, { useState } from 'react';
import Quiz from './components/Quiz';
import Score from './components/Score';
import HighScores from './components/HighScores';

function App() {
  const [page, setPage] = useState('quiz'); // 'quiz', 'score', 'highScores'
  const [score, setScore] = useState(0);

  const handleQuizComplete = (finalScore) => {
    setScore(finalScore);
    setPage('score');
  };

  const handleScoreSubmit = () => {
    setPage('highScores');
  };

  switch (page) {
    case 'quiz':
      return <Quiz onQuizComplete={handleQuizComplete} />;
    case 'score':
      return <Score score={score} onScoreSubmit={handleScoreSubmit} />;
    case 'highScores':
      return <HighScores />;
    default:
      return <div>Not Found</div>;
  }
}

export default App;
