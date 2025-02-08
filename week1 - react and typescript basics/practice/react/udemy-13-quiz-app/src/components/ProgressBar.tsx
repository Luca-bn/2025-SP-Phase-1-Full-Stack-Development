import { useEffect } from "react";
import { useState } from "react";
import { ProgressBarType } from "./Question";

type ProgressBarProps = { type: ProgressBarType, time: number, onTimeout: () => void }

export default function ProgressBar({ type, time, onTimeout }: ProgressBarProps) {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    const frequency = 100;
    const interval = setInterval(() => {
      // console.log("Interval");
      setRemainingTime((prev) => prev - frequency);
    }, frequency);
    // console.log("Created interval: ", interval);

    return () => {
      // console.log("clear interval: ", interval);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // console.log("Timeout");
      onTimeout();
    }, time);
    // console.log("Created timeout: ", timeout);

    return () => {
      // console.log("clear timeout: ", timeout);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <progress
      id="question-time"
      className={type === "ANSWERED" ? " answered" : ""}
      value={remainingTime}
      max={time}
    />
  );
}
