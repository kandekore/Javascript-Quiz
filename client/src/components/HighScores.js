import React, { useState, useEffect } from 'react';

function HighScores() {
    const [highScores, setHighScores] = useState([]);

    useEffect(() => {
        // Fetch high scores from the backend
        const fetchHighScores = async () => {
            try {
                const response = await fetch('YOUR_BACKEND_ENDPOINT/api/scores/highscores');
                if (response.ok) {
                    const scores = await response.json();
                    setHighScores(scores);
                } else {
                    console.error("Failed to fetch high scores");
                }
            } catch (error) {
                console.error("Error fetching high scores:", error);
            }
        };

        fetchHighScores();
    }, []);

    return (
        <div>
            <h2>High Scores</h2>
            {highScores.length > 0 ? (
                <ul>
                    {highScores.map((score, index) => (
                        <li key={index}>{score.username}: {score.score}</li>
                    ))}
                </ul>
            ) : (
                <p>No high scores available.</p>
            )}
        </div>
    );
}

export default HighScores;
