"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";

interface ThemeSwitcherProps {
	className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	const themes = [
		{ label: "Light", value: "light" },
		{ label: "Dark", value: "dark" },
	];

	return (
		<div
			className={clsx(
				"text-sm text-zinc-700 dark:text-zinc-200",
				className
			)}
		>
			<span className="mr-2 text-zinc-400">Theme:</span>
			{themes.map((t, index) => (
				<>
					<button
						key={t.value}
						onClick={() => setTheme(t.value)}
						className={clsx(
							"text-sm transition capitalize",
							theme === t.value
								? "font-bold"
								: " text-zinc-400 dark:hover:text-white hover:text-black"
						)}
					>
						{t.label}
					</button>
					{index < themes.length - 1 && <span className="mx-1">|</span>}
				</>
			))}
		</div>
	);
};
