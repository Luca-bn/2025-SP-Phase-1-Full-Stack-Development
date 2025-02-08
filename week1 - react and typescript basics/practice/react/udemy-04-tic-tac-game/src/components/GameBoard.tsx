import React from "react";
import { GameLog } from "../App";

type GameBoardProps = {
    onSquareSelect: (rowIndex: number, colIndex: number) => void,
    gameBoard: (string | null)[][],
    turns?: GameLog[],
}

export default function GameBoard({ onSquareSelect, gameBoard, turns }: GameBoardProps) {

    return (<>
        <ol id="game-board">
            {
                gameBoard.map((row, rowIndex) => {
                    return <li key={rowIndex}>
                        <ol>
                            {
                                row.map((value, colIndex) => {
                                    return <li key={colIndex}>
                                        <button onClick={() => onSquareSelect(rowIndex, colIndex)} disabled={!!value}>{value}</button>
                                    </li>
                                })
                            }
                        </ol>
                    </li>
                })
            }
        </ol>
    </>
    );

}