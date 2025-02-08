import React, { ChangeEvent } from "react";
import { useState } from "react";

type PlayerPros = {
    name: string,
    symbol: "X" | "O",
    isActive: boolean,
    udpateName: (symbol: "X" | "O", name: string) => void,
    props?: unknown[],
}

export default function Player({ name, symbol, isActive, udpateName, ...props }: PlayerPros) {

    const [playerName, setPlayerName] = useState<string>(name);
    const [isEditing, setEditing] = useState<boolean>(false);

    const handleClick = (symbol: "X" | "O", name: string) => {
        setEditing((editing) => !editing);
        isEditing && udpateName(symbol, playerName);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPlayerName(event.target.value);
    }

    let playerNameTemplate = <span className="player-name">{playerName}</span>;

    if (isEditing)
        playerNameTemplate = <input type="text" required value={playerName} onChange={handleChange}></input>;

    return (
        <>
            <li className={isActive ? "active" : undefined}>
                <span className="player">
                    {playerNameTemplate}
                    <span className="player-symbol">{symbol}</span>
                </span>
                <button onClick={() => handleClick(symbol, name)}>{isEditing ? "SAVE" : "EDIT"}</button>
            </li>
        </>
    );
}