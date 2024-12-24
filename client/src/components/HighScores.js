import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function HighScores() {
    const [highScores, setHighScores] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Create navigate function

    useEffect(() => {
        const fetchHighScores = async () => {
            const query = JSON.stringify({
                query: `{
                    highScores {
                        username
                        score
                    }
                }`
            });

            try {
                const apiUrl = process.env.REACT_APP_API_URL || 'http://0.0.0.0:4000'; // Dynamic API URL for GraphQL endpoint
                const response = await fetch(`${apiUrl}/graphql`, { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: query,
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const jsonResponse = await response.json();
                if (jsonResponse.data) {
                    setHighScores(jsonResponse.data.highScores);
                } else {
                    throw new Error('Failed to load high scores');
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
