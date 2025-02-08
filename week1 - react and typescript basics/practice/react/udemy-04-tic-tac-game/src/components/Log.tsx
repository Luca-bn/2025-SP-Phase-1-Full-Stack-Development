import React from "react";
import { GameLog } from "../App";

type LogProps = {
    turns: GameLog[],
    props?: unknown[],
}

export default function Log({ turns, ...props }: LogProps) {

    return <>
        <ol id="log">
            {turns.map(turn => <li key={turn.row + "" + turn.col}>{turn.player} selected {turn.row}, {turn.col}</li>)}
        </ol>
    </>

}