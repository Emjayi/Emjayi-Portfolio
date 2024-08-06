'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const PomodoroTimer = () => {
    const [time, setTime] = useState<number>(1500); // 25 minutes
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        let interval: any;
        if (isActive) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, time]);

    const resetTimer = () => {
        setTime(1500);
        setIsActive(false);
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className="p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>
            <div className="text-6xl mb-4">{formatTime(time)}</div>
            <Button onClick={() => setIsActive(!isActive)} className="mr-2">
                {isActive ? 'Pause' : 'Start'}
            </Button>
            <Button onClick={resetTimer}>Reset</Button>
        </div>
    );
}

export default PomodoroTimer;
