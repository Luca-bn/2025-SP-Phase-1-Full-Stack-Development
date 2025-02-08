import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import WINNING_COMBINATIONS from "./constants/winning-combinations"
import React from "react"

export type Player = "X" | "O" | null;

export type GameLog = {
  row: number,
  col: number,
  player: Player,
}

export type Players = { X: string, O: string }

const PLAYERS: Players = {
  "X": "Player1",
  "O": "Player2"
};

function findActivePlayer(turns: GameLog[]): Player {
  return turns.length > 0 && turns[0]!.player === "X" ? "O" : "X";
}

function getWinner(gameBoard: Array<Array<Player>>, players: Players): string {
  let winner: string = "";
  for (const combination of WINNING_COMBINATIONS) {
    const firstVal = gameBoard[combination[0].row]![combination[0].col];
    const secVal = gameBoard[combination[1].row]![combination[1].col];
    const thirdVal = gameBoard[combination[2].row]![combination[2].col];

    if (firstVal && (firstVal === secVal && secVal === thirdVal)) {
      winner = players[firstVal];
      break;
    }
  }
  console.log(winner)
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState<GameLog[]>([]);
  const activePlayer = findActivePlayer(gameTurns);

  const gameBoard: Array<Array<Player>> = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  for (const turn of gameTurns)
    gameBoard[turn.row]![turn.col] = turn.player;

  const winner = getWinner(gameBoard, players);

  const handleSquareSelect = (rowIndex: number, colIndex: number) => {
    setGameTurns(prevTurns => {
      let currentPlayer = findActivePlayer(prevTurns);
      return [{ player: currentPlayer, row: rowIndex, col: colIndex }, ...prevTurns];
    });
  }

  const handlePlayerNameChange = (symbol: Player, name: string) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol!]: name
      }
    })
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player name={PLAYERS["X"]} symbol="X" isActive={activePlayer === "X"} udpateName={handlePlayerNameChange}></Player>
            <Player name={PLAYERS["O"]} symbol="O" isActive={activePlayer === "O"} udpateName={handlePlayerNameChange}></Player>
          </ol>
          {winner && <GameOver player={winner} restartGame={() => setGameTurns([])}></GameOver>}
          {(!winner && gameTurns.length === 9) && <GameOver restartGame={() => setGameTurns([])}></GameOver>}
          <GameBoard onSquareSelect={handleSquareSelect} gameBoard={gameBoard} turns={gameTurns}></GameBoard>
        </div>
        <Log turns={gameTurns}></Log>
      </main>
    </>
  )
}

export default App
