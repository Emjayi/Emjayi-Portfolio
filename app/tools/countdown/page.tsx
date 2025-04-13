"use client";
// Import the necessary components and hooks
import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

const CountdownTimer = () => {
	// Define state for time, timer active status, and initial time setting
	const [time, setTime] = useState<number>(60);
	const [initialTime, setInitialTime] = useState<number>(60);
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
		if (time === 0 && isActive) {
			alert("Time is up!");
			setIsActive(false);
		}
		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isActive, time]);

	// Handle timer reset
	const resetTimer = () => {
		setTime(initialTime);
		setIsActive(false);
	};

	// Handle setting the initial time
	const handleInitialTimeChange = (value: string) => {
		const numValue = parseInt(value, 10);
		setInitialTime(numValue);
		setTime(numValue);
	};

	return (
		<div className="p-6 flex flex-col gap-1 w-full items-center justify-center">
			<div className="text-xl font-semibold w-32 p-4 text-center bg-secondary rounded-lg mb-10">
				{time}s
			</div>
			<div className="flex gap-2 justify-center items-center">
				<Input
					type="number"
					min="1"
					value={initialTime}
					onChange={(e) => handleInitialTimeChange(e.target.value)}
					className="w-20"
				/>
				<span>seconds</span>
			</div>

			<div className="flex gap-2 mt-1">
				<Button onClick={() => setIsActive(!isActive)}>
					{isActive ? "Pause" : "Start"}
				</Button>
				<Button
					onClick={resetTimer}
					className="bg-destructive hover:bg-destructive/80"
				>
					Reset
				</Button>
			</div>
		</div>
	);
};

export default CountdownTimer;
