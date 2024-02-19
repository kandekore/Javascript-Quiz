// import React, { useState } from 'react';

// // Custom hook for managing local storage
// function useLocalStorage(key, initialValue) {
//   const [storedValue, setStoredValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   const setValue = value => {
//     try {
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       setStoredValue(valueToStore);
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [storedValue, setValue];
// }

// function Score({ score, onScoreSubmit }) {
//     // Use the custom hook instead of useState + useEffect for local storage
//     const [answers, setAnswers] = useLocalStorage('quizAnswers', []);
//     const [username, setUsername] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // You might want to save the username or do something else here
//         console.log(username); // For now, just log it to see it's being captured
//         onScoreSubmit(); // Assuming this is a function to navigate away or reset state
//     };

//     return (
//         <div>
//              <h2>Quiz Review</h2>
//             {answers.length > 0 ? (
//                 <ul>
//                     {answers.map((item, index) => (
//                         <li key={index}>
//                             <p>Question: {item.question}</p>
//                             <p>Selected Answer: <span style={{ color: item.correct ? 'green' : 'red' }}>{item.selectedAnswer}</span></p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No answers to display.</p>
//             )}
//             <h2>Your Score: {score}</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Your Name"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <button type="submit">Submit Score</button>
//             </form>
           
//         </div>
//     );
// }

// export default Score;

import React, { useEffect, useState } from 'react';

function Score({ score, onScoreSubmit }) {
    const [answers, setAnswers] = useState([]);
    const [username, setUsername] = useState('');

    // Temporarily comment out to focus on rendering static content
    // useEffect(() => {
    //     const storedAnswers = JSON.parse(localStorage.getItem('quizAnswers'));
    //     if (storedAnswers) {
    //         setAnswers(storedAnswers);
    //     }
    // }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Assuming onScoreSubmit is a prop function that handles score submission
        onScoreSubmit();
    };

    return (
        <div>
            <h2>Your Score: {score}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Submit Score</button>
            </form>
            <h2>Quiz Review</h2> {/* Check if this renders */}
            <p>No answers to display.</p> {/* Simplified static content to check rendering */}
        </div>
    );
}

export default Score;

