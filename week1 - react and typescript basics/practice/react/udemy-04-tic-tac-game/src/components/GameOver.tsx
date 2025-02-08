import React from "react";

type GameOverProps = {
    player?: string,
    restartGame: () => void,
    props?: unknown[],
}

export default function GameOver({ player, restartGame, ...props }: GameOverProps) {
    return <>
        <div id="game-over">
            <h2>Game Over!</h2>
            {player && <p>{player} won!</p>}
            {!player && <p>it's a draw!</p>}
            <p><button onClick={restartGame}>Rematch</button></p>
        </div>
    </>
}