import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './css/Quiz.css';

const initialQuestions =[
    {
      "question": "What does the `document.getElementById` function do?",
      "answers": [
        {"text": "Retrieves an HTML element by its ID", "correct": true},
        {"text": "Updates an HTML element's ID", "correct": false},
        {"text": "Deletes an HTML element by its ID", "correct": false},
        {"text": "Creates a new HTML element with an ID", "correct": false}
      ],
      "explanation": "`document.getElementById` is a method used to access and manipulate the DOM of a webpage. It allows JavaScript to get a reference to an HTML element by its unique ID, enabling the script to read or modify the element's properties or content."
    },
    {
      "question": "What is the purpose of the `Array.map()` method in JavaScript?",
      "answers": [
        {"text": "To execute a function on each item in an array and collect the results", "correct": true},
        {"text": "To filter items out of an array", "correct": false},
        {"text": "To reduce an array to a single value", "correct": false},
        {"text": "To check if any items in an array pass a test", "correct": false}
      ],
      "explanation": "The `Array.map()` method creates a new array populated with the results of calling a provided function on every element in the calling array. It's useful for transforming data without mutating the original array."
    },
    {
      "question": "What does the `===` operator check for?",
      "answers": [
        {"text": "If two values are equal", "correct": false},
        {"text": "If two values are equal in value and type", "correct": true},
        {"text": "If two values are not equal", "correct": false},
        {"text": "If two values are equal in type only", "correct": false}
      ],
      "explanation": "The `===` operator is a strict equality comparison operator in JavaScript, which checks whether its two operands are equal in both value and type, without performing type conversion."
    },
    {
      "question": "How can you stop the execution of a setInterval function?",
      "answers": [
        {"text": "clearInterval(intervalID)", "correct": true},
        {"text": "clearInterval()", "correct": false},
        {"text": "stopInterval(intervalID)", "correct": false},
        {"text": "stopInterval()", "correct": false}
      ],
      "explanation": "`clearInterval(intervalID)` is used to stop a timer set with the `setInterval()` method. `intervalID` is the identifier of the interval to be cleared, which is returned by `setInterval()`."
    },
    {
      "question": "What does the `JSON.parse()` method do?",
      "answers": [
        {"text": "Converts a JavaScript object into a JSON string", "correct": false},
        {"text": "Parses a JSON string, constructing the JavaScript value or object described by the string", "correct": true},
        {"text": "Encodes special JSON characters in a string", "correct": false},
        {"text": "None of the above", "correct": false}
      ],
      "explanation": "`JSON.parse()` method parses a JSON string, constructing the JavaScript value or object described by the string. This is commonly used to convert data received from a web server into a usable JavaScript object."
    },
    {
      "question": "Which of the following is not a valid way to declare a variable in JavaScript?",
      "answers": [
        {"text": "var name = \"John\";", "correct": false},
        {"text": "let name = \"John\";", "correct": false},
        {"text": "const name = \"John\";", "correct": false},
        {"text": "variable name = \"John\";", "correct": true}
      ],
      "explanation": "`var`, `let`, and `const` are the only valid keywords to declare variables in JavaScript. The `variable` keyword does not exist in JavaScript syntax."
    },
    {
      "question": "How do you create a class in JavaScript?",
      "answers": [
        {"text": "class MyClass {}", "correct": true},
        {"text": "create MyClass {}", "correct": false},
        {"text": "function MyClass() {}", "correct": false},
        {"text": "new Class(MyClass);", "correct": false}
      ],
      "explanation": "Classes in JavaScript are a template for creating objects. They encapsulate data with code to work on that data. Classes use the `class` keyword followed by the class name and curly braces `{}` to define the body."
    },
    {
      "question": "What is the use of the `async` keyword in JavaScript?",
      "answers": [
        {"text": "Makes a function return a promise", "correct": false},
        {"text": "Allows a function to await a Promise", "correct": false},
        {"text": "Both A and B", "correct": true},
        {"text": "Pauses the execution of synchronous JavaScript code", "correct": false}
      ],
      "explanation": "The `async` keyword is used before a function to indicate that the function always returns a promise. Functions marked with `async` can also use the `await` keyword to pause the execution until the promise is resolved."
    },
    {
      "question": "What is event bubbling in JavaScript?",
      "answers": [
        {"text": "Directly handling an event on the element it occurred", "correct": false},
        {"text": "The event gets handled by the innermost element first and then propagated to outer elements", "correct": false},
        {"text": "The event is directly captured by the outermost element and propagated to the inner elements", "correct": false},
        {"text": "The event starts from the outermost element and is propagated to the innermost element", "correct": true}
      ],
      "explanation": "Event bubbling is a method of event propagation in the DOM where events start from the deepest element (innermost) and then propagate to the outer elements. This is the default behavior of events in most browsers."
    },
    {
      "question": "What will the following code output? `console.log(\"5\" + 3);`",
      "answers": [
        {"text": "8", "correct": false},
        {"text": "53", "correct": true},
        {"text": "\"53\"", "correct": false},
        {"text": "TypeError", "correct": false}
      ],
      "explanation": "In JavaScript, the `+` operator is used for both addition and concatenation. If one of the operands is a string, JavaScript will treat the operation as concatenation, converting the other operand to a string if necessary."
    },
    {
      "question": "How do you copy an object in JavaScript?",
      "answers": [
        {"text": "Object.copy(obj)", "correct": false},
        {"text": "var copy = Object.assign({}, obj);", "correct": true},
        {"text": "var copy = copyObject(obj);", "correct": false},
        {"text": "var copy = obj.copy();", "correct": false}
      ],
      "explanation": "`Object.assign(target, ...sources)` method is used to copy all enumerable own properties from one or more source objects to a target object. It returns the target object."
    },
    {
      "question": "Which method can be used to check if an array includes a certain value?",
      "answers": [
        {"text": "array.contains(value)", "correct": false},
        {"text": "array.includes(value)", "correct": true},
        {"text": "array.has(value)", "correct": false},
        {"text": "array.find(value)", "correct": false}
      ],
      "explanation": "The `array.includes()` method determines whether an array includes a certain value among its entries, returning `true` or `false` as appropriate."
    },
    {
      "question": "What is a Promise in JavaScript?",
      "answers": [
        {"text": "A function that awaits a result", "correct": false},
        {"text": "An object representing the eventual completion or failure of an asynchronous operation", "correct": true},
        {"text": "A data type specifically used for mathematical calculations", "correct": false},
        {"text": "A callback function for asynchronous operations", "correct": false}
      ],
      "explanation": "A Promise is an object representing the eventual completion or failure of an asynchronous operation. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason."
    },
    {
      "question": "What does the `typeof` operator return for a function in JavaScript?",
      "answers": [
        {"text": "\"function\"", "correct": true},
        {"text": "\"object\"", "correct": false},
        {"text": "\"method\"", "correct": false},
        {"text": "\"callable\"", "correct": false}
      ],
      "explanation": "The `typeof` operator in JavaScript returns a string indicating the type of the unevaluated operand. For functions, it returns `\"function\"`."
    },
    {
      "question": "How do you add an element at the beginning of an array in JavaScript?",
      "answers": [
        {"text": "array.push(element)", "correct": false},
        {"text": "array.unshift(element)", "correct": true},
        {"text": "array.addFirst(element)", "correct": false},
        {"text": "array.prepend(element)", "correct": false}
      ],
      "explanation": "The `array.unshift()` method adds one or more elements to the beginning of an array and returns the new length of the array."
    },
    {
      "question": "What does the `fetch` function in JavaScript do?",
      "answers": [
        {"text": "Synchronously sends data to a server", "correct": false},
        {"text": "Asynchronously retrieves data from a server", "correct": true},
        {"text": "Deletes data from a server", "correct": false},
        {"text": "Updates data on a server", "correct": false}
      ],
      "explanation": "The `fetch` function provides an easy, logical way to fetch resources asynchronously across the network. It returns a Promise that resolves to the Response to that request, whether it is successful or not."
    },
    {
      "question": "How do you remove a specific element from an array in JavaScript?",
      "answers": [
        {"text": "array.splice(index, 1)", "correct": true},
        {"text": "array.remove(element)", "correct": false},
        {"text": "array.delete(index)", "correct": false},
        {"text": "array.cut(index)", "correct": false}
      ],
      "explanation": "The `array.splice()` method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. To remove a specific element, you specify the index of the element and delete count as 1."
    },
    {
      "question": "What is the output of `console.log(1 + '2' + 3)`?",
      "answers": [
        {"text": "\"123\"", "correct": true},
        {"text": "\"6\"", "correct": false},
        {"text": "\"15\"", "correct": false},
        {"text": "TypeError", "correct": false}
      ],
      "explanation": "JavaScript performs concatenation when one of the operands is a string. Thus, 1 is concatenated with '2' as \"12\", and then \"12\" is concatenated with 3, resulting in \"123\"."
    },
    {
      "question": "What keyword is used to define a block of code that will be executed if an error occurs in a try block?",
      "answers": [
        {"text": "catch", "correct": true},
        {"text": "error", "correct": false},
        {"text": "finally", "correct": false},
        {"text": "except", "correct": false}
      ],
      "explanation": "The `catch` keyword is used in try-catch statements in JavaScript to define a block of code that will be executed if an error occurs in the try block."
    },
    {
      "question": "What is the purpose of the `finally` block in a try-catch statement?",
      "answers": [
        {"text": "To execute code after the try and catch blocks, regardless of the result", "correct": true},
        {"text": "To handle the error specifically after the catch block", "correct": false},
        {"text": "To finalize the try block execution before the catch block", "correct": false},
        {"text": "To rethrow an error caught in the catch block", "correct": false}
      ],
      "explanation": "The `finally` block executes after the try and catch blocks but before any subsequent code. It executes regardless of whether an exception was thrown or caught, allowing for cleanup code to be run."
    }
  ]
  


function shuffleQuestions(questions) {
    let shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  function Quiz({ onQuizComplete }) {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState(() => shuffleQuestions(initialQuestions));
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [username, setUserName] = useState('');
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [reviewMode, setReviewMode] = useState(false); // New state to track review mode


    const endQuiz = useCallback(() => {
        setIsQuizStarted(false);
        alert("Time is up! Let's see how you did.");
        onQuizComplete(score);
        setReviewMode(true); 
      }, [score, setIsQuizStarted, onQuizComplete]); 
  
    useEffect(() => {
        let interval = null;

        if (isQuizStarted && timeLeft > 0) {
          interval = setInterval(() => setTimeLeft((prevTime) => prevTime - 1), 1000);
        } else if (timeLeft <= 0 && isQuizStarted) {
          endQuiz();
        }
    
        return () => clearInterval(interval);
      }, [timeLeft, isQuizStarted, endQuiz]); 
  
    const startQuiz = () => {
        localStorage.removeItem('quizAnswers');
        setSelectedAnswers([]);
      setQuestions(shuffleQuestions(initialQuestions)); 
      setCurrentQuestionIndex(0);
      setTimeLeft(60);
      setScore(0);
      setUserName('');
      setIsQuizStarted(true);
    };
  
    // const endQuiz = useCallback(() => {
    //     setIsQuizStarted(false);
    //     alert("Time is up! Let's see how you did.");
    //     onQuizComplete(score);
    //   }, [score, onQuizComplete]); 

    const handleAnswer = (answer) => {
        if (!isQuizStarted || timeLeft <= 0) return;
    
       
        const currentQuestion = questions[currentQuestionIndex];
        const explanation = currentQuestion.explanation;
    
        setSelectedAnswers(prevAnswers => [
            ...prevAnswers,
            { 
                question: currentQuestion.question,
            selectedAnswer: answer.text,
            correct: answer.correct,
            allAnswers: currentQuestion.answers,
            explanation: !answer.correct ? explanation : ''
            }
        ]);
    
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
    
    useEffect(() => {
        localStorage.setItem('quizAnswers', JSON.stringify(selectedAnswers));
    }, [selectedAnswers]);
    


  
const saveScore = async () => {
    const scoreData = { username, score };

    try {
        const response = await fetch('http://localhost:4000/api/scores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scoreData),
        });

        if (response.ok) {
       
            navigate('/high-scores'); 
        } else {
            alert('Failed to save score');
        }
    } catch (error) {
        console.error('Error saving score:', error);
        alert('Error saving score');
    }
    };
    
    

    return (
        <div >
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
          ) : reviewMode ? (
            <div>
              <h2>Your Score: {score}</h2>
              {!isQuizStarted && timeLeft === 0 && (
            <div className="score-grid">
              <h3>Your Score: {score}</h3>
              <input type="text" placeholder="Enter your name" value={username} onChange={(e) => setUserName(e.target.value)} />
              <button onClick={saveScore} className="btn">Save Score</button>
              <button onClick={startQuiz} className="btn start-btn">Start Quiz</button>
              
            </div>
          )}
              <h3>Review your answers</h3>
              <ul>
                {selectedAnswers.map((item, index) => (
                  <li key={index}>
                    <p>Question: {item.question}</p>
                    <p>Your Answer: <span style={{ color: item.correct ? 'green' : 'red' }}>{item.selectedAnswer}</span></p>
                    {!item.correct && (
                      <>
                        <p style={{color: 'green'}}>Correct Answer: {
                          item.allAnswers.find(answer => answer.correct).text
                        }</p>
                        <p style={{color: 'blue'}}>Explanation: {item.explanation}</p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <button onClick={startQuiz} className="btn">Restart Quiz</button>
            </div>
          ) : (
            <button onClick={startQuiz} className="btn start-btn">Start Quiz</button>
          )}
          
        </div>
      );
    
}

export default Quiz;
