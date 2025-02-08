import { useState } from "react";

export default function Player({ name, symbol, isActive, udpateName, ...props }) {

    const [ playerName, setPlayerName ] = useState(name);
    const [isEditing, setEditing] = useState(false);

    const handleClick = (symbol, name) => {
        setEditing((editing) => !editing);
        isEditing && udpateName(symbol, playerName);
    }

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    }

    let playerNameTemplate = <span className="player-name">{playerName}</span>;

    if(isEditing)
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