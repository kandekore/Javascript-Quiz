import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './components/Quiz';
// import Score from './components/Score';
import HighScores from './components/HighScores';
import Header from './components/Header';
import Footer from './components/Footer';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [score, setScore] = useState(0); 
  const onQuizComplete = (finalScore) => {
    setScore(finalScore); 
  };

  return (
    <>
    <Header />
    <Router>
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
