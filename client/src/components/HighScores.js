import React, { useState, useEffect } from 'react';

function HighScores() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <div>
      <h2>High Scores</h2>
      <ul>
        {highScores.map((score, index) => (
          <li key={index}>{score.username}: {score.score}</li>
        ))}
      </ul>
    </div>
  );
}

export default HighScores;
