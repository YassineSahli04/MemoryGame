import { useState, useEffect } from 'react';
export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        const timeoutId = setTimeout(onTimeout, timeout);
        const intervalId = setInterval(() => {
            setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [timeout, onTimeout]);

    return (
        <progress id="question-time" max={timeout} value={remainingTime} />
    );
}