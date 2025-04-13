"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import Cookies from "js-cookie";
import { cn } from "@/lib/utils";

interface WelcomePageProps {
	onComplete: () => void;
}

export default function WelcomePage({ onComplete }: WelcomePageProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [userName, setUserName] = useState("");
	const [isExiting, setIsExiting] = useState(false);

	const steps = [
		{
			title: "Welcome to Habit Tracker",
			description:
				"Track your daily habits and build consistency with our simple, beautiful tracker.",
			image: "welcome",
		},
		{
			title: "Track Your Habits",
			description:
				"Toggle habits complete, see your progress, and build streaks day by day.",
			image: "habits",
		},
		{
			title: "View Your Progress",
			description:
				"See detailed statistics and track your improvement over time.",
			image: "stats",
		},
		{
			title: "Personalize Your Experience",
			description:
				"Enter your name to personalize your habit tracking journey.",
			image: "personalize",
			isNameInput: true,
		},
	];

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			completeOnboarding();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const completeOnboarding = () => {
		setIsExiting(true);
		// Store user preferences in cookies
		Cookies.set("welcomeCompleted", "true", { expires: 365 }); // Expires in 1 year
		if (userName.trim()) {
			Cookies.set("userName", userName.trim(), { expires: 30 }); // Expires in 30 days
		}

		// Small delay for exit animation
		setTimeout(() => {
			onComplete();
		}, 500);
	};

	const skipOnboarding = () => {
		setIsExiting(true);
		Cookies.set("welcomeCompleted", "true", { expires: 365 });

		setTimeout(() => {
			onComplete();
		}, 500);
	};

	return (
		<AnimatePresence>
			{!isExiting && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="relative w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
					>
						{/* Close button */}
						<button
							onClick={skipOnboarding}
							className="absolute top-4 right-4 z-10 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
						>
							<X size={18} />
						</button>

						{/* Step indicator */}
						<div className="absolute top-4 left-4 z-10 flex space-x-1">
							{steps.map((_, index) => (
								<div
									key={index}
									className={cn(
										"w-2 h-2 rounded-full transition-colors",
										currentStep === index
											? "bg-blue-500 dark:bg-blue-400"
											: "bg-gray-300 dark:bg-gray-600",
									)}
								/>
							))}
						</div>

						{/* Content */}
						<div className="px-6 pt-16 pb-8">
							<div className="h-48 flex items-center justify-center mb-6">
								<IllustrationForStep
									step={steps[currentStep].image}
									userName={userName}
								/>
							</div>

							<h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
								{steps[currentStep].title}
							</h2>

							<p className="text-gray-600 dark:text-gray-300 text-center mb-6">
								{steps[currentStep].description}
							</p>

							{steps[currentStep].isNameInput && (
								<div className="mb-6">
									<label
										htmlFor="userName"
										className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
									>
										Your Name (Optional)
									</label>
									<input
										type="text"
										id="userName"
										value={userName}
										onChange={(e) => setUserName(e.target.value)}
										placeholder="Enter your name"
										className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
									/>
								</div>
							)}

							{/* Navigation buttons */}
							<div className="flex justify-between items-center">
								<button
									onClick={handlePrevious}
									disabled={currentStep === 0}
									className={cn(
										"p-2 rounded-lg flex items-center justify-center transition-colors",
										currentStep === 0
											? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
											: "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
									)}
								>
									<ChevronLeft size={20} />
									<span className="ml-1">Back</span>
								</button>

								<button
									onClick={handleNext}
									className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg flex items-center"
								>
									{currentStep === steps.length - 1 ? (
										<>
											<span>Get Started</span>
											<Check size={18} className="ml-1" />
										</>
									) : (
										<>
											<span>Next</span>
											<ChevronRight size={20} className="ml-1" />
										</>
									)}
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

// Simple illustrations for each step
function IllustrationForStep({
	step,
	userName,
}: { step: string; userName: string }) {
	switch (step) {
		case "welcome":
			return (
				<div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
					<motion.div
						initial={{ scale: 0.8, rotate: -10 }}
						animate={{ scale: 1, rotate: 0 }}
						transition={{
							type: "spring",
							damping: 10,
							stiffness: 100,
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "reverse",
							duration: 2,
						}}
					>
						<svg
							width="80"
							height="80"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
								stroke="#3B82F6"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M8 12L11 15L16 10"
								stroke="#3B82F6"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</motion.div>
				</div>
			);
		case "habits":
			return (
				<div className="flex flex-col items-center space-y-3">
					{[1, 2, 3].map((i) => (
						<motion.div
							key={i}
							initial={{ x: -50, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ delay: i * 0.2 }}
							className="w-48 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between px-4"
						>
							<div className="w-24 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
							<div className="w-8 h-4 bg-blue-500 dark:bg-blue-600 rounded-full" />
						</motion.div>
					))}
				</div>
			);
		case "stats":
			return (
				<div className="w-48 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex flex-col justify-between">
					<div className="w-full flex justify-between items-center">
						<div className="w-16 h-4 bg-gray-200 dark:bg-gray-600 rounded" />
						<div className="text-blue-500 dark:text-blue-400 font-bold">
							75%
						</div>
					</div>
					<div className="w-full h-4 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
						<motion.div
							initial={{ width: "0%" }}
							animate={{ width: "75%" }}
							transition={{ duration: 1.5, ease: "easeOut" }}
							className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
						/>
					</div>
					<div className="grid grid-cols-3 gap-2">
						{[1, 2, 3].map((i) => (
							<div
								key={i}
								className="h-8 bg-gray-200 dark:bg-gray-600 rounded"
							/>
						))}
					</div>
				</div>
			);
		case "personalize":
			return (
				<div className="relative">
					<div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-5xl font-light">
						{userName ? userName.charAt(0).toUpperCase() : "?"}
					</div>
					<motion.div
						initial={{ scale: 0, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.5 }}
						className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white"
					>
						<Check size={20} />
					</motion.div>
				</div>
			);
		default:
			return null;
	}
}
