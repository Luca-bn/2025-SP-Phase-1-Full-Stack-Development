import { useRef } from "react";
import { useState } from "react";
import ResultModal, { ResultModalImperativeHandler } from "./ResultModal";

type IntervalChallengeProps = {
    title: string,
    time: number,
    props?: unknown[]
}

export default function intervalChallenge({ title, time, ...pros }: IntervalChallengeProps) {

    const [challengeActive, setChallengeActive] = useState(false);
    const timeInMills = +time * 1000;

    const interval = useRef<number>();
    const stopTime = useRef<number>(0);

    const modal = useRef<ResultModalImperativeHandler>();

    const handleClick = () => {
        setChallengeActive((wasActive) => {
            wasActive || handleStart();
            wasActive && handleStop();
            return !wasActive;
        });
    }

    const handleStart = () => {
        if (interval.current)
            return;
        interval.current = setInterval(() => {
            stopTime.current += 10;
            console.log(stopTime.current);
            if (stopTime.current >= timeInMills)
                handleStop();
        }, 10);
    }

    const handleStop = () => {
        if (!interval.current)
            return;
        clearInterval(interval.current);
        interval.current = undefined;
        setChallengeActive(false);
        modal.current?.openModal();
    }

    const resetStopTime = () => {
        stopTime.current = 0;
    }

    return (
        <>
            <ResultModal ref={modal} initialTimeMills={timeInMills} stopTimeMills={stopTime.current} onReset={resetStopTime} />
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {time} second(s)
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