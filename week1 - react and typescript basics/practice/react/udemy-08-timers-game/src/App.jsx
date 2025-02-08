import Player from './components/Player.jsx';
import TimerChallenge from './components/TimerChallenge.jsx';

const CHALLENGES = [
  {title: "EASY", time: 1},
  {title: "MEDIUM", time: 5},
  {title: "HARD", time: 10},
  {title: "VERY HARD", time: 15}
]

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        {CHALLENGES.map(({ title, time }, index) => <TimerChallenge title={title} time={time} key={index} />)}
      </div>
    </>
  );
}

export default App;
