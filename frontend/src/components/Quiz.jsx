import "../css/quiz.css";
import quizData from "./data.js";
import { useState } from "react";

function Quiz() {
  const [curQuestion, setCurQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const question = quizData[curQuestion] || { question: "", options: [] }; // Avoid undefined errors

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === question.answer) {
      setScore(score + 1);
    }

    let next_question = curQuestion + 1;

    if (next_question < quizData.length) {
      setCurQuestion(next_question);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="quiz-container">
      {done ? (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {quizData.length}</p>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <h1>Quiz</h1>
          <p>{question.question}</p>
          <div className="options">
            <button className="a1" onClick={() => handleAnswerClick(question.options[0])}>
              {question.options[0]}
            </button>
            <button className="a1" onClick={() => handleAnswerClick(question.options[1])}>
              {question.options[1]}
            </button>
            <button className="a1" onClick={() => handleAnswerClick(question.options[2])}>
              {question.options[2]}
            </button>
            <button className="a1" onClick={() => handleAnswerClick(question.options[3])}>
              {question.options[3]}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
