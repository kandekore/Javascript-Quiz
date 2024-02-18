import React, { useState, useEffect } from 'react';
import './css/Quiz.css';

const initialQuestions = [
    {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      answers: [
        { text: "<script name='xxx.js'>", correct: false },
        { text: "<script src='xxx.js'>", correct: true },
        { text: "<script href='xxx.js'>", correct: false },
        { text: "<script link='xxx.js'>", correct: false },
      ],
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      answers: [
        { text: "msgBox('Hello World');", correct: false },
        { text: "alertBox('Hello World');", correct: false },
        { text: "msg('Hello World');", correct: false },
        { text: "alert('Hello World');", correct: true },
      ],
    },
    {
      question: "How do you create a function in JavaScript?",
      answers: [
        { text: "function:myFunction()", correct: false },
        { text: "function myFunction()", correct: true },
        { text: "function = myFunction()", correct: false },
        { text: "function => myFunction()", correct: false },
      ],
    },
    {
      question: "How do you call a function named 'myFunction'?",
      answers: [
        { text: "call myFunction()", correct: false },
        { text: "call function myFunction()", correct: false },
        { text: "myFunction()", correct: true },
        { text: "function myFunction()", correct: false },
      ],
    },
    {
      question: "How to write an IF statement in JavaScript?",
      answers: [
        { text: "if i = 5", correct: false },
        { text: "if i == 5 then", correct: false },
        { text: "if (i == 5)", correct: true },
        { text: "if i = 5 then", correct: false },
      ],
    },
    {
      question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
      answers: [
        { text: "if (i <> 5)", correct: false },
        { text: "if i =! 5 then", correct: false },
        { text: "if (i != 5)", correct: true },
        { text: "if i not = 5", correct: false },
      ],
    },
    {
      question: "How does a WHILE loop start?",
      answers: [
        { text: "while i = 1 to 10", correct: false },
        { text: "while (i <= 10; i++)", correct: false },
        { text: "while (i <= 10)", correct: true },
        { text: "while i < 10", correct: false },
      ],
    },
    {
      question: "How does a FOR loop start?",
      answers: [
        { text: "for (i = 0; i <= 5)", correct: false },
        { text: "for (i <= 5; i++)", correct: false },
        { text: "for (i = 0; i <= 5; i++)", correct: true },
        { text: "for i = 1 to 5", correct: false },
      ],
    },
    {
      question: "How can you add a comment in a JavaScript?",
      answers: [
        { text: "'This is a comment", correct: false },
        { text: "//This is a comment", correct: true },
        { text: "<!--This is a comment-->", correct: false },
        { text: "/*This is a comment*/", correct: false },
      ],
    },
    {
      question: "What is the correct way to write a JavaScript array?",
      answers: [
        { text: "var colors = 'red', 'green', 'blue'", correct: false },
        { text: "var colors = ['red', 'green', 'blue']", correct: true },
        { text: "var colors = (1:'red', 2:'green', 3:'blue')", correct: false },
        { text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')", correct: false },
      ]
    },
      {
        question: "Which object in JavaScript can be used to ensure code runs after a specified time?",
        answers: [
          { text: "setTimeout", correct: true },
          { text: "timeWait", correct: false },
          { text: "delay", correct: false },
          { text: "interval", correct: false },
        ],
      },
      {
        question: "What keyword is used to declare an asynchronous function in JavaScript?",
        answers: [
          { text: "async", correct: true },
          { text: "await", correct: false },
          { text: "defer", correct: false },
          { text: "promise", correct: false },
        ],
      },
      {
        question: "Which method is used to serialize an object into a JSON string in JavaScript?",
        answers: [
          { text: "JSON.stringify()", correct: true },
          { text: "JSON.parse()", correct: false },
          { text: "JSON.serialize()", correct: false },
          { text: "Object.toString()", correct: false },
        ],
      },
      {
        question: "How do you find the minimum of two numbers using JavaScript?",
        answers: [
          { text: "min(a,b)", correct: false },
          { text: "Math.min(a,b)", correct: true },
          { text: "Math.minimum(a,b)", correct: false },
          { text: "Math.minimize(a,b)", correct: false },
        ],
      },
      {
        question: "Which statement creates a new object using the 'Person' constructor?",
        answers: [
          { text: "var person = new Person()", correct: true },
          { text: "var person = Person()", correct: false },
          { text: "var person = construct Person()", correct: false },
          { text: "var person = create Person()", correct: false },
        ],
      },
      {
        question: "Which operator is used to check both the value and type of a variable?",
        answers: [
          { text: "==", correct: false },
          { text: "===", correct: true },
          { text: "=", correct: false },
          { text: "!==", correct: false },
        ],
      },
      {
        question: "What will 'console.log(typeof [])' output?",
        answers: [
          { text: "'object'", correct: true },
          { text: "'array'", correct: false },
          { text: "'list'", correct: false },
          { text: "'undefined'", correct: false },
        ],
      },
      {
        question: "Which method removes the last element from an array and returns that element?",
        answers: [
          { text: "pop()", correct: true },
          { text: "push()", correct: false },
          { text: "last()", correct: false },
          { text: "remove()", correct: false },
        ],
      },
      {
        question: "How can you detect the client's browser name in JavaScript?",
        answers: [
          { text: "navigator.appName", correct: true },
          { text: "browser.name", correct: false },
          { text: "client.navName", correct: false },
          { text: "window.browser", correct: false },
        ],
      },
      {
        question: "What will 'console.log(1 + '2' + '2')' output?",
        answers: [
          { text: "'5'", correct: false },
          { text: "'122'", correct: true },
          { text: "'32'", correct: false },
          { text: "NaN", correct: false },
        ],
      },
      {
        question: "Which method can be used to replace parts of a string?",
        answers: [
          { text: "string.replace(oldPart, newPart)", correct: true },
          { text: "string.exchange(oldPart, newPart)", correct: false },
          { text: "string.swap(oldPart, newPart)", correct: false },
          { text: "string.change(oldPart, newPart)", correct: false },
        ],
      },
      {
        question: "How do you declare a JavaScript variable?",
        answers: [
          { text: "v name;", correct: false },
          { text: "variable name;", correct: false },
          { text: "var name;", correct: true },
          { text: "let name;", correct: false },
        ],
      },
      {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: [
          { text: "onchange", correct: false },
          { text: "onclick", correct: true },
          { text: "onmouseover", correct: false },
          { text: "onmouseclick", correct: false },
        ],
      },
      {
        question: "How do you declare a constant in JavaScript?",
        answers: [
          { text: "const name;", correct: true },
          { text: "constant name;", correct: false },
          { text: "let name;", correct: false },
          { text: "var name;", correct: false },
        ],
      },
      {
        question: "How do you round the number 7.25, to the nearest integer?",
        answers: [
          { text: "Math.rnd(7.25)", correct: false },
          { text: "Math.round(7.25)", correct: true },
          { text: "round(7.25)", correct: false },
          { text: "Math.floor(7.25)", correct: false },
        ],
      },
      {
        question: "How do you find the number with the highest value of x and y?",
        answers: [
          { text: "Math.ceil(x, y)", correct: false },
          { text: "Math.max(x, y)", correct: true },
          { text: "top(x, y)", correct: false },
          { text: "Math.high(x, y)", correct: false },
        ],
      },
      {
        question: "What is the correct JavaScript syntax to change the content of the HTML element below?\n<p id='demo'>This is a demonstration.</p>",
        answers: [
          { text: "document.getElementByName('p').innerHTML = 'Hello World!';", correct: false },
          { text: "document.getElementById('demo').innerHTML = 'Hello World!';", correct: true },
          { text: "#demo.innerHTML = 'Hello World!';", correct: false },
          { text: "document.getElement('p').innerHTML = 'Hello World!';", correct: false },
        ],
      },
      {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
          { text: "The <body> section", correct: false },
          { text: "Both the <head> section and the <body> section are correct", correct: true },
          { text: "The <head> section", correct: false },
          { text: "At the end of the document", correct: false },
        ],
      },
      {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: [
          { text: "<script href='xxx.js'>", correct: false },
          { text: "<script name='xxx.js'>", correct: false },
          { text: "<script src='xxx.js'>", correct: true },
          { text: "<script file='xxx.js'>", correct: false },
        ],
      },
      {
        question: "The external JavaScript file must contain the <script> tag.",
        answers: [
          { text: "True", correct: false },
          { text: "False", correct: true },
          { text: "Depends on the document type", correct: false },
          { text: "Only if the file is local", correct: false },
        ],
      },
      {
        question: "How do you write a conditional statement for executing some statements only if 'i' is NOT equal to 5?",
        answers: [
          { text: "if (i != 5)", correct: true },
          { text: "if i =! 5 then", correct: false },
          { text: "if i <> 5", correct: false },
          { text: "if (i <> 5)", correct: false },
        ],
      },
      {
        question: "How does a 'for' loop start?",
        answers: [
          { text: "for (i <= 5; i++)", correct: false },
          { text: "for (i = 0; i <= 5)", correct: false },
          { text: "for (i = 0; i <= 5; i++)", correct: true },
          { text: "for i = 1 to 5", correct: false },
        ],
      },
      {
        question: "How can you make a numbered list?",
        answers: [
          { text: "<ul>", correct: false },
          { text: "<ol>", correct: true },
          { text: "<list>", correct: false },
          { text: "<dl>", correct: false },
        ],
      },
      {
        question: "What is the correct HTML for making a text input field?",
        answers: [
          { text: "<input type='textfield'>", correct: false },
          { text: "<input type='text'>", correct: true },
          { text: "<textfield>", correct: false },
          { text: "<textinput type='text'>", correct: false },
        ],
      },
      {
        question: "What is the correct HTML for making a drop-down list?",
        answers: [
          { text: "<list>", correct: false },
          { text: "<input type='dropdown'>", correct: false },
          { text: "<select>", correct: true },
          { text: "<dropdown>", correct: false },
        ],
      },
      {
        question: "What is the correct HTML for making a checkbox?",
        answers: [
          { text: "<checkbox>", correct: false },
          { text: "<input type='checkbox'>", correct: true },
          { text: "<check>", correct: false },
          { text: "<input type='check'>", correct: false },
        ],
      },
      {
        question: "What is the correct HTML for making a text area?",
        answers: [
          { text: "<input type='textarea'>", correct: false },
          { text: "<textarea>", correct: true },
          { text: "<textbox>", correct: false },
          { text: "<input type='textbox'>", correct: false },
        ],
      },
      {
        question: "What is the correct HTML for inserting an image?",
        answers: [
          { text: "<img src='image.gif' alt='MyImage'>", correct: true },
          { text: "<image src='image.gif' alt='MyImage'>", correct: false },
          { text: "<img href='image.gif' alt='MyImage'>", correct: false },
          { text: "<img alt='MyImage'>image.gif</img>", correct: false },
        ],
      },
      {
        question: "What is the correct HTML for inserting a background image?",
        answers: [
          { text: "<body bg='background.gif'>", correct: false },
          { text: "<body style='background-image:url(background.gif)'>", correct: true },
          { text: "<background img='background.gif'>", correct: false },
          { text: "<body background='background.gif'>", correct: false },
        ],
      },
      {
        question: "What is the correct HTML for creating a hyperlink?",
        answers: [
          { text: "<a href='url'>link text</a>", correct: true },
          { text: "<a>url</a>link text", correct: false },
          { text: "<a url='link text'>", correct: false },
          { text: "<link>url</link>link text", correct: false },
        ],
      }
      
      
    ]
    // Shuffle questions function
function shuffleQuestions(questions) {
    let shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  function Quiz() {
    const [questions, setQuestions] = useState(() => shuffleQuestions(initialQuestions));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [userName, setUserName] = useState('');
  
    useEffect(() => {
      let interval = null;
  
      if (isQuizStarted && timeLeft > 0) {
        interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      } else if (timeLeft <= 0 && isQuizStarted) {
        endQuiz();
      }
  
      return () => clearInterval(interval);
    }, [timeLeft, isQuizStarted]);
  
    const startQuiz = () => {
      setQuestions(shuffleQuestions(initialQuestions)); // Shuffle and set questions
      setCurrentQuestionIndex(0);
      setTimeLeft(60);
      setScore(0);
      setUserName('');
      setIsQuizStarted(true);
    };
  
    const endQuiz = () => {
      setIsQuizStarted(false);
      alert("Time is up! Let's see how you did.");
    };
  
    const handleAnswer = (answer) => {
      if (!isQuizStarted || timeLeft <= 0) return;
  
      if (answer.correct) {
        setScore(score + 1);
      } else {
        setTimeLeft(timeLeft >= 10 ? timeLeft - 10 : 0);
      }
  
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        endQuiz();
      }
    };
  
    const saveScore = async () => {
      const scoreData = { userName, score };
      // Ensure you replace 'YOUR_BACKEND_ENDPOINT' with your actual endpoint URL
      await fetch('YOUR_BACKEND_ENDPOINT/api/scores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scoreData),
      });
      // Consider implementing fetchHighScores to update the high score board
    };

  return (
    <div className="container">
      {isQuizStarted ? (
        <>
          <div className="countdown-grid">
            <h2>{timeLeft}</h2>
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
      ) : (
        <button onClick={startQuiz} className="btn start-btn">Start Quiz</button>
      )}
     {!isQuizStarted && timeLeft === 0 && (
<div className="score-grid">
  <h3>Your Score: {score} / {questions.length}</h3>
  <input type="text" placeholder="Enter your name" value={userName} onChange={(e) => setUserName(e.target.value)} />
  <button onClick={saveScore} className="btn">Save Score</button>
  <button onClick={startQuiz} className="btn">Restart Quiz</button>
</div>
)}

    </div>
  );
  
}

export default Quiz;
