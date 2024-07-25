'use client'
// pages/countdown-timer.tsx
import { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [time, setTime] = useState<number>(60);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime((time) => time - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, time]);

    const resetTimer = () => {
        setTime(60);
        setIsActive(false);
    };

    return (
        <>
            <h1>Countdown Timer</h1>
            <div>{time}s</div>
            <button onClick={() => setIsActive(!isActive)}>
                {isActive ? 'Pause' : 'Start'}
            </button>
            <button onClick={resetTimer}>Reset</button>
        </>
    );
}

export default CountdownTimer;
