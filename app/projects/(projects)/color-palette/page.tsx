"use client";

import { useState, useEffect, useCallback } from "react";
import { Lock, Unlock, Palette } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

export default function ColorPaletteBuilder() {
	const [colors, setColors] = useState<string[]>([]);
	const [lockedColors, setLockedColors] = useState<boolean[]>([
		false,
		false,
		false,
		false,
		false,
	]);
	const [hoveringIndex, setHoveringIndex] = useState<number | null>(null);

	// Generate a random hex color
	const generateRandomColor = () => {
		return `#${Math.floor(Math.random() * 16777215)
			.toString(16)
			.padStart(6, "0")}`;
	};

	// Initialize with random colors
	useEffect(() => {
		const initialColors = Array(5)
			.fill(0)
			.map(() => generateRandomColor());
		setColors(initialColors);
	}, []);

	// Handle spacebar press to change colors
	const handleKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.code === "Space") {
				event.preventDefault();

				setColors((currentColors) =>
					currentColors.map((color, index) => {
						// Only change colors that aren't locked
						return lockedColors[index] ? color : generateRandomColor();
					}),
				);
			}
		},
		[lockedColors],
	);

	// Add and remove event listener for spacebar
	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	// Update a specific color in the palette
	const updateColor = (index: number, color: string) => {
		const newColors = [...colors];
		newColors[index] = color;
		setColors(newColors);
	};

	// Toggle lock state for a color
	const toggleLock = (index: number) => {
		const newLockedColors = [...lockedColors];
		newLockedColors[index] = !newLockedColors[index];
		setLockedColors(newLockedColors);
	};

	// Calculate text color based on background for contrast
	const getTextColor = (hexColor: string) => {
		// Convert hex to RGB
		const r = Number.parseInt(hexColor.slice(1, 3), 16);
		const g = Number.parseInt(hexColor.slice(3, 5), 16);
		const b = Number.parseInt(hexColor.slice(5, 7), 16);

		// Calculate luminance
		const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

		return luminance > 0.5 ? "text-gray-800" : "text-gray-100";
	};

	return (
		<main className="h-screen w-full flex flex-row overflow-hidden">
			{colors.map((color, index) => (
				<div
					key={index}
					className="relative flex-1 flex flex-col items-center justify-center transition-all duration-300"
					style={{ backgroundColor: color }}
					onMouseEnter={() => setHoveringIndex(index)}
					onMouseLeave={() => setHoveringIndex(null)}
					role="region"
					aria-label={`Color block: ${color}`}
				>
					{/* Color hex value display */}
					<div
						className={cn(
							"font-mono text-lg font-bold mb-4",
							getTextColor(color),
						)}
					>
						{color.toUpperCase()}
					</div>

					{/* Controls that appear on hover */}
					<div
						className={cn(
							"flex flex-col gap-3 transition-opacity duration-300",
							hoveringIndex === index ? "opacity-100" : "opacity-0",
						)}
					>
						{/* Color picker button */}
						<div className="relative">
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full w-12 h-12 shadow-lg"
								aria-label="Change color"
							>
								<Palette className="h-6 w-6" />
								<input
									type="color"
									value={color}
									onChange={(e) => updateColor(index, e.target.value)}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									aria-label="Color picker"
								/>
							</Button>
						</div>

						{/* Lock/unlock button */}
						<Button
							variant="secondary"
							size="icon"
							className="rounded-full w-12 h-12 shadow-lg"
							onClick={() => toggleLock(index)}
							aria-label={lockedColors[index] ? "Unlock color" : "Lock color"}
							aria-pressed={lockedColors[index]}
						>
							{lockedColors[index] ? (
								<Lock className="h-6 w-6" />
							) : (
								<Unlock className="h-6 w-6" />
							)}
						</Button>
					</div>

					{/* Instruction text */}
					<div
						className={cn(
							"absolute bottom-6 text-center px-4 transition-opacity duration-300",
							getTextColor(color),
							hoveringIndex === index ? "opacity-100" : "opacity-0",
						)}
					>
						<p className="text-sm">
							Press{" "}
							<kbd className="px-2 py-1 bg-black/10 rounded">spacebar</kbd> to
							generate new colors
						</p>
					</div>

					{/* Lock indicator when not hovering */}
					{lockedColors[index] && hoveringIndex !== index && (
						<div className="absolute top-4 right-4">
							<Lock className={cn("h-5 w-5", getTextColor(color))} />
						</div>
					)}
				</div>
			))}
		</main>
	);
}
