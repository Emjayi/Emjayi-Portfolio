"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/components/ui/dropdown-menu";

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
				"text-sm",
				className
			)}
		>
			<span className="mr-2">Theme:</span>
			{themes.map((t, index) => (
				<>
					<button
						key={t.value}
						onClick={() => setTheme(t.value)}
						className={clsx(
							"text-sm transition capitalize",
							theme === t.value
								? "font-bold text-black dark:text-white"
								: " dark:hover:text-white hover:text-black"
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

export const ThemeSwitcherMobile = ({ className }: ThemeSwitcherProps) => {
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
		<DropdownMenu>
			<DropdownMenuTrigger className={clsx("text-sm", className)}>
				<span>Theme</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{themes.map((t) => (
					<DropdownMenuItem
						key={t.value}
						onClick={() => setTheme(t.value)}
						className={clsx(
							"text-sm transition capitalize",
							theme === t.value
								? "font-bold text-black dark:text-white"
								: " dark:hover:text-white hover:text-black"
						)}
					>
						{t.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
