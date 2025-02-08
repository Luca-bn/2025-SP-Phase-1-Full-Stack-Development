import { useRef } from "react";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

const STATE_PROPS = [
  {
    state: "WAITING",
    time: 5000,
    buttonCssClass: (answer, chosedAnswer, rightAnswer) =>
      answer === chosedAnswer ? "selected" : "",
  },
  {
    state: "ANSWERED",
    time: 1000,
    buttonCssClass: (answer, chosedAnswer, rightAnswer) =>
      answer === chosedAnswer ? "selected" : "",
  },
  {
    state: "REVIEWING",
    time: 2000,
    buttonCssClass: (answer, chosedAnswer, rightAnswer) =>
      answer === chosedAnswer
        ? answer === rightAnswer
          ? "correct"
          : "wrong"
        : "",
  },
];

export default function Question({ question, onNextQuestion }) {
  const [currentState, setCurrentState] = useState(0);
  const [chosedAnswer, setChosedAnswer] = useState();
  const shuffledAnswers = useRef(
    question.answers
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
  );

  function handleAnswer(answer) {
    setChosedAnswer(answer);
    setCurrentState(1);
  }

  function handleTimeout() {
    switch (currentState) {
      case 0: {
        onNextQuestion();
        break;
      }
      case 1: {
        setCurrentState(2);
        break;
      }
      case 2: {
        onNextQuestion(chosedAnswer);
        break;
      }
    }
  }

  return (
    <div id="question">
      <ProgressBar
        key={STATE_PROPS[currentState].state}
        type={STATE_PROPS[currentState].state}
        time={STATE_PROPS[currentState].time}
        onTimeout={handleTimeout}
      />
      <h2>{question.text}</h2>
      <ul id="answers">
        {shuffledAnswers.current.map((answer, index) => (
          <li className="answer" key={index}>
            <button
              className={STATE_PROPS[currentState].buttonCssClass(
                answer,
                chosedAnswer,
                question.answers[0]
              )}
              onClick={() => handleAnswer(answer)}
              disabled={chosedAnswer}
            >
              {answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
