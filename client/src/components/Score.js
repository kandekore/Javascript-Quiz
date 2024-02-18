import React, { useState } from 'react';

function Score({ score, onScoreSubmit }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
   
    onScoreSubmit();
  };

  return (
    <div>
      <h2>Your Score: {score}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit Score</button>
      </form>
    </div>
  );
}

export default Score;
