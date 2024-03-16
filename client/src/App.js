import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
// import Score from './components/Score';
import HighScores from './components/HighScores';
import Header from './components/Header';
import Footer from './components/Footer';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Helmet } from 'react-helmet';


function App() {
  const [score, setScore] = useState(0); 
  const onQuizComplete = (finalScore) => {
    setScore(finalScore); 
  };

  return (
    <>
    <Router>
    <Helmet>
          <title>JavaScript Quiz & Leader Board</title>
          <meta name="description" content="Face a mix of questions covering a wide range of JavaScript topics. Keep an eye on the timer! You've got limited time to prove your expertise. Wrong answers? They come with a twist – a 10-second penalty to keep you on your toes. Correct answers boost your score, and detailed explanations help you learn as you go." />
          
        </Helmet>
    <Header />
    <div className='main-content'>
      <Routes>
        <Route path="/" element={<Quiz onQuizComplete={onQuizComplete} />} />
        {/* <Route path="/score" element={<Score score={score} />} /> */}
        <Route path="/high-scores" element={<HighScores />} />
      </Routes>
      </div>
      <Footer />
    </Router>
    
    </>
  );
}

export default App;
