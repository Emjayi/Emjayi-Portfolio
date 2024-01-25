import "../global.css";
import React from "react";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import AnimatedCursor from "react-animated-cursor";

export const metadata: Metadata = {
	title: {
		default: "Emjay",
		template: "Keep it simple.",
	},
	description: "Keep it simple.",
	openGraph: {
		title: "Emjay",
		description: "Keep it simple.",
		url: "https://emjayi.ir",
		siteName: "emjayi.ir",
		images: [
			{
				url: "https://emjayi.ir/og.png",
				width: 1920,
				height: 1080,
			},
		],
		locale: "en-US",
		type: "website",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: "Emjay",
		card: "summary_large_image",
	},
	icons: {
		shortcut: "/favicon.png",
	},
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

const calSans = LocalFont({
	src: "../public/fonts/CalSans-SemiBold.ttf",
	variable: "--font-calsans",
});

const telSans = LocalFont({
	src: "../public/fonts/telemarinesbold1.ttf",
	variable: "--font-telsans",
});


export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className={`${[inter.variable, calSans.variable, telSans.variable].join(" ")} `} >
			<head>
				<Analytics />
			</head>
			<body
				className={` bg-white dark:bg-black ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined
					}`}
			>
				<div className="hidden md:flex">
					<AnimatedCursor
						innerSize={8}
						outerSize={30}
						innerScale={1}
						outerScale={1.4}
						outerAlpha={0}
						outerStyle={{
							border: "2px solid #555",
						}}
						innerStyle={{
							backgroundColor: "var(--cursor-inner)",
						}}
						showSystemCursor={true}
					/>
				</div>
				{children}
			</body>
		</html >
	);
}
