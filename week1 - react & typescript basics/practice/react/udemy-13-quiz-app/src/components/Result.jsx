export default function Result({ questions, answers }) {
  const result = { skipped: 0, right: 0, wrong: 0 };
  for (let i = 0; i < questions.length; i++) {
    if (!answers[i]) {
      result.skipped++;
      continue;
    }

    if (questions[i].answers[0] === answers[i]) {
      result.right++;
      continue;
    }

    result.wrong++;
  }

  return (
    <div id="summary">
      <img src="/src/assets/quiz-complete.png" alt="Trophy icon" />
      <h2>Quiz Completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">
            {Math.round((result.skipped / questions.length) * 100) + "%"}
          </span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">
            {Math.round((result.right / questions.length) * 100) + "%"}
          </span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">
            {Math.round((result.wrong / questions.length) * 100) + "%"}
          </span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {questions.map((question, index) => {
          return (
            <li key={question.id}>
              <h3>{index + 1}</h3>
              <p className="question">{question.text}</p>
              <p
                className={
                  answers[index]
                    ? answers[index] === question.answers[0]
                      ? "user-answer correct"
                      : "user-answer wrong"
                    : "user-answer skipped"
                }
              >
                {answers[index] ? answers[index] : "Skipped"}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
