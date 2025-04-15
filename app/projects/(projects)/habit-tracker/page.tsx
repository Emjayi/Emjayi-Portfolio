"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
	Check,
	Moon,
	Plus,
	Sun,
	Trash2,
	BarChart2,
	Calendar,
	Award,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import WelcomePage from "./welcome-page";
import Cookies from "js-cookie";

// Type for our habit data
interface Habit {
	id: number;
	name: string;
	completed: boolean;
	streak: number;
	category?: string;
}

export default function HabitTracker() {
	const [habits, setHabits] = useState<Habit[]>([
		{
			id: 1,
			name: "Morning Meditation",
			completed: false,
			streak: 4,
			category: "Wellness",
		},
		{
			id: 2,
			name: "Read for 30 minutes",
			completed: true,
			streak: 12,
			category: "Learning",
		},
		{
			id: 3,
			name: "Drink 8 glasses of water",
			completed: false,
			streak: 7,
			category: "Health",
		},
		{
			id: 4,
			name: "Exercise",
			completed: false,
			streak: 3,
			category: "Fitness",
		},
		{
			id: 5,
			name: "Journal",
			completed: true,
			streak: 21,
			category: "Wellness",
		},
	]);

	const [newHabitName, setNewHabitName] = useState("");
	const [newHabitCategory, setNewHabitCategory] = useState("General");
	const [isAddingHabit, setIsAddingHabit] = useState(false);
	const [isDesktop, setIsDesktop] = useState(false);
	const [activeView, setActiveView] = useState<"list" | "stats" | "calendar">(
		"list",
	);
	const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
	const [showWelcome, setShowWelcome] = useState(true);
	const [userName, setUserName] = useState("");

	// Check if we're on desktop and load cookies
	useEffect(() => {
		const checkIfDesktop = () => {
			setIsDesktop(window.innerWidth >= 768);
		};

		checkIfDesktop();
		window.addEventListener("resize", checkIfDesktop);

		// Check if welcome has been completed
		const welcomeCompleted = Cookies.get("welcomeCompleted");
		if (welcomeCompleted === "true") {
			setShowWelcome(false);
		}

		// Get user name if available
		const savedUserName = Cookies.get("userName");
		if (savedUserName) {
			setUserName(savedUserName);
		}

		return () => {
			window.removeEventListener("resize", checkIfDesktop);
		};
	}, []);

	// Handle keyboard shortcuts
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Only apply shortcuts when on desktop and welcome is not showing
			if (!isDesktop || showWelcome) return;

			// Add new habit with 'n' key
			if (e.key === "n" && !isAddingHabit) {
				e.preventDefault();
				setIsAddingHabit(true);
			}

			// Switch views with number keys
			if (e.key === "1") setActiveView("list");
			if (e.key === "2") setActiveView("stats");
			if (e.key === "3") setActiveView("calendar");
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isDesktop, isAddingHabit, showWelcome]);

	const toggleHabit = (id: number) => {
		setHabits(
			habits.map((habit) =>
				habit.id === id
					? {
							...habit,
							completed: !habit.completed,
							streak: !habit.completed ? habit.streak + 1 : habit.streak,
					  }
					: habit,
			),
		);
	};

	const addHabit = () => {
		if (newHabitName.trim()) {
			setHabits([
				...habits,
				{
					id: Math.max(0, ...habits.map((h) => h.id)) + 1,
					name: newHabitName,
					completed: false,
					streak: 0,
					category: newHabitCategory,
				},
			]);
			setNewHabitName("");
			setNewHabitCategory("General");
			setIsAddingHabit(false);
		}
	};

	const removeHabit = (id: number) => {
		setHabits(habits.filter((habit) => habit.id !== id));
		setDeleteConfirmId(null);
	};

	const reorderHabits = (newOrder: Habit[]) => {
		setHabits(newOrder);
	};

	const handleWelcomeComplete = () => {
		setShowWelcome(false);
		// Get updated user name from cookies
		const savedUserName = Cookies.get("userName");
		if (savedUserName) {
			setUserName(savedUserName);
		}
	};

	const completedCount = habits.filter((habit) => habit.completed).length;
	const categories = [...new Set(habits.map((h) => h.category))].filter(
		Boolean,
	);

	// Get stats by category
	const categoryStats = categories.map((category) => {
		const categoryHabits = habits.filter((h) => h.category === category);
		const completed = categoryHabits.filter((h) => h.completed).length;
		const total = categoryHabits.length;
		return {
			category,
			completed,
			total,
			percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
		};
	});

	return (
		<>
			{showWelcome && <WelcomePage onComplete={handleWelcomeComplete} />}

			<div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
				<div
					className={cn(
						"mx-auto p-6",
						isDesktop
							? "max-w-6xl grid grid-cols-[250px_1fr] gap-6"
							: "max-w-md",
					)}
				>
					{/* Sidebar for Desktop */}
					{isDesktop && (
						<div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 h-[calc(100vh-3rem)] sticky top-6">
							<div className="flex flex-col h-full">
								<div className="mb-6">
									<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
										Habit Tracker
									</h2>
									{userName && (
										<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
											Welcome, {userName}
										</p>
									)}
								</div>

								<nav className="space-y-2 mb-6">
									<button
										onClick={() => setActiveView("list")}
										className={cn(
											"flex items-center w-full p-2 rounded-lg transition-colors",
											activeView === "list"
												? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
												: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
										)}
									>
										<Check size={18} className="mr-2" />
										Habits
									</button>
									<button
										onClick={() => setActiveView("stats")}
										className={cn(
											"flex items-center w-full p-2 rounded-lg transition-colors",
											activeView === "stats"
												? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
												: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
										)}
									>
										<BarChart2 size={18} className="mr-2" />
										Statistics
									</button>
									<button
										onClick={() => setActiveView("calendar")}
										className={cn(
											"flex items-center w-full p-2 rounded-lg transition-colors",
											activeView === "calendar"
												? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
												: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
										)}
									>
										<Calendar size={18} className="mr-2" />
										Calendar
									</button>
								</nav>

								<div className="mt-auto">
									<div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-4">
										<h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
											Keyboard Shortcuts
										</h3>
										<ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
											<li className="flex justify-between">
												<span>New Habit</span>
												<kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">
													N
												</kbd>
											</li>
											<li className="flex justify-between">
												<span>Switch Views</span>
												<div className="flex gap-1">
													<kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">
														1-3
													</kbd>
												</div>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Main Content */}
					<main>
						{/* Header for Mobile */}
						{!isDesktop && (
							<div className="flex justify-between items-center mb-8">
								<div>
									<h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
										{userName ? `${userName}'s Habits` : "Today's Habits"}
									</h1>
									<p className="text-gray-500 dark:text-gray-400 mt-1">
										{completedCount} of {habits.length} completed
									</p>
								</div>
							</div>
						)}

						{/* Desktop Header */}
						{isDesktop && (
							<div className="mb-8">
								<h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
									{activeView === "list" &&
										(userName ? `${userName}'s Habits` : "Today's Habits")}
									{activeView === "stats" && "Statistics"}
									{activeView === "calendar" && "Calendar View"}
								</h1>
								<p className="text-gray-500 dark:text-gray-400 mt-1">
									{activeView === "list" &&
										`${completedCount} of ${habits.length} completed`}
									{activeView === "stats" && "Track your progress over time"}
									{activeView === "calendar" && "View your habit history"}
								</p>
							</div>
						)}

						{/* Progress Bar */}
						{activeView === "list" && (
							<div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full mt-3 mb-8">
								<motion.div
									className="h-1 bg-blue-500 dark:bg-blue-400 rounded-full"
									initial={{ width: 0 }}
									animate={{
										width: `${
											habits.length > 0
												? (completedCount / habits.length) * 100
												: 0
										}%`,
									}}
									transition={{ duration: 0.5, ease: "easeInOut" }}
								/>
							</div>
						)}

						{/* List View */}
						{activeView === "list" && (
							<>
								{/* Mobile View - Simple List */}
								{!isDesktop && (
									<div className="space-y-3">
										<AnimatePresence>
											{habits.map((habit) => (
												<motion.div
													key={habit.id}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.2 }}
												>
													<HabitCard
														habit={habit}
														onToggle={() => toggleHabit(habit.id)}
														onRemove={() => setDeleteConfirmId(habit.id)}
														isDesktop={isDesktop}
														isConfirmingDelete={deleteConfirmId === habit.id}
														onCancelDelete={() => setDeleteConfirmId(null)}
														onConfirmDelete={() => removeHabit(habit.id)}
													/>
												</motion.div>
											))}
										</AnimatePresence>
									</div>
								)}

								{/* Desktop View - Draggable List */}
								{isDesktop && (
									<Reorder.Group
										axis="y"
										values={habits}
										onReorder={reorderHabits}
										className="space-y-3"
									>
										<AnimatePresence>
											{habits.map((habit) => (
												<Reorder.Item
													key={habit.id}
													value={habit}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, height: 0 }}
													transition={{ duration: 0.2 }}
													className="cursor-grab active:cursor-grabbing"
												>
													<HabitCard
														habit={habit}
														onToggle={() => toggleHabit(habit.id)}
														onRemove={() => setDeleteConfirmId(habit.id)}
														isDesktop={isDesktop}
														isConfirmingDelete={deleteConfirmId === habit.id}
														onCancelDelete={() => setDeleteConfirmId(null)}
														onConfirmDelete={() => removeHabit(habit.id)}
													/>
												</Reorder.Item>
											))}
										</AnimatePresence>
									</Reorder.Group>
								)}
							</>
						)}

						{/* Stats View (Desktop Only) */}
						{isDesktop && activeView === "stats" && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Overall Progress Card */}
								<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
									<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
										Overall Progress
									</h3>
									<div className="flex items-end gap-4">
										<div className="text-4xl font-bold text-blue-500 dark:text-blue-400">
											{habits.length > 0
												? Math.round((completedCount / habits.length) * 100)
												: 0}
											%
										</div>
										<div className="text-gray-500 dark:text-gray-400 text-sm">
											{completedCount} of {habits.length} habits completed today
										</div>
									</div>

									<div className="mt-6">
										<div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded-full">
											<div
												className="h-4 bg-blue-500 dark:bg-blue-600 rounded-full"
												style={{
													width: `${
														habits.length > 0
															? (completedCount / habits.length) * 100
															: 0
													}%`,
												}}
											/>
										</div>
									</div>
								</div>

								{/* Streak Leaders Card */}
								<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
									<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
										Streak Leaders
									</h3>
									<div className="space-y-3">
										{[...habits]
											.sort((a, b) => b.streak - a.streak)
											.slice(0, 3)
											.map((habit, index) => (
												<div key={habit.id} className="flex items-center">
													<div
														className={cn(
															"w-8 h-8 rounded-full flex items-center justify-center mr-3 text-white",
															index === 0
																? "bg-yellow-500"
																: index === 1
																? "bg-gray-400"
																: "bg-amber-600",
														)}
													>
														{index + 1}
													</div>
													<div>
														<div className="font-medium text-gray-900 dark:text-white">
															{habit.name}
														</div>
														<div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
															<Award size={14} className="mr-1" />
															{habit.streak} day streak
														</div>
													</div>
												</div>
											))}
									</div>
								</div>

								{/* Category Progress */}
								<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 md:col-span-2">
									<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
										Category Progress
									</h3>
									<div className="space-y-4">
										{categoryStats.map((stat) => (
											<div key={stat.category} className="space-y-1">
												<div className="flex justify-between text-sm">
													<span className="font-medium text-gray-700 dark:text-gray-300">
														{stat.category}
													</span>
													<span className="text-gray-500 dark:text-gray-400">
														{stat.completed}/{stat.total}
													</span>
												</div>
												<div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full">
													<div
														className="h-2 bg-blue-500 dark:bg-blue-600 rounded-full"
														style={{ width: `${stat.percentage}%` }}
													/>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						)}

						{/* Calendar View (Desktop Only) */}
						{isDesktop && activeView === "calendar" && (
							<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
								<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
									Calendar View
								</h3>
								<p className="text-gray-500 dark:text-gray-400">
									This is a placeholder for a calendar view that would show your
									habit completion history over time.
								</p>
								<div className="grid grid-cols-7 gap-2 mt-6">
									{Array.from({ length: 28 }).map((_, i) => (
										<div
											key={i}
											className={cn(
												"aspect-square rounded-md border border-gray-200 dark:border-gray-700 flex items-center justify-center",
												i % 3 === 0 ? "bg-blue-100 dark:bg-blue-900/30" : "",
											)}
										>
											{i + 1}
										</div>
									))}
								</div>
							</div>
						)}

						{/* Add Habit Button or Form */}
						<div className="mt-6">
							{isAddingHabit ? (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: "auto" }}
									exit={{ opacity: 0, height: 0 }}
									className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 shadow-sm"
								>
									<div className="flex justify-between items-center mb-3">
										<h3 className="font-medium text-gray-900 dark:text-white">
											Add New Habit
										</h3>
										<button
											onClick={() => setIsAddingHabit(false)}
											className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
										>
											<X size={18} />
										</button>
									</div>

									<div className="space-y-3">
										<div>
											<label
												htmlFor="habit-name"
												className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
											>
												Habit Name
											</label>
											<input
												id="habit-name"
												type="text"
												value={newHabitName}
												onChange={(e) => setNewHabitName(e.target.value)}
												placeholder="Enter habit name"
												className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
											/>
										</div>

										{isDesktop && (
											<div>
												<label
													htmlFor="habit-category"
													className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
												>
													Category
												</label>
												<select
													id="habit-category"
													value={newHabitCategory}
													onChange={(e) => setNewHabitCategory(e.target.value)}
													className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
												>
													<option value="General">General</option>
													<option value="Health">Health</option>
													<option value="Fitness">Fitness</option>
													<option value="Learning">Learning</option>
													<option value="Wellness">Wellness</option>
													<option value="Productivity">Productivity</option>
												</select>
											</div>
										)}
									</div>

									<div className="flex space-x-2 mt-4">
										<button
											onClick={addHabit}
											className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg text-sm font-medium"
										>
											Add Habit
										</button>
										<button
											onClick={() => setIsAddingHabit(false)}
											className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium"
										>
											Cancel
										</button>
									</div>
								</motion.div>
							) : (
								<motion.button
									whileTap={{ scale: 0.95 }}
									onClick={() => setIsAddingHabit(true)}
									className="flex items-center justify-center w-full p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
								>
									<Plus size={18} className="mr-2" />
									Add New Habit
								</motion.button>
							)}
						</div>
					</main>
				</div>
			</div>
		</>
	);
}

interface HabitCardProps {
	habit: {
		id: number;
		name: string;
		completed: boolean;
		streak: number;
		category?: string;
	};
	onToggle: () => void;
	onRemove: () => void;
	isDesktop: boolean;
	isConfirmingDelete: boolean;
	onCancelDelete: () => void;
	onConfirmDelete: () => void;
}

function HabitCard({
	habit,
	onToggle,
	onRemove,
	isDesktop,
	isConfirmingDelete,
	onCancelDelete,
	onConfirmDelete,
}: HabitCardProps) {
	return (
		<motion.div
			whileHover={isDesktop ? { y: -2 } : {}}
			className={cn(
				"p-4 rounded-xl shadow-sm border transition-colors",
				habit.completed
					? "bg-blue-50 dark:bg-blue-900/30 border-blue-100 dark:border-blue-900"
					: "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700",
			)}
		>
			{isConfirmingDelete ? (
				<div className="flex items-center justify-between">
					<p className="text-sm text-gray-700 dark:text-gray-300">
						Delete this habit?
					</p>
					<div className="flex space-x-2">
						<button
							onClick={onConfirmDelete}
							className="px-2 py-1 bg-red-500 text-white text-xs rounded-md"
						>
							Delete
						</button>
						<button
							onClick={onCancelDelete}
							className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md"
						>
							Cancel
						</button>
					</div>
				</div>
			) : (
				<div className="flex items-center justify-between">
					<div className="flex-1 mr-4">
						<div className="flex items-center">
							<h3
								className={cn(
									"font-medium",
									habit.completed
										? "text-blue-600 dark:text-blue-400"
										: "text-gray-900 dark:text-white",
								)}
							>
								{habit.name}
							</h3>
							{isDesktop && habit.category && (
								<span className="ml-2 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
									{habit.category}
								</span>
							)}
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
							<Award size={12} className="mr-1" />
							{habit.streak} day streak
						</p>
					</div>

					<div className="flex items-center">
						{/* Delete button - visible on hover for desktop, always visible on mobile */}
						<div
							className={cn(
								"mr-2",
								isDesktop
									? "opacity-0 group-hover:opacity-100 transition-opacity"
									: "",
							)}
						>
							<motion.button
								whileTap={{ scale: 0.9 }}
								onClick={onRemove}
								className="p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<Trash2 size={16} />
							</motion.button>
						</div>

						<IOSSwitch checked={habit.completed} onToggle={onToggle} />
					</div>
				</div>
			)}
		</motion.div>
	);
}

interface IOSSwitchProps {
	checked: boolean;
	onToggle: () => void;
}

function IOSSwitch({ checked, onToggle }: IOSSwitchProps) {
	return (
		<motion.button
			whileTap={{ scale: 0.9 }}
			onClick={onToggle}
			className={cn(
				"relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
				checked
					? "bg-blue-500 dark:bg-blue-600"
					: "bg-gray-200 dark:bg-gray-700",
			)}
		>
			<span className="sr-only">Toggle habit</span>
			<motion.span
				layout
				transition={{
					type: "spring",
					stiffness: 500,
					damping: 30,
				}}
				className={cn(
					"pointer-events-none relative inline-block h-6 w-6 rounded-full bg-white dark:bg-gray-200 shadow-md ring-0 transition duration-200 ease-in-out",
					checked ? "translate-x-5" : "translate-x-0",
				)}
			>
				<span
					className={cn(
						"absolute inset-0 flex h-full w-full items-center justify-center transition-opacity",
						checked
							? "opacity-100 duration-200 ease-in"
							: "opacity-0 duration-100 ease-out",
					)}
					aria-hidden="true"
				>
					<Check size={12} className="text-blue-500 dark:text-blue-600" />
				</span>
			</motion.span>
		</motion.button>
	);
}
