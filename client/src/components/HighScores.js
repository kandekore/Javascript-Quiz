import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

function HighScores() {
    const [highScores, setHighScores] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
   
        const fetchHighScores = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/scores/highscores');
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

 
    const handleRestartQuiz = () => {
        navigate('/'); 
    };

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
            <button onClick={handleRestartQuiz}>Restart Quiz</button> 
        </div>
    );
}

export default HighScores;
