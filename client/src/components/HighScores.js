import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HighScores.css';

function HighScores() {
    const [highScores, setHighScores] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
                const apiUrl = process.env.REACT_APP_GRAPHQL_URI || 'https://javascripttest.com/graphql';
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

    const rankMedal = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return null;
    };

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">
                <h1>Leaderboard</h1>
                <p>Top JavaScript Quiz Scores</p>
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <div className="leaderboard-list">
                {highScores.map((score, index) => (
                    <div key={index} className={`leaderboard-row${index < 3 ? ` rank-${index + 1}` : ''}`}>
                        <div className="rank-badge">
                            {rankMedal(index) ? (
                                <span className="rank-medal">{rankMedal(index)}</span>
                            ) : (
                                <span className="rank-number">{index + 1}</span>
                            )}
                        </div>
                        <div className="rank-username">{score.username}</div>
                        <div className="rank-score">{score.score}</div>
                    </div>
                ))}
            </div>
            <button className="btn-primary-action" onClick={() => navigate('/')}>Take Quiz Again</button>
        </div>
    );
}

export default HighScores;
