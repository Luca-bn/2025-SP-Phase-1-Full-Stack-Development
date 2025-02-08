import { useState } from "react";
import questions from "../questions";
import Question from "./Question";
import Result from "./Result";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  function handleNextQuestion(answer) {
    setCurrentQuestion((prev) => prev + 1);
    setUserAnswers((prev) => [...prev, answer]);
  }

  return (
    <main>
      {currentQuestion < questions.length ? (
        <div id="quiz">
          <Question
            key={questions[currentQuestion].id}
            question={questions[currentQuestion]}
            onNextQuestion={handleNextQuestion}
          />
        </div>
      ) : (
        <Result questions={questions} answers={userAnswers} />
      )}
    </main>
  );
}
