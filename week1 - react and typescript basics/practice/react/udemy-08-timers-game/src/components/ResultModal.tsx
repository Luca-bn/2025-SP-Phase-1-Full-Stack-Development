import { Ref, useRef } from "react";
import { forwardRef, useImperativeHandle } from "react";
import { createPortal } from 'react-dom';

export type ResultModalImperativeHandler = {
    openModal: () => void
}

type ResultModalProps = {
    initialTimeMills: number, stopTimeMills: number, onReset: () => void, props?: unknown[]
}

const ResultModal = forwardRef(function ({ initialTimeMills, stopTimeMills, onReset, ...props }: ResultModalProps, ref: Ref<unknown>) {

    const dialog = useRef<HTMLDialogElement>(null);
    const formattedRemainingTime = ((initialTimeMills - stopTimeMills) / 1000).toFixed(2);

    const getScore = () => {
        return Math.floor((stopTimeMills * 100) / initialTimeMills);
    }

    useImperativeHandle(ref, () => {
        return {
            openModal: () => {
                dialog.current?.showModal();
            }
        }
    })

    return createPortal(
        <dialog ref={dialog} className="result-modal" onClose={onReset}>
            {
                stopTimeMills >= initialTimeMills ?
                    <h2>You lose!</h2>
                    :
                    <h2>Your score is: {getScore()}</h2>
            }
            <p>
                The target time was <strong>{initialTimeMills / 1000} seconds.</strong>
            </p>
            <p>
                You stopped the timer with{' '}
                <strong>{formattedRemainingTime} seconds left.</strong>
            </p>
            <form method="dialog" onSubmit={onReset}>
                <button onClick={onReset}>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")!
    );
});

export default ResultModal;