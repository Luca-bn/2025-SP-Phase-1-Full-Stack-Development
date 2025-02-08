import { useState } from "react";
import { QUESTIONS } from "../questions";
import Question from "./Question";
import Result from "./Result";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<string | undefined>>([]);

  function handleNextQuestion(answer?: string) {
    setCurrentQuestion((prev) => prev + 1);
    setUserAnswers((prev) => [...prev, answer]);
  }

  return (
    <main>
      {currentQuestion < QUESTIONS.length ? (
        <div id="quiz">
          <Question
            key={QUESTIONS[currentQuestion]?.id}
            question={QUESTIONS[currentQuestion]!}
            onNextQuestion={handleNextQuestion}
          />
        </div>
      ) : (
        <Result questions={QUESTIONS} answers={userAnswers} />
      )}
    </main>
  );
}
