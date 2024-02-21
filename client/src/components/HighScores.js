import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HighScores() {
    const [highScores, setHighScores] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
        // Fetch high scores from the backend
        const fetchHighScores = async () => {
            try {
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000'; // Dynamic API URL
                const response = await fetch(`${apiUrl}/api/scores/highscores`);
                if (response.ok) {
                    const scores = await response.json();
                    setHighScores(scores);
                } else {
                    console.error("Failed to fetch high scores");
                    setError('Failed to fetch high scores.');
                }
            } catch (error) {
                console.error("Error fetching high scores:", error);
                setError('Error fetching high scores.');
            }
        };

        fetchHighScores();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">High Scores</h1>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
