import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Quiz.css';
import { gql, useQuery } from '@apollo/client';
import jslogo from '../images/logo192.png';

export const GET_QUESTIONS = gql`
  query GetQuestions {
    questions {
      id
      question
      answers {
        text
        correct
      }
      explanation
    }
  }
`;

function Quiz({ onQuizComplete }) {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_QUESTIONS);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [username, setUserName] = useState('');
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      const shuffledQuestions = data.questions.map(q => ({
        ...q,
        answers: shuffleArray(q.answers)
      }));
      setQuestions(shuffledQuestions);
    }
  }, [data, loading]);

  useEffect(() => {
    let timer = null;
    if (isQuizStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft <= 0) {
      endQuiz();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isQuizStarted]);

  const shuffleArray = (array) => {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  };

  const startQuiz = () => {
    localStorage.removeItem('quizAnswers');
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setTimeLeft(60);
    setScore(0);
    setUserName('');
    setIsQuizStarted(true);
    setReviewMode(false);

    if (!loading && data) {
      const shuffledQuestions = shuffleArray(data.questions.map(q => ({
        ...q,
        answers: shuffleArray(q.answers)
      })));
      setQuestions(shuffledQuestions);
    }
  };

  const handleAnswer = (answer) => {
    const question = questions[currentQuestionIndex];
    const isCorrect = answer.correct;
    setSelectedAnswers(prev => [...prev, { question: question.question, selectedAnswer: answer.text, correct: isCorrect, explanation: question.explanation }]);

    if (isCorrect) {
      setScore(score + 1);
    } else {
      setTimeLeft(timeLeft >= 10 ? timeLeft - 10 : 0);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      endQuiz();
    }
  };

  const endQuiz = () => {
    setIsQuizStarted(false);
    setReviewMode(true);
    localStorage.setItem('quizAnswers', JSON.stringify(selectedAnswers));
  };

  const saveScore = async () => {
    console.log('Attempting to save score', score, 'for user', username);

    const endpoint = 'https://javascripttest.com/api/scores';
    const scoreData = { username, score };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(scoreData),
      });

      if (!response.ok) {
        console.error('Failed to save score, server responded with:', response.status, response.statusText);
        alert('Failed to save score. Please try again.');
        return;
      }

      const responseData = await response.json();
      console.log('Score saved successfully:', responseData);

      alert('Score saved successfully.');
      navigate('/high-scores');
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Error saving score. Please check the console for more information.');
    }
  };

  if (loading) return <p className="quiz-loading">Loading questions...</p>;
  if (error) return <p className="quiz-loading">Error loading questions!</p>;

  if (isQuizStarted && questions.length === 0) {
    return <p className="quiz-loading">Loading questions...</p>;
  }

  // SVG circle circumference for r=44: 2 * π * 44 ≈ 276.46
  const circumference = 276.46;
  const timerOffset = circumference * (1 - timeLeft / 60);

  return (
    <div className="content">

      {!isQuizStarted && !reviewMode && (
        <div className="welcome-hero">
          <div className="welcome-card">
            <div className="welcome-logo-wrap">
              <img src={jslogo} className="welcome-js-logo" alt="JavaScript" />
            </div>
            <h1 className="welcome-title">JavaScript Quiz</h1>
            <p className="welcome-subtitle">Test your JavaScript knowledge</p>
            <div className="rules-list">
              <div className="rule-item">
                <span className="rule-number">1</span>
                <span>Face a mix of questions covering a wide range of JavaScript topics.</span>
              </div>
              <div className="rule-item">
                <span className="rule-number">2</span>
                <span>Keep an eye on the timer! You've got limited time to prove your expertise.</span>
              </div>
              <div className="rule-item">
                <span className="rule-number">3</span>
                <span>Wrong answers come with a twist — a 10-second penalty to keep you on your toes.</span>
              </div>
              <div className="rule-item">
                <span className="rule-number">4</span>
                <span>Correct answers boost your score, and detailed explanations help you learn as you go.</span>
              </div>
            </div>
            <button className="btn-primary-action" onClick={startQuiz}>Start Quiz</button>
          </div>
        </div>
      )}

      {isQuizStarted ? (
        <>
          <div className="timer-container">
            <div className={`timer-circle${timeLeft <= 10 ? ' timer-urgent' : ''}`}>
              <svg viewBox="0 0 100 100" className="timer-svg">
                <circle cx="50" cy="50" r="44" className="timer-track" />
                <circle
                  cx="50" cy="50" r="44"
                  className="timer-progress"
                  style={{ strokeDashoffset: timerOffset }}
                />
              </svg>
              <div className="timer-text">
                <span className="timer-number">{timeLeft}</span>
                <span className="timer-label">sec</span>
              </div>
            </div>
          </div>
          <div id="question-container">
            <div id="question">{questions[currentQuestionIndex].question}</div>
            <div id="answer-buttons" className="btn-grid">
              {questions[currentQuestionIndex].answers.map((answer, index) => (
                <button key={index} className="answer-btn" onClick={() => handleAnswer(answer)}>
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : reviewMode ? (
        <div className="results-container">
          <div className="score-reveal">
            <div className="score-badge">
              <span className="score-number">{score}</span>
              <span className="score-label">points</span>
            </div>
            <h2 className="results-title">Quiz Complete!</h2>
          </div>
          <div className="save-score-section">
            <input
              type="text"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="name-input"
            />
            <button className="btn-save" onClick={saveScore}>Save Score</button>
          </div>
          <div className="review-section">
            <h3>Answer Review</h3>
            {selectedAnswers.map((item, index) => (
              <div key={index} className={`review-item${item.correct ? ' review-correct' : ' review-wrong'}`}>
                <div className="review-question">
                  <span className="review-icon">{item.correct ? '✅' : '❌'}</span>
                  <strong>{item.question}</strong>
                </div>
                <p className="review-answer">Your answer: {item.selectedAnswer}</p>
                {!item.correct && (
                  <p className="review-explanation"><strong>Explanation:</strong> {item.explanation}</p>
                )}
              </div>
            ))}
          </div>
          <button className="btn-primary-action" onClick={startQuiz}>Restart Quiz</button>
        </div>
      ) : null}
    </div>
  );
}

export default Quiz;
