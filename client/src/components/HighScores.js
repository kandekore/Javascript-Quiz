import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HighScores() {
  const [highScores, setHighScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHighScores() {
      const response = await fetch('https://jsquiz-306434aa7ec8.herokuapp.com/api/scores/highscores');
      const data = await response.json();
      setHighScores(data);
    }

    fetchHighScores();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">High Scores</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Score</th>
          </tr>
        </thead>
        <tbody>
          {highScores.map((score, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{score.username}</td>
              <td>{score.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate('/')}>Take Quiz Again</button>
      </div>
      <br></br>
    </div>
  );
}

export default HighScores;
