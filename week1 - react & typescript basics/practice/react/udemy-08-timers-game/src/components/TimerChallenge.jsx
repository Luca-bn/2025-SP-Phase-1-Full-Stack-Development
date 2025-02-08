import { useRef } from "react";
import { useState } from "react";
import ResultModal from "./ResultModal";

export default function intervalChallenge({title, time, ...pros}) {

    const [ challengeActive, setChallengeActive ] = useState(false);
    const timeInMills = +time * 1000;
    
    const interval = useRef();
    const stopTime = useRef(0);

    const modal = useRef();

    const handleClick = () => {
        setChallengeActive((wasActive) => {
            wasActive || handleStart();
            wasActive && handleStop();
            return !wasActive;
        });
    }

    const handleStart = () => {
        if(interval.current)
            return;
        interval.current = setInterval(() => {
            stopTime.current += 10;
            console.log(stopTime.current);
            if(stopTime.current >= timeInMills)
                handleStop();
        }, 10);
    }

    const handleStop = () => {
        if(!interval.current)
            return;
        clearInterval(interval.current);
        interval.current = undefined;
        setChallengeActive(false);
        modal.current.openModal();
    }

    const resetStopTime = () => {
        stopTime.current = 0;
    }

    return (
        <>
            <ResultModal ref={modal} initialTimeMills={timeInMills} stopTimeMills={stopTime.current} onReset={resetStopTime}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    { time } second(s)
                </p>
                <p>
                    <button onClick={() => handleClick()}>{challengeActive ? "Stop Time" : "Challenge"}</button>
                </p>
                {
                    challengeActive ?
                    <p className='active'>Time is running</p>
                    :
                    <p>interval inactive</p>    
                }
            </section>
        </>
    );
}