  import React, { useState, useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';
  import './css/Quiz.css';
  import { gql, useQuery } from '@apollo/client';

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
    
      // Shuffle questions and their answers
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

    if (loading) return <p>Loading questions...</p>;
    if (error) return <p>Error loading questions!</p>;

    return (
      <div className='content'>
      
      {!isQuizStarted && !reviewMode && (
      <div className="welcome-text">
        <h2>Welcome to the Ultimate JavaScript Quiz!</h2>
        <strong>What you need to know:</strong> 

<ol><li>Face a mix of questions covering a wide range of JavaScript topics.</li>
<li>Keep an eye on the timer! You've got limited time to prove your expertise.</li>
<li>Wrong answers? They come with a twist – a 10-second penalty to keep you on your toes.</li>
<li>Correct answers boost your score, and detailed explanations help you learn as you go.</li></ol>
        <p>Test your skills and challenge yourself. Press the <strong>Start Quiz</strong> button when you're ready!</p>
      
      </div>
    )}

    {isQuizStarted ? (
      <>
        <div className="countdown-grid">
          <h2>Time Left: {timeLeft} seconds</h2>
        </div>
        <div id="question-container">
          <div id="question">{questions[currentQuestionIndex].question}</div>
          <div id="answer-buttons" className="btn-grid">
            {questions[currentQuestionIndex].answers.map((answer, index) => (
              <button key={index} className="btn" onClick={() => handleAnswer(answer)}>
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      </>
        ) : reviewMode ? (
          <div>
            <h2>Your Score: {score}</h2>
            <div>
              <input
                type="text"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <button className="save" onClick={saveScore}>Save Score</button>
            </div>
            <h3>Review Answers</h3>
            {selectedAnswers.map((item, index) => (
              <div key={index}>
                <p><strong>Question:</strong> {item.question}</p>
                <p><strong>Your answer:</strong> {item.selectedAnswer} {item.correct ? '✅' : '❌'}</p>
                {!item.correct && <p><i><strong>Explanation:</strong> {item.explanation}</i></p>
              
                }{ <p className='break'> ---- </p>}
              </div>
            ))}
            <button className="btn" onClick={startQuiz}>Restart Quiz</button>
          </div>
        ) : (
          <button className="btn start" onClick={startQuiz}>Start Quiz</button>
        )}
      </div>
    );
  }

  export default Quiz;
