export default function Log({turns, ...props}) {

    return <>
        <ol id="log">
           {turns.map(turn => <li key={turn.row + "" + turn.col}>{turn.player} selected {turn.row}, {turn.col}</li>)}
        </ol>
    </>

}